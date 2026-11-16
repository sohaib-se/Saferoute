import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

export const RegisteredChildrenCard: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <Ionicons name="people" size={20} color="#007AFF" style={styles.headerIcon} />
          <Text style={styles.sectionTitle}>Registered Children</Text>
        </View>
      </View>
      <Text style={styles.sectionSubtitle}>
        Manage your children and view their transit details
      </Text>

      <View style={styles.emptyCard}>
        <Ionicons name="school-outline" size={32} color="#94A3B8" />
        <Text style={styles.emptyText}>No registered children found.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    marginLeft: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    marginRight: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
    marginLeft: 2,
    fontWeight: '500',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...shadows.card,
  },
  emptyText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
});

export default RegisteredChildrenCard;
