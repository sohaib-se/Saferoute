import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../../../../lib/theme';

interface DriverPersonalInfoCardProps {
  vehicle?: string;
  route?: string;
  license?: string;
  licenseType?: string;
  loginId?: string;
  phone?: string;
}

export const DriverPersonalInfoCard: React.FC<DriverPersonalInfoCardProps> = ({
  vehicle = 'Bus 1 (ICT-4921)',
  route = 'Sector G-10',
  license = 'DL-32412',
  licenseType = 'Heavy Transport',
  loginId = '9584',
  phone = '03124124',
}) => {
  return (
    <View style={styles.container}>
      {/* Section Title matching reference image */}
      <Text style={styles.sectionTitle}>Personal Info</Text>

      {/* 2-Column Grid Card */}
      <View style={styles.card}>
        {/* Row 1 */}
        <View style={styles.gridRow}>
          <View style={styles.gridCol}>
            <View style={styles.labelRow}>
              <Ionicons name="bus-outline" size={13} color="#F59E0B" />
              <Text style={styles.label}>Assigned Bus</Text>
            </View>
            <Text style={styles.value} numberOfLines={1}>
              {vehicle}
            </Text>
          </View>

          <View style={styles.gridCol}>
            <View style={styles.labelRow}>
              <Ionicons name="map-outline" size={13} color="#F59E0B" />
              <Text style={styles.label}>Transit Route</Text>
            </View>
            <Text style={styles.value} numberOfLines={1}>
              {route}
            </Text>
          </View>
        </View>

        <View style={styles.rowDivider} />

        {/* Row 2 */}
        <View style={styles.gridRow}>
          <View style={styles.gridCol}>
            <View style={styles.labelRow}>
              <Ionicons name="card-outline" size={13} color="#F59E0B" />
              <Text style={styles.label}>License Number</Text>
            </View>
            <Text style={styles.value} numberOfLines={1}>
              {license}
            </Text>
          </View>

          <View style={styles.gridCol}>
            <View style={styles.labelRow}>
              <Ionicons name="car-sport-outline" size={13} color="#F59E0B" />
              <Text style={styles.label}>License Type</Text>
            </View>
            <Text style={styles.value} numberOfLines={1}>
              {licenseType}
            </Text>
          </View>
        </View>

        <View style={styles.rowDivider} />

        {/* Row 3 */}
        <View style={styles.gridRow}>
          <View style={styles.gridCol}>
            <View style={styles.labelRow}>
              <Ionicons name="key-outline" size={13} color="#F59E0B" />
              <Text style={styles.label}>Driver Login ID</Text>
            </View>
            <Text style={styles.value} numberOfLines={1}>
              {loginId}
            </Text>
          </View>

          <View style={styles.gridCol}>
            <View style={styles.labelRow}>
              <Ionicons name="phone-portrait-outline" size={13} color="#F59E0B" />
              <Text style={styles.label}>Phone Number</Text>
            </View>
            <Text style={styles.value} numberOfLines={1}>
              {phone}
            </Text>
          </View>
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

export default DriverPersonalInfoCard;
