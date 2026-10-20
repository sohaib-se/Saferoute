import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows, radii } from '../../../../lib/theme';
import { useDriverTrip } from '../../../../context/DriverTripContext';

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
  const { gpsState, vehicleName, vehiclePlate, routeTitle, students } = useDriverTrip();

  if (isTriggered) {
    return (
      <View style={styles.activeAlertBox}>
        <View style={styles.activePulsingCircle}>
          <Ionicons name="warning" size={38} color="#FFFFFF" />
        </View>
        <Text style={styles.activeTitle}>EMERGENCY DISTRESS BEACON ACTIVE</Text>
        <Text style={styles.activeSub}>
          Broadcasting Live Coordinates: {gpsState.latitude.toFixed(4)}°N, {gpsState.longitude.toFixed(4)}°E
        </Text>

        <View style={styles.dispatchDetailsCard}>
          <View style={styles.dispatchRow}>
            <Ionicons name="business" size={16} color="#DC2626" />
            <Text style={styles.dispatchText}>
              School Fleet Administration Command Center: <Text style={styles.boldText}>Notified (High Priority)</Text>
            </Text>
          </View>
          <View style={styles.dispatchRow}>
            <Ionicons name="people" size={16} color="#DC2626" />
            <Text style={styles.dispatchText}>
              All Parents on Route ({students.length} families): <Text style={styles.boldText}>Emergency Push Dispatched</Text>
            </Text>
          </View>
          <View style={styles.dispatchRow}>
            <Ionicons name="bus" size={16} color="#DC2626" />
            <Text style={styles.dispatchText}>
              Vehicle: <Text style={styles.boldText}>{vehicleName} ({vehiclePlate}) • {routeTitle}</Text>
            </Text>
          </View>
        </View>

        <Text style={styles.activeDescription}>
          Campus safety security vehicle and school transport rapid response teams have your live location channel. Keep your phone active.
        </Text>

        <TouchableOpacity
          style={styles.cancelAlertBtn}
          onPress={onClear}
          activeOpacity={0.8}
        >
          <Ionicons name="close-circle-outline" size={18} color="#EF4444" />
          <Text style={styles.cancelAlertText}>Resolve & Deactivate Emergency Beacon</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Concentric Soft Aura Rings matching Parent Portal */}
      <View style={styles.ringOuter}>
        <View style={styles.ringMiddle}>
          <View style={styles.ringInner}>
            <TouchableOpacity
              style={styles.sosMainBtn}
              onPress={onTrigger}
              activeOpacity={0.85}
            >
              <Ionicons name="alert-circle" size={36} color="#FFFFFF" />
              <Text style={styles.sosText}>SOS</Text>
              <Text style={styles.sosSub}>EMERGENCY DISPATCH</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* REQ-D7.1 Notice Card */}
      <View style={styles.escalationCard}>
        <View style={styles.shieldBadge}>
          <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
        </View>
        <View style={styles.escalationTextCol}>
          <Text style={styles.escalationTitle}>Driver Emergency Escalation</Text>
          <Text style={styles.escalationDescription}>
            Triggering SOS captures your current live GPS coordinates ({gpsState.latitude.toFixed(4)}°N, {gpsState.longitude.toFixed(4)}°E) and immediately notifies the School Administration desk AND all parents on this route.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
  },
  ringOuter: {
    width: 290,
    height: 290,
    borderRadius: 145,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringMiddle: {
    width: 236,
    height: 236,
    borderRadius: 118,
    backgroundColor: '#FFE4E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  sosMainBtn: {
    width: 164,
    height: 164,
    borderRadius: 82,
    backgroundColor: '#E02D3C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  sosSub: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  escalationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2F2',
    borderWidth: 1,
    borderColor: '#FFE0E0',
    borderRadius: 20,
    padding: 16,
    marginTop: 24,
    gap: 14,
    width: '100%',
  },
  shieldBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#E02D3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  escalationTextCol: {
    flex: 1,
  },
  escalationTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#E02D3C',
    marginBottom: 3,
  },
  escalationDescription: {
    fontSize: 11.5,
    color: '#64748B',
    lineHeight: 16.5,
    fontWeight: '500',
  },
  activeAlertBox: {
    backgroundColor: '#FFF2F2',
    borderWidth: 2,
    borderColor: '#EF4444',
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    marginVertical: 12,
    ...shadows.dangerGlow,
  },
  activePulsingCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#991B1B',
    textAlign: 'center',
  },
  activeSub: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
    marginTop: 4,
    textAlign: 'center',
  },
  dispatchDetailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    width: '100%',
    marginVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  dispatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dispatchText: {
    fontSize: 12,
    color: '#334155',
    flex: 1,
  },
  boldText: {
    fontWeight: '800',
    color: '#991B1B',
  },
  activeDescription: {
    fontSize: 11.5,
    color: '#7F1D1D',
    textAlign: 'center',
    lineHeight: 17,
    marginBottom: 16,
  },
  cancelAlertBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    gap: 6,
  },
  cancelAlertText: {
    color: '#EF4444',
    fontWeight: '800',
    fontSize: 13,
  },
});

export default DriverSOSBeacon;
