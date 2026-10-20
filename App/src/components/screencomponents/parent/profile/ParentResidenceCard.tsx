import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

interface ParentResidenceCardProps {
  address?: string;
  email?: string;
  alternateContact?: string;
  onEdit?: () => void;
}

export const ParentResidenceCard: React.FC<ParentResidenceCardProps> = ({
  address = 'Khatme Nabuwat Chowk, Ghari Rashida',
  email = 'zeeshan@gmail.com',
  alternateContact = '+92 300 1234567',
  onEdit,
}) => {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <Ionicons name="home" size={20} color="#007AFF" style={styles.headerIcon} />
          <Text style={styles.sectionTitle}>Contact & Residence Info</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit} activeOpacity={0.75}>
          <Ionicons name="pencil" size={12} color="#007AFF" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionSubtitle}>Your primary contact and location details</Text>

      {/* 3 Detail Rows in White Card */}
      <View style={styles.card}>
        {/* Row 1: Geofence Stop */}
        <TouchableOpacity style={styles.row} activeOpacity={0.75}>
          <View style={[styles.iconCircle, { backgroundColor: '#EBF4FF' }]}>
            <Ionicons name="location" size={18} color="#007AFF" />
          </View>
          <View style={styles.rowTextCol}>
            <Text style={styles.label}>Designated Geofence Stop</Text>
            <Text style={styles.value}>{address}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Row 2: Guardian Email */}
        <TouchableOpacity style={styles.row} activeOpacity={0.75}>
          <View style={[styles.iconCircle, { backgroundColor: '#E6F8EE' }]}>
            <Ionicons name="mail" size={18} color="#12B76A" />
          </View>
          <View style={styles.rowTextCol}>
            <Text style={styles.label}>Guardian Email</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Row 3: Alternate Contact */}
        <TouchableOpacity style={styles.row} activeOpacity={0.75}>
          <View style={[styles.iconCircle, { backgroundColor: '#F3E8FF' }]}>
            <Ionicons name="call" size={18} color="#8B5CF6" />
          </View>
          <View style={styles.rowTextCol}>
            <Text style={styles.label}>Alternate Contact</Text>
            <Text style={styles.value}>{alternateContact}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
        </TouchableOpacity>
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
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 4,
  },
  editText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007AFF',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
    marginLeft: 2,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    ...shadows.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTextCol: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  value: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
});

export default ParentResidenceCard;
