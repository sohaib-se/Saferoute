import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

interface TrackingMapCanvasProps {
  vehicleName?: string;
  driverName?: string;
  speedKmh?: number;
  distanceKm?: number;
}

export const TrackingMapCanvas: React.FC<TrackingMapCanvasProps> = ({
  vehicleName = 'Bus 1',
  driverName = 'Hilal',
  speedKmh = 38,
}) => {
  return (
    <View style={styles.mapCanvas}>
      {/* 1. Parks and Green Spaces */}
      <View style={styles.parkArea1} />
      <View style={styles.parkArea2} />

      {/* 2. Street Network Grid */}
      <View style={styles.gridLineH1} />
      <View style={styles.gridLineH2} />
      <View style={styles.gridLineV1} />
      <View style={styles.gridLineV2} />

      {/* Major Boulevards */}
      <View style={styles.avenueHorizontal} />
      <View style={styles.avenueVertical} />
      <View style={styles.streetDiagonal} />

      {/* 3. Sector City Labels */}
      <Text style={styles.sectorDepot}>School Depot (H-8)</Text>
      <Text style={styles.sectorG10}>Sector G-10</Text>
      <Text style={styles.sectorF10}>Sector F-10</Text>

      {/* 4. Active Transit Route Polyline */}
      <View style={styles.routeCurveMain} />
      <View style={styles.routeCurveBranch} />

      {/* Depot Start Marker */}
      <View style={styles.depotMarker}>
        <Ionicons name="school" size={14} color="#64748B" />
      </View>

      {/* Intermediate Pickup Waypoint */}
      <View style={styles.waypointDot}>
        <View style={styles.waypointDotInner} />
      </View>

      {/* Destination Home Stop Marker */}
      <View style={styles.destinationMarker}>
        <Ionicons name="home" size={18} color="#FFFFFF" />
      </View>
      <View style={styles.destinationBadge}>
        <Text style={styles.destinationBadgeText}>Home Stop</Text>
      </View>

      {/* 5. Live Bus Marker with Halo and Directional Telemetry Tooltip */}
      <View style={styles.busMarkerPulse}>
        <View style={styles.busMarkerCircle}>
          <Ionicons name="bus" size={18} color="#FFFFFF" />
        </View>
      </View>

      {/* Floating Dark Telemetry Bubble directly above Bus */}
      <View style={styles.busTooltip}>
        <Ionicons name="navigate" size={12} color="#FFFFFF" style={styles.tooltipArrow} />
        <View>
          <Text style={styles.tooltipTitle}>{vehicleName} ({driverName})</Text>
          <Text style={styles.tooltipSpeed}>{speedKmh} km/h • Live GPS</Text>
        </View>
      </View>

      {/* 6. Top-Left Floating Live GPS Badge */}
      <View style={styles.liveGpsBadge}>
        <View style={styles.liveGpsDot} />
        <Text style={styles.liveGpsText}>Live GPS • 1s update</Text>
      </View>

      {/* 7. Top-Right Floating Map Controls (Recenter, Layers) */}
      <View style={styles.floatingControls}>
        <TouchableOpacity style={styles.mapBtn} activeOpacity={0.8}>
          <Ionicons name="locate" size={18} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapBtn} activeOpacity={0.8}>
          <Ionicons name="layers-outline" size={17} color="#1E293B" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapCanvas: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#EEF7FB',
    position: 'relative',
    overflow: 'hidden',
  },
  parkArea1: {
    position: 'absolute',
    top: 20,
    left: 15,
    width: 130,
    height: 90,
    backgroundColor: '#E2F3E7',
    borderRadius: 24,
    transform: [{ rotate: '-12deg' }],
  },
  parkArea2: {
    position: 'absolute',
    bottom: 25,
    right: 15,
    width: 140,
    height: 100,
    backgroundColor: '#DCF3E4',
    borderRadius: 28,
    transform: [{ rotate: '15deg' }],
  },
  gridLineH1: {
    position: 'absolute',
    top: '22%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(186, 230, 253, 0.6)',
  },
  gridLineH2: {
    position: 'absolute',
    top: '70%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(186, 230, 253, 0.6)',
  },
  gridLineV1: {
    position: 'absolute',
    left: '24%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(186, 230, 253, 0.6)',
  },
  gridLineV2: {
    position: 'absolute',
    right: '24%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(186, 230, 253, 0.6)',
  },
  avenueHorizontal: {
    position: 'absolute',
    top: '46%',
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '-4deg' }],
  },
  avenueVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '48%',
    width: 16,
    backgroundColor: '#FFFFFF',
  },
  streetDiagonal: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    width: '80%',
    height: 12,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '25deg' }],
  },
  sectorDepot: {
    position: 'absolute',
    top: 45,
    left: 30,
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  sectorG10: {
    position: 'absolute',
    top: '52%',
    left: 30,
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
  },
  sectorF10: {
    position: 'absolute',
    top: '28%',
    right: 40,
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
  },
  routeCurveMain: {
    position: 'absolute',
    top: '32%',
    left: '20%',
    width: '60%',
    height: 130,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderColor: '#007AFF',
    borderRadius: 60,
    transform: [{ rotate: '-15deg' }],
  },
  routeCurveBranch: {
    position: 'absolute',
    top: '20%',
    right: '22%',
    width: 14,
    height: 70,
    backgroundColor: '#007AFF',
    borderRadius: 4,
    transform: [{ rotate: '42deg' }],
  },
  depotMarker: {
    position: 'absolute',
    top: 65,
    left: 60,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  waypointDot: {
    position: 'absolute',
    top: '46%',
    left: '32%',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 2.5,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waypointDotInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#007AFF',
  },
  destinationMarker: {
    position: 'absolute',
    top: '18%',
    right: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00BA88',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#00BA88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 10,
  },
  destinationBadge: {
    position: 'absolute',
    top: '18%',
    right: 88,
    backgroundColor: '#00BA88',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    shadowColor: '#00BA88',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  destinationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  busMarkerPulse: {
    position: 'absolute',
    top: '42%',
    left: '45%',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(0, 122, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  busMarkerCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 5,
  },
  busTooltip: {
    position: 'absolute',
    top: '32%',
    left: '32%',
    backgroundColor: '#0F2748',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 15,
  },
  tooltipArrow: {
    transform: [{ rotate: '45deg' }],
  },
  tooltipTitle: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '800',
  },
  tooltipSpeed: {
    color: '#93C5FD',
    fontSize: 9.5,
    fontWeight: '600',
  },
  liveGpsBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C3F0D4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 12,
  },
  liveGpsDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#12B76A',
  },
  liveGpsText: {
    color: '#12B76A',
    fontSize: 11,
    fontWeight: '700',
  },
  floatingControls: {
    position: 'absolute',
    right: 14,
    top: 14,
    gap: 8,
    zIndex: 12,
  },
  mapBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6EFF7',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default TrackingMapCanvas;
