import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';

interface CurrentTripStatusCardProps {
  vehicleName?: string;
  vehiclePlate?: string;
  driverName?: string;
  driverPhone?: string;
  speedKmh?: number;
  distanceKm?: number;
  etaMins?: number;
  currentSector?: string;
  onCallDriver?: () => void;
}

export const CurrentTripStatusCard: React.FC<CurrentTripStatusCardProps> = ({
  vehicleName = 'Bus 1',
  vehiclePlate = 'ICT-4921',
  driverName = 'Hilal',
  driverPhone = '031241242',
  speedKmh = 38,
  distanceKm = 2.1,
  etaMins = 7,
  currentSector = 'Sector G-10',
  onCallDriver,
}) => {
  return (
    <View style={styles.card}>
      {/* 1. Header: Vehicle Name, Plate & Active Transit Badge */}
      <View style={styles.headerRow}>
        <View style={styles.vehicleCol}>
          <View style={styles.vehicleTitleRow}>
            <Text style={styles.vehicleTitle}>{vehicleName}</Text>
            <View style={styles.plateBadge}>
              <Text style={styles.plateText}>{vehiclePlate}</Text>
            </View>
          </View>
          <Text style={styles.driverSub}>
            Driver: <Text style={styles.boldText}>{driverName}</Text> • Currently in{' '}
            <Text style={styles.boldText}>{currentSector}</Text>
          </Text>
        </View>

        <View style={styles.liveTag}>
          <View style={styles.liveDot} />
          <Text style={styles.liveTagText}>ACTIVE TRANSIT</Text>
        </View>
      </View>

      {/* 2. Unified Dual-Child Status Banner */}
      <View style={styles.bothChildrenBox}>
        <Ionicons name="people" size={15} color="#007AFF" />
        <Text style={styles.bothChildrenText}>
          Both Children Onboard: Ayesha (Gr 4) & Zain Malik (Gr 2)
        </Text>
      </View>

      {/* 3. Realtime Telemetry Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>SPEED</Text>
          <Text style={styles.statValue}>{speedKmh} km/h</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statCol}>
          <Text style={styles.statLabel}>DISTANCE</Text>
          <Text style={styles.statValue}>{distanceKm} km</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statCol}>
          <Text style={styles.statLabel}>EST. ARRIVAL</Text>
          <Text style={styles.statValueBlue}>~{etaMins} mins</Text>
        </View>
      </View>

      {/* 4. In-App Call Action Button */}
      {onCallDriver ? (
        <TouchableOpacity
          style={styles.callButton}
          onPress={onCallDriver}
          activeOpacity={0.85}
        >
          <Ionicons name="call" size={16} color="#FFFFFF" />
          <Text style={styles.callButtonText}>
            Call Driver ({driverName}) In-App
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    ...shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  vehicleCol: {
    flex: 1,
    marginRight: 8,
  },
  vehicleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vehicleTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  plateBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  plateText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#475569',
  },
  driverSub: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  boldText: {
    color: '#0F172A',
    fontWeight: '700',
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F8EE',
    borderWidth: 1,
    borderColor: '#B5EBC7',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radii.full,
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#12B76A',
  },
  liveTagText: {
    color: '#12B76A',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  bothChildrenBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D0E4FF',
    gap: 7,
    marginBottom: 12,
  },
  bothChildrenText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#007AFF',
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    marginBottom: 12,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 9.5,
    color: '#64748B',
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  statValueBlue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#007AFF',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  callButton: {
    backgroundColor: '#007AFF',
    borderRadius: 14,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 3,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },
});

export default CurrentTripStatusCard;
