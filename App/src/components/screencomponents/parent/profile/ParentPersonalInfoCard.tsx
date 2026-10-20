import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../../../../lib/theme';

interface ParentPersonalInfoCardProps {
  email?: string;
  phone?: string;
  address?: string;
  joinedDate?: string;
  role?: string;
}

export const ParentPersonalInfoCard: React.FC<ParentPersonalInfoCardProps> = ({
  email = 'zeeshan@gmail.com',
  phone = '+92 312 412412',
  address = 'Ghari Rashida',
  joinedDate = '15 Sep 2024',
  role = 'Primary Guardian',
}) => {
  return (
    <View style={styles.container}>
      {/* Section Title matching the reference image */}
      <Text style={styles.sectionTitle}>Personal Info</Text>

      {/* 2-Column Grid Card */}
      <View style={styles.card}>
        {/* Row 1: Date of joined & Account Role */}
        <View style={styles.gridRow}>
          <View style={styles.gridCol}>
            <View style={styles.labelRow}>
              <Ionicons name="calendar-outline" size={13} color="#F59E0B" />
              <Text style={styles.label}>Date of joined</Text>
            </View>
            <Text style={styles.value} numberOfLines={1}>
              {joinedDate}
            </Text>
          </View>

          <View style={styles.gridCol}>
            <View style={styles.labelRow}>
              <Ionicons name="shield-outline" size={13} color="#F59E0B" />
              <Text style={styles.label}>Account Role</Text>
            </View>
            <Text style={styles.value} numberOfLines={1}>
              {role}
            </Text>
          </View>
        </View>

        <View style={styles.rowDivider} />

        {/* Row 2: Phone Number & Email Address */}
        <View style={styles.gridRow}>
          <View style={styles.gridCol}>
            <View style={styles.labelRow}>
              <Ionicons name="phone-portrait-outline" size={13} color="#F59E0B" />
              <Text style={styles.label}>Phone Number</Text>
            </View>
            <Text style={styles.value} numberOfLines={1}>
              {phone}
            </Text>
          </View>

          <View style={styles.gridCol}>
            <View style={styles.labelRow}>
              <Ionicons name="mail-outline" size={13} color="#F59E0B" />
              <Text style={styles.label}>Email Address</Text>
            </View>
            <Text style={styles.value} numberOfLines={1}>
              {email}
            </Text>
          </View>
        </View>

        <View style={styles.rowDivider} />

        {/* Row 3: Designated Geofence Stop */}
        <View style={styles.fullRow}>
          <View style={styles.labelRow}>
            <Ionicons name="location-outline" size={13} color="#F59E0B" />
            <Text style={styles.label}>Geofence Stop</Text>
          </View>
          <Text style={styles.value} numberOfLines={1}>
            {address}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D9488', // Teal accent color from reference image
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: -0.2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    ...shadows.card,
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  gridCol: {
    flex: 1,
    paddingRight: 8,
  },
  fullRow: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 3,
  },
  label: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
});

export default ParentPersonalInfoCard;
