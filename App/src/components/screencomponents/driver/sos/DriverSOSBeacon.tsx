import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DriverSOSBeaconProps {
  isTriggered: boolean;
  onTrigger: () => void;
  onClear: () => void;
}

export const DriverSOSBeacon: React.FC<DriverSOSBeaconProps> = ({
  isTriggered,
  onTrigger,
  onClear,
}) => {
  if (isTriggered) {
    return (
      <View style={styles.activeAlertBox}>
        <View style={styles.activePulsingCircle}>
          <Ionicons name="warning" size={42} color="#FFFFFF" />
        </View>
        <Text style={styles.activeTitle}>EMERGENCY ALERT ACTIVE</Text>
        <Text style={styles.activeSub}>
          Live Coordinates: 33.6844° N, 73.0479° E (Broadcasting)
        </Text>
        <Text style={styles.activeDescription}>
          School Administration was notified. Emergency response protocol engaged.
        </Text>

        <TouchableOpacity
          style={styles.cancelAlertBtn}
          onPress={onClear}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelAlertText}>Clear / Resolve Emergency</Text>
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
        Pressing this button broadcasts an urgent alert with vehicle telemetry and GPS coordinates to the school management desk within 10 seconds.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  standbyBox: {
    alignItems: 'center',
    marginVertical: 14,
  },
  sosHugeBtn: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 8,
    borderWidth: 6,
    borderColor: '#FEE2E2',
  },
  hugeBtnText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 4,
  },
  hugeBtnSub: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FEE2E2',
    letterSpacing: 0.5,
  },
  warningNote: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 18,
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  activeAlertBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 2,
    borderColor: '#F87171',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  activePulsingCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  activeTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#991B1B',
  },
  activeSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B91C1C',
    marginTop: 4,
  },
  activeDescription: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 18,
  },
  cancelAlertBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DC2626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 16,
  },
  cancelAlertText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 13,
  },
});

export default DriverSOSBeacon;
