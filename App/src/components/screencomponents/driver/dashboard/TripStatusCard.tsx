import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TripStatusCardProps {
  vehicleName?: string;
  routeTitle?: string;
  totalStudents?: number;
}

export const TripStatusCard: React.FC<TripStatusCardProps> = ({
  vehicleName = 'Bus 1',
  routeTitle = 'Morning Route - Sector G-10',
  totalStudents = 12,
}) => {
  const [isTripActive, setIsTripActive] = useState(false);

  const handleToggleTrip = () => {
    if (!isTripActive) {
      Alert.alert(
        'Confirm Start Trip',
        'Starting this trip will notify all assigned parents and begin broadcasting your GPS location.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Start Trip',
            style: 'default',
            onPress: () => setIsTripActive(true),
          },
        ]
      );
    } else {
      Alert.alert(
        'End Trip',
        'Are you sure you want to end this trip? Realtime location broadcast will stop and route history will be archived.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'End Trip',
            style: 'destructive',
            onPress: () => setIsTripActive(false),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleTitle}>{vehicleName}</Text>
          <Text style={styles.routeSubtitle}>{routeTitle}</Text>
        </View>
        <View
          style={[
            styles.badge,
            { backgroundColor: isTripActive ? '#ECFDF5' : '#FFFBEB' },
          ]}
        >
          <View
            style={[
              styles.dot,
              { backgroundColor: isTripActive ? '#10B981' : '#F59E0B' },
            ]}
          />
          <Text
            style={[
              styles.badgeText,
              { color: isTripActive ? '#059669' : '#D97706' },
            ]}
          >
            {isTripActive ? 'Active' : 'Not started'}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>Roster</Text>
          <Text style={styles.statValue}>{totalStudents} Students</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>GPS Status</Text>
          <Text
            style={[
              styles.statValue,
              { color: isTripActive ? '#059669' : '#64748B' },
            ]}
          >
            {isTripActive ? 'Broadcasting (5s)' : 'Idle'}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>Window</Text>
          <Text style={styles.statValue}>Morning</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.actionButton,
          isTripActive ? styles.endButton : styles.startButton,
        ]}
        onPress={handleToggleTrip}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isTripActive ? 'stop-circle' : 'play-circle'}
          size={20}
          color="#FFFFFF"
        />
        <Text style={styles.buttonText}>
          {isTripActive
            ? 'End Trip & Stop Broadcast'
            : 'Start Trip (Begin GPS Broadcast)'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  routeSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statCol: {
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 12,
    gap: 8,
  },
  startButton: {
    backgroundColor: '#2563EB',
  },
  endButton: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default TripStatusCard;
