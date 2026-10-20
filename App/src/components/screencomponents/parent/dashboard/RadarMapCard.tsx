import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';

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
            <Text style={styles.liveText}>GPS TELEMETRY</Text>
          </View>
          <Text style={styles.vehicleTitle}>{vehicleName}</Text>
        </View>

        {onPressFullMap && (
          <TouchableOpacity onPress={onPressFullMap} style={styles.fullScreenButton} activeOpacity={0.75}>
            <Text style={styles.fullScreenText}>Open Live Map</Text>
            <Ionicons name="expand" size={13} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Simulated Map Graphic Container */}
      <View style={styles.mapGraphic}>
        <View style={styles.gridLineH1} />
        <View style={styles.gridLineH2} />
        <View style={styles.gridLineV1} />
        <View style={styles.gridLineV2} />

        {/* Dynamic Route Track */}
        <View style={styles.routeTrace} />

        {/* Bus Marker */}
        <View style={styles.busMarker}>
          <Ionicons name="bus" size={17} color="#FFFFFF" />
        </View>

        {/* Destination Home Marker */}
        <View style={styles.homeMarker}>
          <Ionicons name="home" size={14} color="#FFFFFF" />
        </View>

        <View style={styles.etaOverlay}>
          <View style={styles.pingDot} />
          <Text style={styles.etaOverlayText}>Live Van Position ({distanceKm} km away)</Text>
        </View>
      </View>

      <View style={styles.telemetryRow}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>SPEED</Text>
          <Text style={styles.metricVal}>{speedKmh} km/h</Text>
        </View>
        <View style={styles.vDivider} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>DISTANCE</Text>
          <Text style={styles.metricVal}>{distanceKm} km</Text>
        </View>
        <View style={styles.vDivider} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>ASSIGNED DRIVER</Text>
          <Text style={styles.metricVal}>{driverName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1.5,
    borderColor: colors.primaryBorder,
    ...shadows.card,
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
    backgroundColor: colors.emeraldLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.emeraldBorder,
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.emerald,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.emeraldDark,
    letterSpacing: 0.5,
  },
  vehicleTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textHeading,
  },
  fullScreenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.sm,
    gap: 4,
  },
  fullScreenText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  mapGraphic: {
    height: 148,
    backgroundColor: colors.primaryLight,
    borderRadius: radii.md,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.primaryBorder,
  },
  gridLineH1: {
    position: 'absolute',
    top: '33%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(186, 230, 253, 0.7)',
  },
  gridLineH2: {
    position: 'absolute',
    top: '66%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(186, 230, 253, 0.7)',
  },
  gridLineV1: {
    position: 'absolute',
    left: '33%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(186, 230, 253, 0.7)',
  },
  gridLineV2: {
    position: 'absolute',
    left: '66%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(186, 230, 253, 0.7)',
  },
  routeTrace: {
    position: 'absolute',
    width: '65%',
    height: 5,
    backgroundColor: colors.primary,
    borderRadius: 3,
    transform: [{ rotate: '-22deg' }],
  },
  busMarker: {
    position: 'absolute',
    left: '34%',
    top: '44%',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    ...shadows.primaryGlow,
  },
  homeMarker: {
    position: 'absolute',
    right: '25%',
    top: '25%',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.emerald,
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
    backgroundColor: 'rgba(2, 132, 199, 0.92)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: radii.sm,
    gap: 6,
  },
  pingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  etaOverlayText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  telemetryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: colors.primarySubtle,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: radii.sm,
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  metricVal: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textHeading,
    marginTop: 2,
  },
  vDivider: {
    width: 1,
    height: 22,
    backgroundColor: colors.primaryBorder,
  },
});

export default RadarMapCard;
