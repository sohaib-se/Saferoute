import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { radii, shadows } from '../../../../lib/theme';

export interface ParentActiveCall {
  name: string;
  role: string;
  phone: string;
  avatarIcon?: 'person' | 'business';
}

interface ParentInAppCallModalProps {
  call: ParentActiveCall | null;
  onEndCall: () => void;
}

export const ParentInAppCallModal: React.FC<ParentInAppCallModalProps> = ({
  call,
  onEndCall,
}) => {
  const [callStatus, setCallStatus] = useState<'Connecting...' | 'Ringing...' | 'Connected'>('Connecting...');
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  useEffect(() => {
    if (call) {
      setCallStatus('Connecting...');
      setDurationSeconds(0);
      setIsMuted(false);
      setIsSpeaker(false);

      const t1 = setTimeout(() => setCallStatus('Ringing...'), 1200);
      const t2 = setTimeout(() => setCallStatus('Connected'), 2800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [call?.phone]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (call && callStatus === 'Connected') {
      interval = setInterval(() => {
        setDurationSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [call, callStatus]);

  if (!call) return null;

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Modal visible={!!call} transparent animationType="slide" onRequestClose={onEndCall}>
      <View style={styles.overlay}>
        <View style={styles.callSheet}>
          {/* Header pill */}
          <View style={styles.sheetHandle} />

          <View style={styles.callBadgeRow}>
            <View style={styles.secureVoipBadge}>
              <Ionicons name="shield-checkmark" size={13} color="#059669" />
              <Text style={styles.secureVoipText}>SafeRoute VoIP Channel</Text>
            </View>
          </View>

          {/* Avatar and Caller Info */}
          <View style={styles.callerSection}>
            <View style={styles.avatarRingOuter}>
              <View style={styles.avatarRingInner}>
                <Ionicons
                  name={call.avatarIcon || 'person'}
                  size={38}
                  color="#FFFFFF"
                />
              </View>
            </View>

            <Text style={styles.callerName}>{call.name}</Text>
            <Text style={styles.callerSub}>{call.role}</Text>

            <View style={styles.statusRow}>
              {callStatus === 'Connected' ? (
                <View style={styles.connectedDot} />
              ) : (
                <Ionicons name="call-outline" size={14} color="#0284C7" />
              )}
              <Text style={styles.callStatusText}>
                {callStatus === 'Connected'
                  ? `Connected • ${formatTimer(durationSeconds)}`
                  : callStatus}
              </Text>
            </View>
          </View>

          {/* VoIP Call Controls */}
          <View style={styles.controlsGrid}>
            {/* Mute */}
            <TouchableOpacity
              style={[styles.controlBtn, isMuted && styles.controlBtnActive]}
              onPress={() => setIsMuted(prev => !prev)}
              activeOpacity={0.75}
            >
              <Ionicons
                name={isMuted ? 'mic-off' : 'mic'}
                size={22}
                color={isMuted ? '#EF4444' : '#0F172A'}
              />
              <Text style={[styles.controlLabel, isMuted && styles.controlLabelActive]}>
                {isMuted ? 'Muted' : 'Mute'}
              </Text>
            </TouchableOpacity>

            {/* Speaker */}
            <TouchableOpacity
              style={[styles.controlBtn, isSpeaker && styles.controlBtnActive]}
              onPress={() => setIsSpeaker(prev => !prev)}
              activeOpacity={0.75}
            >
              <Ionicons
                name={isSpeaker ? 'volume-high' : 'volume-medium-outline'}
                size={22}
                color={isSpeaker ? '#007AFF' : '#0F172A'}
              />
              <Text style={[styles.controlLabel, isSpeaker && styles.controlLabelActive]}>
                Speaker
              </Text>
            </TouchableOpacity>
          </View>

          {/* Big End Call Button */}
          <View style={styles.endCallSection}>
            <TouchableOpacity
              style={styles.endCallBtn}
              onPress={onEndCall}
              activeOpacity={0.85}
            >
              <Ionicons name="call" size={26} color="#FFFFFF" style={styles.endCallIcon} />
            </TouchableOpacity>
            <Text style={styles.endCallLabel}>End In-App Call</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 19, 41, 0.75)',
    justifyContent: 'flex-end',
  },
  callSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 44 : 28,
    alignItems: 'center',
    ...shadows.floatingDock,
  },
  sheetHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
    marginBottom: 14,
  },
  callBadgeRow: {
    marginBottom: 14,
  },
  secureVoipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    gap: 5,
  },
  secureVoipText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#065F46',
  },
  callerSection: {
    alignItems: 'center',
    marginBottom: 26,
  },
  avatarRingOuter: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#BFDBFE',
  },
  avatarRingInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.primaryGlow,
  },
  callerName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  callerSub: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
    textAlign: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  connectedDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
  },
  callStatusText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0284C7',
  },
  controlsGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
    width: '100%',
  },
  controlBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  controlBtnActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  controlLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 3,
  },
  controlLabelActive: {
    color: '#007AFF',
  },
  endCallSection: {
    alignItems: 'center',
  },
  endCallBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  endCallIcon: {
    transform: [{ rotate: '135deg' }],
  },
  endCallLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
    marginTop: 8,
  },
});

export default ParentInAppCallModal;
