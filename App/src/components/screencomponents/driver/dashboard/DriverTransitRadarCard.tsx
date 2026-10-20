import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';
import { GPSBroadcastState } from '../../../../context/DriverTripContext';

interface DriverTransitRadarCardProps {
  vehicleName: string;
  isTripActive: boolean;
  gpsState: GPSBroadcastState;
  onPressViewRoute?: () => void;
  onToggleConnectivity?: () => void;
}

export const DriverTransitRadarCard: React.FC<DriverTransitRadarCardProps> = ({
  vehicleName,
  isTripActive,
  gpsState,
  onPressViewRoute,
  onToggleConnectivity,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View
            style={[
              styles.liveIndicator,
              isTripActive
                ? gpsState.isOnline
                  ? styles.indicatorLive
                  : styles.indicatorOffline
                : styles.indicatorIdle,
            ]}
          >
            <View
              style={[
                styles.liveDot,
                isTripActive
                  ? gpsState.isOnline
                    ? styles.dotLive
                    : styles.dotOffline
                  : styles.dotIdle,
              ]}
            />
            <Text
              style={[
                styles.liveText,
                isTripActive
                  ? gpsState.isOnline
                    ? styles.textLive
                    : styles.textOffline
                  : styles.textIdle,
              ]}
            >
              {isTripActive
                ? gpsState.isOnline
                  ? 'GPS BROADCAST (5s)'
                  : 'OFFLINE (BUFFERING)'
                : 'GPS IDLE (STOPPED)'}
            </Text>
          </View>
          <Text style={styles.vehicleTitle}>{vehicleName}</Text>
        </View>

        {onPressViewRoute && (
          <TouchableOpacity onPress={onPressViewRoute} style={styles.fullScreenButton} activeOpacity={0.75}>
            <Text style={styles.fullScreenText}>Roster Route</Text>
            <Ionicons name="map-outline" size={13} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Simulated Map Graphic Container matching Parent Portal */}
      <View style={styles.mapGraphic}>
        <View style={styles.gridLineH1} />
        <View style={styles.gridLineH2} />
        <View style={styles.gridLineV1} />
        <View style={styles.gridLineV2} />

        {/* Dynamic Route Track */}
        <View style={styles.routeTrace} />

        {/* Bus Marker (Pulse) */}
        <View style={styles.busMarker}>
          <Ionicons name="bus" size={17} color="#FFFFFF" />
        </View>

        {/* Next Stop Marker */}
        <View style={styles.stopMarker}>
          <Ionicons name="location" size={14} color="#FFFFFF" />
        </View>

        {/* Live Coordinate / Channel Pill */}
        <View style={styles.etaOverlay}>
          <View
            style={[
              styles.pingDot,
              { backgroundColor: isTripActive ? '#10B981' : '#F59E0B' },
            ]}
          />
          <Text style={styles.etaOverlayText}>
            {isTripActive
              ? `${gpsState.latitude.toFixed(4)}°N, ${gpsState.longitude.toFixed(4)}°E • ${gpsState.speedKmh} km/h`
              : 'Trip Idle • GPS Privacy Protection Active'}
          </Text>
        </View>
      </View>

      {/* Telemetry Metrics */}
      <View style={styles.telemetryRow}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>INTERVAL</Text>
          <Text style={styles.metricVal}>
            {isTripActive ? `${gpsState.frequencySeconds}s Sample` : 'Off'}
          </Text>
        </View>
        <View style={styles.vDivider} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>QUEUED PINGS</Text>
          <Text
            style={[
              styles.metricVal,
              gpsState.queuedPings > 0 && { color: colors.danger },
            ]}
          >
            {gpsState.queuedPings} Buffered
          </Text>
        </View>
        <View style={styles.vDivider} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>LAST SYNC</Text>
          <Text style={styles.metricVal} numberOfLines={1}>
            {gpsState.lastPingTime}
          </Text>
        </View>
      </View>

      {/* Connectivity Simulation Button for REQ-D4.3 demonstration */}
      {isTripActive && onToggleConnectivity && (
        <TouchableOpacity
          onPress={onToggleConnectivity}
          style={styles.simButton}
          activeOpacity={0.75}
        >
          <Ionicons
            name={gpsState.isOnline ? 'wifi' : 'cloud-offline'}
            size={13}
            color={gpsState.isOnline ? '#0284C7' : '#D97706'}
          />
          <Text style={styles.simButtonText}>
            {gpsState.isOnline
              ? 'Test Connectivity Loss (Queue pings offline)'
              : 'Restore Connection (Flush buffered pings)'}
          </Text>
        </TouchableOpacity>
      )}
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
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.full,
    borderWidth: 1,
    gap: 5,
  },
  indicatorLive: {
    backgroundColor: colors.emeraldLight,
    borderColor: colors.emeraldBorder,
  },
  indicatorOffline: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  indicatorIdle: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotLive: {
    backgroundColor: colors.emerald,
  },
  dotOffline: {
    backgroundColor: '#D97706',
  },
  dotIdle: {
    backgroundColor: '#94A3B8',
  },
  liveText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  textLive: {
    color: colors.emeraldDark,
  },
  textOffline: {
    color: '#92400E',
  },
  textIdle: {
    color: '#64748B',
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
  stopMarker: {
    position: 'absolute',
    right: '25%',
    top: '25%',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#7C3AED',
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
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
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
  },
  etaOverlayText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '700',
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
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.textHeading,
    marginTop: 2,
  },
  vDivider: {
    width: 1,
    height: 22,
    backgroundColor: colors.primaryBorder,
  },
  simButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  simButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
});

export default DriverTransitRadarCard;
