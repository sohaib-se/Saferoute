import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

export const TransitTimeline: React.FC = () => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Route Progress</Text>
        <TouchableOpacity style={styles.viewRouteBtn} activeOpacity={0.75}>
          <Ionicons name="map-outline" size={14} color="#007AFF" />
          <Text style={styles.viewRouteText}>View Full Route</Text>
        </TouchableOpacity>
      </View>

      {/* Timeline Steps */}
      <View style={styles.timelineContainer}>
        {/* Step 1: School Depot (Completed) */}
        <View style={styles.timelineStep}>
          <View style={styles.iconColumn}>
            <View style={[styles.circleBadge, styles.completedBadge]}>
              <Ionicons name="checkmark" size={17} color="#12B76A" />
            </View>
            <View style={styles.lineCompleted} />
          </View>
          <View style={styles.stepDetails}>
            <Text style={styles.stepTitle}>Trip Commenced from School Depot</Text>
            <Text style={styles.stepSubtitle}>07:05 AM • Completed</Text>
          </View>
        </View>

        {/* Step 2: En Route (Current) */}
        <View style={styles.timelineStep}>
          <View style={styles.iconColumn}>
            <View style={[styles.circleBadge, styles.currentBadge]}>
              <Ionicons name="bus" size={16} color="#007AFF" />
            </View>
            <View style={styles.linePending} />
          </View>
          <View style={styles.stepDetails}>
            <View style={styles.stepTitleRow}>
              <Text style={[styles.stepTitle, styles.stepTitleBlue]}>
                En Route (Approaching Sector G-10)
              </Text>
              <View style={styles.currentTag}>
                <Text style={styles.currentTagText}>Current</Text>
              </View>
            </View>
            <Text style={styles.stepSubtitle}>Current Position • Telemetry 38 km/h</Text>
          </View>
        </View>

        {/* Step 3: Designated Home Stop (Pending) */}
        <View style={[styles.timelineStep, { marginBottom: 0 }]}>
          <View style={styles.iconColumn}>
            <View style={[styles.circleBadge, styles.pendingBadge]}>
              <Ionicons name="home" size={16} color="#007AFF" />
            </View>
          </View>
          <View style={styles.stepDetails}>
            <Text style={styles.stepTitle}>Your Designated Home Stop</Text>
            <Text style={styles.stepSubtitle}>
              Next Stop • Approaching designated student zone
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    ...shadows.card,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  viewRouteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 5,
  },
  viewRouteText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#007AFF',
  },
  timelineContainer: {
    paddingLeft: 2,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  iconColumn: {
    alignItems: 'center',
    width: 36,
    marginRight: 12,
  },
  circleBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedBadge: {
    backgroundColor: '#E6F8EE',
  },
  currentBadge: {
    backgroundColor: '#EBF4FF',
  },
  pendingBadge: {
    backgroundColor: '#EBF4FF',
  },
  lineCompleted: {
    width: 2,
    height: 28,
    backgroundColor: '#12B76A',
    marginVertical: 3,
  },
  linePending: {
    width: 2,
    height: 28,
    backgroundColor: '#93C5FD',
    marginVertical: 3,
  },
  stepDetails: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 10,
  },
  stepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  stepTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepTitleBlue: {
    color: '#007AFF',
    flex: 1,
  },
  currentTag: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  currentTagText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#007AFF',
  },
  stepSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
});

export default TransitTimeline;
