import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';
import {
  CallSession,
  CallStatus,
  initiateCall,
  acceptCallWithAnswer,
  addIceCandidate,
  updateCallStatus,
  subscribeToIncomingCalls,
  subscribeToCallSession,
} from '../services/callService';
import { soundManager } from '../services/soundService';

// Safely require react-native-webrtc so app won't crash if native module isn't linked
let webrtcModule: any = null;
try {
  webrtcModule = require('react-native-webrtc');
} catch (e) {
  console.warn('react-native-webrtc module could not be loaded:', e);
}

const ICE_SERVERS = [
  // STUN — direct route for WiFi
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  // TURN — free relay fallback for mobile data / CGNAT
  {
    urls: 'turn:openrelay.metered.ca:80',
    username: 'openrelayproject',
    credential: 'openrelayproject',
  },
  {
    urls: 'turn:openrelay.metered.ca:443',
    username: 'openrelayproject',
    credential: 'openrelayproject',
  },
  {
    urls: 'turn:openrelay.metered.ca:443?transport=tcp',
    username: 'openrelayproject',
    credential: 'openrelayproject',
  },
];

export interface ActiveCallState {
  sessionId: string;
  remoteUserId: string;
  remoteUserName: string;
  remoteRole: 'driver' | 'parent';
  status: CallStatus;
  durationSeconds: number;
  isMuted: boolean;
  isSpeaker: boolean;
  studentName?: string;
  vehicleName?: string;
  isIncoming: boolean;
  localStream?: any;
  remoteStream?: any;
}

interface CallContextType {
  activeCall: ActiveCallState | null;
  incomingCall: CallSession | null;
  startCall: (params: {
    calleeId: string;
    calleeRole: 'driver' | 'parent';
    calleeName: string;
    studentName?: string;
    vehicleName?: string;
  }) => Promise<void>;
  acceptCall: () => Promise<void>;
  declineCall: () => Promise<void>;
  endCall: () => Promise<void>;
  toggleMute: () => void;
  toggleSpeaker: () => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [activeCall, setActiveCall] = useState<ActiveCallState | null>(null);
  const [incomingCall, setIncomingCall] = useState<CallSession | null>(null);

  const pcRef = useRef<any>(null);
  const localStreamRef = useRef<any>(null);
  const sessionUnsubRef = useRef<(() => void) | null>(null);
  const timeoutRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const processedIceCandidatesRef = useRef<Set<string>>(new Set());

  // ── Helper: Clean up WebRTC resources ───────────────────────────
  const cleanupCall = useCallback(() => {
    try {
      soundManager.stopAll();
      if (localStreamRef.current) {
        if (typeof localStreamRef.current.getTracks === 'function') {
          localStreamRef.current.getTracks().forEach((track: any) => track.stop());
        }
        localStreamRef.current = null;
      }

      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }
    } catch (err) {
      console.warn('cleanupCall error:', err);
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (sessionUnsubRef.current) {
      sessionUnsubRef.current();
      sessionUnsubRef.current = null;
    }
    processedIceCandidatesRef.current.clear();
  }, []);

  // ── Helper: Get Microphone Audio Stream ──────────────────────────
  const getLocalStream = async () => {
    if (!webrtcModule?.mediaDevices?.getUserMedia) {
      console.warn('mediaDevices.getUserMedia not available on this platform/build');
      return null;
    }
    try {
      const stream = await webrtcModule.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      localStreamRef.current = stream;
      return stream;
    } catch (err) {
      console.error('Microphone permission or stream access failed:', err);
      return null;
    }
  };

  // ── Helper: Create RTCPeerConnection ────────────────────────────
  const createPeerConnection = (sessionId: string) => {
    if (!webrtcModule?.RTCPeerConnection) {
      console.warn('RTCPeerConnection not available');
      return null;
    }

    const pc = new webrtcModule.RTCPeerConnection({ iceServers: ICE_SERVERS });

    pc.addEventListener('icecandidate', (event: any) => {
      if (event.candidate) {
        addIceCandidate(sessionId, event.candidate.toJSON ? event.candidate.toJSON() : event.candidate);
      }
    });

    pc.addEventListener('track', (event: any) => {
      if (event.streams && event.streams[0]) {
        setActiveCall((prev) => (prev ? { ...prev, remoteStream: event.streams[0] } : null));
      }
    });

    // Compatibility for older RN WebRTC onaddstream
    pc.onaddstream = (event: any) => {
      if (event.stream) {
        setActiveCall((prev) => (prev ? { ...prev, remoteStream: event.stream } : null));
      }
    };

    return pc;
  };

