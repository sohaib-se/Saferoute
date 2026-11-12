import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCall } from '../../context/CallContext';
import { colors, radii, shadows } from '../../lib/theme';

export const IncomingCallSheet: React.FC = () => {
  const { incomingCall, acceptCall, declineCall } = useCall();

  if (!incomingCall) return null;

  const isDriverCaller = incomingCall.caller_role === 'driver';
  const roleDisplay = isDriverCaller
    ? `Assigned Route Driver • ${incomingCall.vehicle_name || 'School Bus'}`
    : `Parent / Guardian • ${incomingCall.student_name || 'Student'}`;

  return (
    <Modal
      visible={!!incomingCall}
      transparent
      animationType="slide"
      onRequestClose={declineCall}
    >
      <View style={styles.overlay}>
        <View style={styles.sheetCard}>
          {/* Top Sheet Handle */}
          <View style={styles.sheetHandle} />

          {/* VoIP Security Badge */}
          <View style={styles.badgeRow}>
            <View style={styles.secureBadge}>
              <Ionicons name="shield-checkmark" size={13} color="#059669" />
              <Text style={styles.secureText}>SafeRoute VoIP Channel</Text>
            </View>
          </View>

          {/* Avatar and Ringing Caller Info */}
          <View style={styles.callerSection}>
            <View style={styles.avatarRingOuter}>
              <View style={styles.avatarRingInner}>
                <Ionicons
                  name={isDriverCaller ? 'bus' : 'person'}
                  size={36}
                  color="#FFFFFF"
                />
              </View>
            </View>

            <Text style={styles.callerName}>{incomingCall.caller_name}</Text>
            <Text style={styles.callerRole}>{roleDisplay}</Text>

            <View style={styles.ringingStatusRow}>
              <Ionicons name="call" size={15} color="#007AFF" />
              <Text style={styles.ringingStatusText}>Incoming Audio Call...</Text>
            </View>
          </View>

          {/* Action Buttons: Decline (Red) and Accept (Green) */}
          <View style={styles.actionsRow}>
            {/* Decline Button */}
            <View style={styles.actionBtnCol}>
              <TouchableOpacity
                style={styles.declineBtn}
                onPress={declineCall}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="call"
                  size={26}
                  color="#FFFFFF"
                  style={styles.declineIcon}
                />
              </TouchableOpacity>
              <Text style={styles.declineLabel}>Decline</Text>
            </View>

            {/* Accept Button */}
            <View style={styles.actionBtnCol}>
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={acceptCall}
                activeOpacity={0.8}
              >
                <Ionicons name="call" size={26} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.acceptLabel}>Accept</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 19, 41, 0.82)',
    justifyContent: 'flex-end',
  },
  sheetCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 48 : 34,
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
  badgeRow: {
    marginBottom: 16,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radii.full,
    gap: 6,
  },
  secureText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#065F46',
  },
  callerSection: {
    alignItems: 'center',
    marginBottom: 36,
  },
  avatarRingOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 2.5,
    borderColor: '#BFDBFE',
  },
  avatarRingInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.primaryGlow,
  },
  callerName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  callerRole: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center',
  },
  ringingStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.full,
    gap: 6,
  },
  ringingStatusText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0284C7',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 30,
  },
  actionBtnCol: {
    alignItems: 'center',
    gap: 8,
  },
  declineBtn: {
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
  declineIcon: {
    transform: [{ rotate: '135deg' }],
  },
  declineLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#DC2626',
  },
  acceptBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  acceptLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#10B981',
  },
});

export default IncomingCallSheet;

