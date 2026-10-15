import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TrackingMapCanvasProps {
  vehicleName: string;
  driverName: string;
  speedKmh: number;
  etaMins: number;
  distanceKm: number;
}

export const TrackingMapCanvas: React.FC<TrackingMapCanvasProps> = ({
  vehicleName,
  driverName,
  speedKmh,
  etaMins,
  distanceKm,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.mapCanvas}>
        {/* Map grid lines */}
        <View style={styles.gridLineH1} />
        <View style={styles.gridLineH2} />
        <View style={styles.gridLineV1} />
        <View style={styles.gridLineV2} />

        {/* Route Path Indicator */}
        <View style={styles.routePath} />

        {/* Bus Marker */}
        <View style={styles.busMarker}>
          <Ionicons name="bus" size={20} color="#FFFFFF" />
        </View>

        {/* Destination Home Marker */}
        <View style={styles.homeMarker}>
          <Ionicons name="home" size={16} color="#FFFFFF" />
        </View>

        {/* Floating Top Telemetry Pill */}
        <View style={styles.floatingTopPill}>
          <View style={styles.pulseDot} />
          <Text style={styles.pillText}>Live WebSocket GPS • 1s Ping</Text>
        </View>

        {/* Floating Bottom Card */}
        <View style={styles.floatingBottomCard}>
          <View style={styles.floatCol}>
            <Text style={styles.floatLabel}>ESTIMATED ARRIVAL</Text>
            <Text style={styles.floatValue}>~{etaMins} mins</Text>
          </View>
          <View style={styles.vDivider} />
          <View style={styles.floatCol}>
            <Text style={styles.floatLabel}>DISTANCE</Text>
            <Text style={styles.floatValue}>{distanceKm} km away</Text>
          </View>
          <View style={styles.vDivider} />
          <View style={styles.floatCol}>
            <Text style={styles.floatLabel}>CURRENT SPEED</Text>
            <Text style={styles.floatValue}>{speedKmh} km/h</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
  },
  mapCanvas: {
    height: 250,
    backgroundColor: '#E2E8F0',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLineH1: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  gridLineH2: {
    position: 'absolute',
    top: '70%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  gridLineV1: {
    position: 'absolute',
    left: '30%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#CBD5E1',
  },
  gridLineV2: {
    position: 'absolute',
    left: '70%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#CBD5E1',
  },
  routePath: {
    position: 'absolute',
    width: 180,
    height: 6,
    backgroundColor: '#2563EB',
    borderRadius: 3,
    transform: [{ rotate: '-35deg' }],
  },
  busMarker: {
    position: 'absolute',
    left: '35%',
    top: '48%',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 5,
  },
  homeMarker: {
    position: 'absolute',
    right: '25%',
    top: '25%',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 4,
  },
  floatingTopPill: {
    position: 'absolute',
    top: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  floatingBottomCard: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  floatCol: {
    flex: 1,
    alignItems: 'center',
  },
  floatLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '800',
  },
  floatValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  vDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
});