  // ── Listen for Incoming Calls ───────────────────────────────────
  useEffect(() => {
    if (!user?.userId) return;

    // Check for recent ringing call on mount
    const checkActiveRinging = async () => {
      try {
        const threshold = new Date(Date.now() - 30000).toISOString();
        const { data } = await supabase
          .from('call_sessions')
          .select('*')
          .eq('callee_id', user.userId)
          .eq('status', 'ringing')
          .gte('started_at', threshold)
          .order('started_at', { ascending: false })
          .limit(1);

        if (data && data.length > 0 && !activeCall) {
          setIncomingCall(data[0] as CallSession);
        }
      } catch (err) {
        console.warn('checkActiveRinging error:', err);
      }
    };

    checkActiveRinging();

    const unsub = subscribeToIncomingCalls(user.userId, (session) => {
      if (activeCall) {
        // Already busy on another call
        updateCallStatus(session.id, 'declined');
        return;
      }
      setIncomingCall(session);
    });

    return () => {
      unsub();
    };
  }, [user?.userId, activeCall]);

  // ── Ringtone management for incoming calls ───────────────────────
  useEffect(() => {
    if (incomingCall) {
      soundManager.playIncomingRingtone();
    } else {
      if (!activeCall || activeCall.status !== 'ringing') {
        soundManager.stopAll();
      }
    }
  }, [incomingCall]);

