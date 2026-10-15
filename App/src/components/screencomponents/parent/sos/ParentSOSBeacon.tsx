import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ParentSOSBeaconProps {
  isTriggered: boolean;
  onTrigger: () => void;
  onCancel: () => void;
}

export const ParentSOSBeacon: React.FC<ParentSOSBeaconProps> = ({
  isTriggered,
  onTrigger,
  onCancel,
}) => {
  if (isTriggered) {
    return (
      <View style={styles.activeAlertBox}>
        <View style={styles.activePulsingCircle}>
          <Ionicons name="warning" size={42} color="#FFFFFF" />
        </View>
        <Text style={styles.activeTitle}>EMERGENCY ALERT BROADCASTING</Text>
        <Text style={styles.activeSub}>
          Live Location Beacon Sent to School Admin Desk
        </Text>
        <Text style={styles.activeDescription}>
          School management and campus security have received your urgent distress notification. A response coordinator is reviewing your beacon now.
        </Text>

        <TouchableOpacity
          style={styles.cancelAlertBtn}
          onPress={onCancel}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelAlertText}>Resolve / Cancel Emergency</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.standbyBox}>
      <TouchableOpacity
        style={styles.sosHugeBtn}
        onPress={onTrigger}
        activeOpacity={0.85}
      >
        <Ionicons name="alert-circle" size={60} color="#FFFFFF" />
        <Text style={styles.hugeBtnText}>SOS</Text>
        <Text style={styles.hugeBtnSub}>TAP FOR EMERGENCY</Text>
      </TouchableOpacity>

      <Text style={styles.warningNote}>
        One-tap emergency trigger captures your current coordinates and dispatches an immediate safety escalation to the School Admin web panel within 10 seconds.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  standbyBox: {
    alignItems: 'center',
    marginVertical: 24,
  },
  sosHugeBtn: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: '#FEE2E2',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },
  hugeBtnText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 4,
    letterSpacing: 2,
  },
  hugeBtnSub: {
    color: '#FEE2E2',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  warningNote: {
    textAlign: 'center',
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  activeAlertBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 2,
    borderColor: '#DC2626',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginVertical: 16,
  },
  activePulsingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#991B1B',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  activeSub: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
    marginTop: 4,
    textAlign: 'center',
  },
  activeDescription: {
    fontSize: 12,
    color: '#7F1D1D',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  cancelAlertBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  cancelAlertText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 13,
  },
});
