import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { radii, shadows } from '../../../../lib/theme';

interface DriverMetricsProps {
  total: number;
  picked: number;
  dropped: number;
  waiting: number;
  absent: number;
}

export const DriverMetrics: React.FC<DriverMetricsProps> = ({
  total,
  picked,
  dropped,
  waiting,
  absent,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.statBox, styles.totalBox]}>
        <View style={[styles.iconCircle, { backgroundColor: '#DBEAFE' }]}>
          <Ionicons name="people" size={14} color="#1D4ED8" />
        </View>
        <Text style={[styles.statNumber, { color: '#1E3A8A' }]}>{total}</Text>
        <Text style={styles.statTitle}>Total</Text>
      </View>

      <View style={[styles.statBox, styles.waitingBox]}>
        <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
          <Ionicons name="time" size={14} color="#D97706" />
        </View>
        <Text style={[styles.statNumber, { color: '#92400E' }]}>{waiting}</Text>
        <Text style={styles.statTitle}>Pending</Text>
      </View>

      <View style={[styles.statBox, styles.pickedBox]}>
        <View style={[styles.iconCircle, { backgroundColor: '#D1FAE5' }]}>
          <Ionicons name="bus" size={14} color="#059669" />
        </View>
        <Text style={[styles.statNumber, { color: '#065F46' }]}>{picked}</Text>
        <Text style={styles.statTitle}>Onboard</Text>
      </View>

      <View style={[styles.statBox, styles.droppedBox]}>
        <View style={[styles.iconCircle, { backgroundColor: '#EDE9FE' }]}>
          <Ionicons name="checkmark-done" size={14} color="#7C3AED" />
        </View>
        <Text style={[styles.statNumber, { color: '#5B21B6' }]}>{dropped}</Text>
        <Text style={styles.statTitle}>Arrived</Text>
      </View>

      {absent > 0 && (
        <View style={[styles.statBox, styles.absentBox]}>
          <View style={[styles.iconCircle, { backgroundColor: '#FEE2E2' }]}>
            <Ionicons name="close" size={14} color="#DC2626" />
          </View>
          <Text style={[styles.statNumber, { color: '#991B1B' }]}>{absent}</Text>
          <Text style={styles.statTitle}>Absent</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    borderRadius: radii.lg,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    ...shadows.card,
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  totalBox: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  waitingBox: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  pickedBox: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  droppedBox: {
    backgroundColor: '#F5F3FF',
    borderColor: '#DDD6FE',
  },
  absentBox: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '800',
  },
  statTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 1,
  },
});

export default DriverMetrics;
