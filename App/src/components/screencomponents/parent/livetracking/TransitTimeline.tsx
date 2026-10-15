import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TransitTimelineProps {
  vehicleName: string;
  driverName: string;
  driverPhone: string;
}

export const TransitTimeline: React.FC<TransitTimelineProps> = ({
  vehicleName,
  driverName,
  driverPhone,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.routeHeader}>
        <View>
          <Text style={styles.routeTitle}>{vehicleName} • Morning Pickup Route</Text>
          <Text style={styles.driverSub}>Driver: {driverName} ({driverPhone})</Text>
        </View>
        <View style={styles.activePill}>
          <View style={styles.greenDot} />
          <Text style={styles.activePillText}>Live GPS</Text>
        </View>
      </View>

      {/* Progress Timeline */}
      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <View style={[styles.timelineIconBox, { backgroundColor: '#ECFDF5' }]}>
            <Ionicons name="checkmark" size={14} color="#059669" />
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.stepTitle}>Trip Started from School Depot</Text>
            <Text style={styles.stepTime}>07:05 AM • Completed</Text>
          </View>
        </View>

        <View style={styles.timelineLine} />

        <View style={styles.timelineItem}>
          <View style={[styles.timelineIconBox, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="bus" size={14} color="#2563EB" />
          </View>
          <View style={styles.timelineContent}>
            <Text style={[styles.stepTitle, { color: '#2563EB' }]}>
              En Route (Approaching Sector G-10)
            </Text>
            <Text style={styles.stepTime}>Current Position • 38 km/h</Text>
          </View>
        </View>

        <View style={styles.timelineLine} />

        <View style={styles.timelineItem}>
          <View style={[styles.timelineIconBox, { backgroundColor: '#F8FAFC' }]}>
            <Ionicons name="home" size={14} color="#94A3B8" />
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.stepTitle}>Your Designated Home Stop</Text>
            <Text style={styles.stepTime}>Estimated: 07:22 AM (7 mins away)</Text>
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
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  routeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  driverSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  activePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },
  timeline: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  timelineIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  stepTime: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  timelineLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E2E8F0',
    marginLeft: 13,
    marginVertical: 2,
  },
});