  // ── Live Connected Call Timer ────────────────────────────────────
  useEffect(() => {
    if (activeCall?.status === 'connected') {
      timerRef.current = setInterval(() => {
        setActiveCall((prev) =>
          prev ? { ...prev, durationSeconds: prev.durationSeconds + 1 } : null
        );
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeCall?.status]);

  // ── CALLER: Start Outgoing Call ──────────────────────────────────
  const startCall = async ({
    calleeId,
    calleeRole,
    calleeName,
    studentName,
    vehicleName,
  }: {
    calleeId: string;
    calleeRole: 'driver' | 'parent';
    calleeName: string;
    studentName?: string;
    vehicleName?: string;
  }) => {
    if (!user?.userId) return;

    cleanupCall();

    const localStream = await getLocalStream();
    let sdpOfferJson: any = null;
    let pc: any = null;

    if (webrtcModule?.RTCPeerConnection && localStream) {
      pc = createPeerConnection('pending');
      pcRef.current = pc;

      localStream.getTracks().forEach((track: any) => {
        try {
          pc.addTrack(track, localStream);
        } catch {
          // Compatibility for addStream
          if (pc.addStream) pc.addStream(localStream);
        }
      });

      try {
        const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: false });
        await pc.setLocalDescription(offer);
        sdpOfferJson = offer.toJSON ? offer.toJSON() : offer;
      } catch (err) {
        console.warn('createOffer error:', err);
      }
    }

    const sessionId = await initiateCall({
      callerId: user.userId,
      callerRole: user.role as 'driver' | 'parent',
      callerName: user.name,
      calleeId,
      calleeRole,
      schoolId: user.schoolId,
      studentName,
      vehicleName,
      sdpOffer: sdpOfferJson,
    });

    if (!sessionId) {
      cleanupCall();
      return;
    }

    // Now that we have sessionId, update peer connection candidate listener if needed
    if (pc) {
      pc.onicecandidate = (event: any) => {
        if (event.candidate) {
          addIceCandidate(sessionId, event.candidate.toJSON ? event.candidate.toJSON() : event.candidate);
        }
      };
    }

    setActiveCall({
      sessionId,
      remoteUserId: calleeId,
      remoteUserName: calleeName,
      remoteRole: calleeRole,
      status: 'ringing',
      durationSeconds: 0,
      isMuted: false,
      isSpeaker: false,
      studentName,
      vehicleName,
      isIncoming: false,
      localStream,
    });

    // Play outgoing ringback tone so caller hears that call is going!
    soundManager.playRingback();

    // Subscribe to session updates (callee accepts/declines/answers)
    sessionUnsubRef.current = subscribeToCallSession(sessionId, async (updatedSession) => {
      // 1. Callee accepted call with SDP Answer
      if (updatedSession.status === 'connected') {
        soundManager.stopAll();
        if (pc && updatedSession.sdp_answer && webrtcModule?.RTCSessionDescription) {
          try {
            if (pc.signalingState === 'have-local-offer') {
              const remoteDesc = new webrtcModule.RTCSessionDescription(updatedSession.sdp_answer);
              await pc.setRemoteDescription(remoteDesc);
            }
          } catch (err) {
            console.warn('setRemoteDescription error:', err);
          }
        }

        // Apply incoming ICE candidates
        if (pc && Array.isArray(updatedSession.ice_candidates) && webrtcModule?.RTCIceCandidate) {
          updatedSession.ice_candidates.forEach((cand: any) => {
            const candKey = JSON.stringify(cand);
            if (!processedIceCandidatesRef.current.has(candKey)) {
              processedIceCandidatesRef.current.add(candKey);
              try {
                pc.addIceCandidate(new webrtcModule.RTCIceCandidate(cand));
              } catch (e) {
                // Ignore candidate parse errors
              }
            }
          });
        }

        setActiveCall((prev) => (prev ? { ...prev, status: 'connected' } : null));
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      } else if (updatedSession.status === 'declined' || updatedSession.status === 'ended') {
        soundManager.playCallEnd();
        setActiveCall((prev) => (prev ? { ...prev, status: updatedSession.status } : null));
        setTimeout(() => {
          cleanupCall();
          setActiveCall(null);
        }, 1800);
      }
    });

    // 30-second ring timeout -> mark missed
    timeoutRef.current = setTimeout(async () => {
      soundManager.playCallEnd();
      await updateCallStatus(sessionId, 'missed');
      setActiveCall((prev) => (prev ? { ...prev, status: 'missed' } : null));
      setTimeout(() => {
        cleanupCall();
        setActiveCall(null);
      }, 2000);
    }, 30000);
  };

  // ── CALLEE: Accept Incoming Call ─────────────────────────────────
  const acceptCall = async () => {
    if (!incomingCall) return;

    soundManager.stopAll();
    const callToAccept = incomingCall;
    setIncomingCall(null);

    const localStream = await getLocalStream();
    let pc: any = null;

    if (webrtcModule?.RTCPeerConnection && webrtcModule?.RTCSessionDescription && localStream) {
      pc = createPeerConnection(callToAccept.id);
      pcRef.current = pc;

      localStream.getTracks().forEach((track: any) => {
        try {
          pc.addTrack(track, localStream);
        } catch {
          if (pc.addStream) pc.addStream(localStream);
        }
      });

      try {
        if (callToAccept.sdp_offer) {
          const remoteDesc = new webrtcModule.RTCSessionDescription(callToAccept.sdp_offer);
          await pc.setRemoteDescription(remoteDesc);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          const sdpAnswerJson = answer.toJSON ? answer.toJSON() : answer;
          await acceptCallWithAnswer(callToAccept.id, sdpAnswerJson);
        } else {
          await updateCallStatus(callToAccept.id, 'connected');
        }
      } catch (err) {
        console.warn('acceptCall WebRTC negotiation error:', err);
        await updateCallStatus(callToAccept.id, 'connected');
      }
    } else {
      await updateCallStatus(callToAccept.id, 'connected');
    }

    setActiveCall({
      sessionId: callToAccept.id,
      remoteUserId: callToAccept.caller_id,
      remoteUserName: callToAccept.caller_name,
      remoteRole: callToAccept.caller_role,
      status: 'connected',
      durationSeconds: 0,
      isMuted: false,
      isSpeaker: false,
      studentName: callToAccept.student_name,
      vehicleName: callToAccept.vehicle_name,
      isIncoming: true,
      localStream,
    });

    // Subscribe to session updates (e.g. caller ends call, sends ICE candidates)
    sessionUnsubRef.current = subscribeToCallSession(callToAccept.id, (updatedSession) => {
      if (updatedSession.status === 'ended') {
        soundManager.playCallEnd();
        setActiveCall((prev) => (prev ? { ...prev, status: 'ended' } : null));
        setTimeout(() => {
          cleanupCall();
          setActiveCall(null);
        }, 1500);
      }

      // Apply incoming ICE candidates from caller
      if (pc && Array.isArray(updatedSession.ice_candidates) && webrtcModule?.RTCIceCandidate) {
        updatedSession.ice_candidates.forEach((cand: any) => {
          const candKey = JSON.stringify(cand);
          if (!processedIceCandidatesRef.current.has(candKey)) {
            processedIceCandidatesRef.current.add(candKey);
            try {
              pc.addIceCandidate(new webrtcModule.RTCIceCandidate(cand));
            } catch (e) {
              // Ignore candidate parse errors
            }
          }
        });
      }
    });
  };

  // ── CALLEE: Decline Incoming Call ────────────────────────────────
  const declineCall = async () => {
    if (!incomingCall) return;
    soundManager.playCallEnd();
    const sessionId = incomingCall.id;
    setIncomingCall(null);
    await updateCallStatus(sessionId, 'declined');
  };

  // ── EITHER SIDE: End Call ────────────────────────────────────────
  const endCall = async () => {
    if (!activeCall) return;
    soundManager.playCallEnd();
    const sessionId = activeCall.sessionId;
    cleanupCall();
    setActiveCall(null);
    await updateCallStatus(sessionId, 'ended');
  };

  // ── Toggle Mute ──────────────────────────────────────────────────
  const toggleMute = () => {
    if (localStreamRef.current && typeof localStreamRef.current.getAudioTracks === 'function') {
      const tracks = localStreamRef.current.getAudioTracks();
      tracks.forEach((track: any) => {
        track.enabled = !track.enabled;
      });
    }
    setActiveCall((prev) => (prev ? { ...prev, isMuted: !prev.isMuted } : null));
  };

  // ── Toggle Speaker ───────────────────────────────────────────────
  const toggleSpeaker = () => {
    setActiveCall((prev) => (prev ? { ...prev, isSpeaker: !prev.isSpeaker } : null));
  };

  return (
    <CallContext.Provider
      value={{
        activeCall,
        incomingCall,
        startCall,
        acceptCall,
        declineCall,
        endCall,
        toggleMute,
        toggleSpeaker,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCall = (): CallContextType => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};

