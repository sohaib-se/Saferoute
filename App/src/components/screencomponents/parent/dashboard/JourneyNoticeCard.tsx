import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';

interface JourneyNoticeCardProps {
  vehicleName?: string;
  sectorName?: string;
  driverName?: string;
}

export const JourneyNoticeCard: React.FC<JourneyNoticeCardProps> = ({
  vehicleName = 'Bus 1',
  sectorName = 'Sector G-10',
  driverName = 'Hilal',
}) => {
  return (
    <View style={styles.card}>
      {/* Top Status Header */}
      <View style={styles.topRow}>
        <View style={styles.liveTag}>
          <View style={styles.livePulse} />
          <Text style={styles.liveTagText}>ACTIVE TRANSIT</Text>
        </View>
        <View style={styles.routePill}>
          <Ionicons name="compass" size={13} color="#007AFF" />
          <Text style={styles.routePillText}>Morning Shift</Text>
        </View>
      </View>

      {/* Main Hero Card Body */}
      <View style={styles.heroRow}>
        <View style={styles.vehicleIconCircle}>
          <Ionicons name="bus" size={26} color="#FFFFFF" />
        </View>
        <View style={styles.heroTextCol}>
          <Text style={styles.heroTitle}>{vehicleName} • In Transit</Text>
          <Text style={styles.heroSubtitle}>
            Driver: <Text style={styles.highlightText}>{driverName}</Text> • Currently in{' '}
            <Text style={styles.highlightText}>{sectorName}</Text>
          </Text>
          <View style={styles.geofenceNote}>
            <Ionicons name="shield-checkmark" size={12} color="#12B76A" />
            <Text style={styles.geofenceText}>Live Proximity Geofencing Active</Text>
          </View>
        </View>
      </View>

      {/* Modern Journey Milestone Line */}
      <View style={styles.milestoneBox}>
        <View style={styles.trackLineContainer}>
          <View style={styles.trackLineBase} />
          <View style={styles.trackLineFilled} />

          {/* Node 1: Depot (Complete) */}
          <View style={[styles.nodeCircle, styles.nodeComplete, { left: 0 }]}>
            <Ionicons name="checkmark" size={11} color="#FFFFFF" />
          </View>

          {/* Node 2: Current Location (Active) */}
          <View style={[styles.nodeCircle, styles.nodeActive, { left: '50%' }]}>
            <View style={styles.nodeActiveInner} />
          </View>

          {/* Node 3: Home Stop (Upcoming) */}
          <View style={[styles.nodeCircle, styles.nodeUpcoming, { right: 0 }]}>
            <Ionicons name="home" size={10} color="#64748B" />
          </View>
        </View>

        <View style={styles.nodeLabelsRow}>
          <Text style={styles.nodeLabelPassed}>School Depot</Text>
          <Text style={styles.nodeLabelActive}>{sectorName}</Text>
          <Text style={styles.nodeLabelUpcoming}>Home Stop</Text>
        </View>
      </View>

      {/* Bottom Telemetry Chips */}
      <View style={styles.chipsRow}>
        <View style={styles.chip}>
          <Ionicons name="speedometer-outline" size={13} color="#007AFF" />
          <Text style={styles.chipText}>38 km/h</Text>
        </View>
        <View style={styles.chip}>
          <Ionicons name="navigate-outline" size={13} color="#007AFF" />
          <Text style={styles.chipText}>GPS Live 1s</Text>
        </View>
        <View style={styles.chip}>
          <Ionicons name="radio-outline" size={13} color="#12B76A" />
          <Text style={[styles.chipText, { color: '#12B76A' }]}>Signal Strong</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    ...shadows.cardHover,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F8EE',
    borderWidth: 1,
    borderColor: '#B5EBC7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    gap: 6,
  },
  livePulse: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#12B76A',
  },
  liveTagText: {
    color: '#12B76A',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  routePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    gap: 5,
  },
  routePillText: {
    color: '#007AFF',
    fontSize: 11,
    fontWeight: '700',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 16,
  },
  vehicleIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  heroTextCol: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
    marginBottom: 3,
  },
  heroSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 18,
    fontWeight: '500',
  },
  highlightText: {
    color: '#0F172A',
    fontWeight: '700',
  },
  geofenceNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },
  geofenceText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#12B76A',
  },
  milestoneBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 14,
  },
  trackLineContainer: {
    height: 16,
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 6,
  },
  trackLineBase: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  trackLineFilled: {
    position: 'absolute',
    left: 8,
    width: '50%',
    height: 4,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  nodeCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    top: -2,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nodeComplete: {
    backgroundColor: '#12B76A',
  },
  nodeActive: {
    backgroundColor: '#007AFF',
    marginLeft: -10,
  },
  nodeActiveInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  nodeUpcoming: {
    backgroundColor: '#E2E8F0',
  },
  nodeLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nodeLabelPassed: {
    fontSize: 10.5,
    color: '#64748B',
    fontWeight: '600',
  },
  nodeLabelActive: {
    fontSize: 10.5,
    color: '#007AFF',
    fontWeight: '800',
  },
  nodeLabelUpcoming: {
    fontSize: 10.5,
    color: '#94A3B8',
    fontWeight: '600',
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 5,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
});

export default JourneyNoticeCard;
