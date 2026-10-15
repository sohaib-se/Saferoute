import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const UpcomingStopsList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Upcoming Route Stops</Text>

      <View style={styles.stopCard}>
        <View style={styles.stopBadge}>
          <Text style={styles.stopBadgeText}>NEXT</Text>
        </View>
        <View style={styles.stopContent}>
          <Text style={styles.stopName}>Stop #2 • Main Ring Road, Gate 2</Text>
          <Text style={styles.stopStudent}>Student: Hamza Ali (Grade 7)</Text>
          <Text style={styles.stopEta}>ETA: 4 mins • 1.2 km away</Text>
        </View>
      </View>

      <View style={styles.stopCard}>
        <View style={[styles.stopBadge, { backgroundColor: '#F1F5F9' }]}>
          <Text style={[styles.stopBadgeText, { color: '#64748B' }]}>#3</Text>
        </View>
        <View style={styles.stopContent}>
          <Text style={styles.stopName}>Stop #3 • Street 4, Sector G-10</Text>
          <Text style={styles.stopStudent}>Student: Ayesha Malik (Grade 4)</Text>
          <Text style={styles.stopEta}>ETA: 9 mins • 2.6 km away</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  stopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 8,
    gap: 12,
  },
  stopBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EFF6FF',
    borderRadius: 6,
  },
  stopBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
  },
  stopContent: {
    flex: 1,
  },
  stopName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  stopStudent: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  stopEta: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
    marginTop: 2,
  },
});

export default UpcomingStopsList;
