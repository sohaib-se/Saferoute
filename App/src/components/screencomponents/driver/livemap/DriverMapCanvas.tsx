import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DriverMapCanvasProps {
  speedKmh?: number;
  etaMins?: number;
  distanceKm?: number;
}

export const DriverMapCanvas: React.FC<DriverMapCanvasProps> = ({
  speedKmh = 42,
  etaMins = 12,
  distanceKm = 3.8,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mapCanvas}>
        {/* Road grid lines */}
        <View style={styles.roadHorizontal} />
        <View style={styles.roadVertical} />
        <View style={styles.roadDiagonal} />

        {/* School Marker */}
        <View style={styles.schoolMarker}>
          <Ionicons name="school" size={14} color="#FFFFFF" />
          <Text style={styles.markerLabel}>School</Text>
        </View>

        {/* Bus Marker */}
        <View style={styles.busMarker}>
          <Ionicons name="bus" size={18} color="#FFFFFF" />
          <View style={styles.pulseRing} />
        </View>

        {/* Stop Marker */}
        <View style={styles.homeMarker}>
          <Ionicons name="location" size={14} color="#FFFFFF" />
          <Text style={styles.markerLabel}>Next Stop</Text>
        </View>

        {/* 500m alert radius */}
        <View style={styles.geofenceRing} />
        <View style={styles.geofenceBadge}>
          <Text style={styles.geofenceText}>500m Auto-Alert</Text>
        </View>
      </View>

      <View style={styles.metricsBar}>
        <View style={styles.metricItem}>
          <Ionicons name="speedometer-outline" size={16} color="#2563EB" />
          <Text style={styles.metricVal}>{speedKmh} km/h</Text>
          <Text style={styles.metricSub}>Speed</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Ionicons name="time-outline" size={16} color="#059669" />
          <Text style={styles.metricVal}>{etaMins} mins</Text>
          <Text style={styles.metricSub}>Next Stop</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Ionicons name="navigate-outline" size={16} color="#7C3AED" />
          <Text style={styles.metricVal}>{distanceKm} km</Text>
          <Text style={styles.metricSub}>Remaining</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  mapCanvas: {
    height: 220,
    backgroundColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roadHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 18,
    backgroundColor: '#CBD5E1',
    top: 100,
  },
  roadVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 18,
    backgroundColor: '#CBD5E1',
    left: 170,
  },
  roadDiagonal: {
    position: 'absolute',
    top: -20,
    bottom: -20,
    width: 12,
    backgroundColor: '#94A3B8',
    transform: [{ rotate: '42deg' }],
  },
  busMarker: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
    position: 'absolute',
    top: 88,
    left: 158,
  },
  pulseRing: {
    position: 'absolute',
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: 'rgba(37, 99, 235, 0.4)',
  },
  schoolMarker: {
    position: 'absolute',
    top: 24,
    left: 36,
    backgroundColor: '#1E293B',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  homeMarker: {
    position: 'absolute',
    bottom: 30,
    right: 36,
    backgroundColor: '#059669',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  markerLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  geofenceRing: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(16, 185, 129, 0.7)',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    bottom: -20,
    right: 0,
  },
  geofenceBadge: {
    position: 'absolute',
    bottom: 8,
    right: 28,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  geofenceText: {
    fontSize: 9,
    color: '#059669',
    fontWeight: '700',
  },
  metricsBar: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  metricSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#F1F5F9',
  },
});

export default DriverMapCanvas;
