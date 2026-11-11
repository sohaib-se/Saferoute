import { supabase } from '../lib/supabase';

export type CallStatus = 'ringing' | 'connected' | 'declined' | 'ended' | 'missed';

export interface CallSession {
  id: string;
  school_id?: string;
  caller_id: string;
  caller_role: 'driver' | 'parent';
  caller_name: string;
  callee_id: string;
  callee_role: 'driver' | 'parent';
  status: CallStatus;
  student_name?: string;
  vehicle_name?: string;
  sdp_offer?: any;
  sdp_answer?: any;
  ice_candidates?: any[];
  started_at: string;
  updated_at: string;
}

/**
 * Caller creates a new call session WITH SDP offer -> returns sessionId
 */
export const initiateCall = async (params: {
  callerId: string;
  callerRole: 'driver' | 'parent';
  callerName: string;
  calleeId: string;
  calleeRole: 'driver' | 'parent';
  schoolId?: string;
  studentName?: string;
  vehicleName?: string;
  sdpOffer?: any;
}): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('call_sessions')
      .insert({
        caller_id: params.callerId,
        caller_role: params.callerRole,
        caller_name: params.callerName,
        callee_id: params.calleeId,
        callee_role: params.calleeRole,
        school_id: params.schoolId,
        student_name: params.studentName,
        vehicle_name: params.vehicleName,
        sdp_offer: params.sdpOffer || null,
        ice_candidates: [],
        status: 'ringing',
      })
      .select('id')
      .single();

    if (error) {
      console.error('initiateCall error:', error);
      return null;
    }
    return data?.id ?? null;
  } catch (err) {
    console.error('initiateCall exception:', err);
    return null;
  }
};

/**
 * Callee accepts — stores SDP answer and sets status to 'connected'
 */
export const acceptCallWithAnswer = async (
  sessionId: string,
  sdpAnswer: any
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('call_sessions')
      .update({
        status: 'connected',
        sdp_answer: sdpAnswer,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId);

    if (error) {
      console.error('acceptCallWithAnswer error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('acceptCallWithAnswer exception:', err);
    return false;
  }
};

/**
 * Appends an ICE candidate to the session
 */
export const addIceCandidate = async (
  sessionId: string,
  candidate: any
): Promise<boolean> => {
  try {
    const { data } = await supabase
      .from('call_sessions')
      .select('ice_candidates')
      .eq('id', sessionId)
      .maybeSingle();

    const existing = Array.isArray(data?.ice_candidates) ? data.ice_candidates : [];
    const updated = [...existing, candidate];

    const { error } = await supabase
      .from('call_sessions')
      .update({
        ice_candidates: updated,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId);

    if (error) {
      console.error('addIceCandidate error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('addIceCandidate exception:', err);
    return false;
  }
};

/**
 * Update call status (e.g. decline, end, missed)
 */
export const updateCallStatus = async (
  sessionId: string,
  status: CallStatus
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('call_sessions')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId);

    if (error) {
      console.error('updateCallStatus error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('updateCallStatus exception:', err);
    return false;
  }
};

/**
 * Subscribe to incoming calls for a specific callee
 */
export const subscribeToIncomingCalls = (
  calleeId: string,
  onIncomingCall: (session: CallSession) => void
) => {
  const channel = supabase
    .channel(`calls:callee:${calleeId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'call_sessions',
        filter: `callee_id=eq.${calleeId}`,
      },
      (payload) => {
        const session = payload.new as CallSession;
        if (session.status === 'ringing') {
          onIncomingCall(session);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

/**
 * Subscribe to status and SDP updates for an active call session
 */
export const subscribeToCallSession = (
  sessionId: string,
  onUpdate: (session: CallSession) => void
) => {
  const channel = supabase
    .channel(`calls:session:${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'call_sessions',
        filter: `id=eq.${sessionId}`,
      },
      (payload) => {
        const updated = payload.new as CallSession;
        onUpdate(updated);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

