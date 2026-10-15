import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RadarMapCardProps {
  vehicleName?: string;
  driverName?: string;
  speedKmh?: number;
  etaMins?: number;
  distanceKm?: number;
  onPressFullMap?: () => void;
}

export const RadarMapCard: React.FC<RadarMapCardProps> = ({
  vehicleName = 'Bus 1',
  driverName = 'Hilal',
  speedKmh = 36,
  etaMins = 7,
  distanceKm = 2.1,
  onPressFullMap,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>GPS RADAR</Text>
          </View>
          <Text style={styles.vehicleTitle}>{vehicleName}</Text>
        </View>

        {onPressFullMap && (
          <TouchableOpacity onPress={onPressFullMap} style={styles.fullScreenButton}>
            <Text style={styles.fullScreenText}>Full Map</Text>
            <Ionicons name="expand-outline" size={14} color="#2563EB" />
          </TouchableOpacity>
        )}
      </View>

      {/* Simulated Map Graphic Container */}
      <View style={styles.mapGraphic}>
        <View style={styles.gridLineHorizontal} />
        <View style={styles.gridLineVertical} />

        {/* Route Line Simulation */}
        <View style={styles.routeTrace} />

        {/* Bus Marker */}
        <View style={styles.busMarker}>
          <Ionicons name="bus" size={16} color="#FFFFFF" />
        </View>

        {/* Home Destination Marker */}
        <View style={styles.homeMarker}>
          <Ionicons name="home" size={14} color="#FFFFFF" />
        </View>

        <View style={styles.etaOverlay}>
          <Ionicons name="time-outline" size={13} color="#FFFFFF" />
          <Text style={styles.etaOverlayText}>ETA {etaMins} mins</Text>
        </View>
      </View>

      <View style={styles.telemetryRow}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Speed</Text>
          <Text style={styles.metricVal}>{speedKmh} km/h</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Distance</Text>
          <Text style={styles.metricVal}>{distanceKm} km</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Driver</Text>
          <Text style={styles.metricVal}>{driverName}</Text>
        </View>
      </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  liveText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  vehicleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  fullScreenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  fullScreenText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  mapGraphic: {
    height: 140,
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  gridLineHorizontal: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#BAE6FD',
  },
  gridLineVertical: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#BAE6FD',
  },
  routeTrace: {
    position: 'absolute',
    width: '60%',
    height: 4,
    backgroundColor: '#2563EB',
    borderRadius: 2,
    transform: [{ rotate: '-25deg' }],
  },
  busMarker: {
    position: 'absolute',
    left: '35%',
    top: '45%',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 4,
  },
  homeMarker: {
    position: 'absolute',
    right: '25%',
    top: '25%',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
  },
  etaOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  etaOverlayText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  telemetryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748B',
    textTransform: 'uppercase',
  },
  metricVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 2,
  },
});
