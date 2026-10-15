import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DriverMetricsProps {
  total: number;
  picked: number;
  dropped: number;
  waiting: number;
}

export const DriverMetrics: React.FC<DriverMetricsProps> = ({
  total,
  picked,
  dropped,
  waiting,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.statBox, { backgroundColor: '#EFF6FF' }]}>
        <Ionicons name="people" size={16} color="#2563EB" />
        <Text style={[styles.statNumber, { color: '#1E40AF' }]}>{total}</Text>
        <Text style={styles.statTitle}>Total</Text>
      </View>

      <View style={[styles.statBox, { backgroundColor: '#ECFDF5' }]}>
        <Ionicons name="checkmark-circle" size={16} color="#059669" />
        <Text style={[styles.statNumber, { color: '#065F46' }]}>{picked}</Text>
        <Text style={styles.statTitle}>Onboard</Text>
      </View>

      <View style={[styles.statBox, { backgroundColor: '#F5F3FF' }]}>
        <Ionicons name="home" size={16} color="#7C3AED" />
        <Text style={[styles.statNumber, { color: '#5B21B6' }]}>{dropped}</Text>
        <Text style={styles.statTitle}>Arrived</Text>
      </View>

      <View style={[styles.statBox, { backgroundColor: '#FFFBEB' }]}>
        <Ionicons name="time" size={16} color="#D97706" />
        <Text style={[styles.statNumber, { color: '#92400E' }]}>{waiting}</Text>
        <Text style={styles.statTitle}>Pending</Text>
      </View>
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
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },
  statTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 1,
  },
});

export default DriverMetrics;
