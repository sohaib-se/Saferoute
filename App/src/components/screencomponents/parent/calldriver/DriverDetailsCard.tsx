import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

interface DriverDetailsCardProps {
  driverName?: string;
  phone?: string;
  vehicleName?: string;
  plateNumber?: string;
  licenseNumber?: string;
  onCallDriver?: () => void;
}

export const DriverDetailsCard: React.FC<DriverDetailsCardProps> = ({
  driverName = 'Hilal',
  phone = '031241242',
  vehicleName = 'Bus 1',
  plateNumber = 'ICT-4921',
  licenseNumber = 'DL-32412',
  onCallDriver,
}) => {
  const handleCall = () => {
    if (onCallDriver) {
      onCallDriver();
    } else {
      Linking.openURL(`tel:${phone}`);
    }
  };

  return (
    <View style={styles.card}>
      {/* Top Driver Profile Header */}
      <View style={styles.headerRow}>
        <View style={styles.avatarWrapper}>
          {/* Driver Portrait Avatar */}
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={38} color="#94A3B8" />
          </View>
          {/* Green Online Dot */}
          <View style={styles.onlineStatusBadge} />
        </View>

        <View style={styles.driverInfo}>
          <Text style={styles.name}>{driverName}</Text>
          <View style={styles.assignedBadge}>
            <Ionicons name="checkmark-circle" size={13} color="#12B76A" />
            <Text style={styles.assignedText}>Assigned Route Driver</Text>
          </View>
          <View style={styles.phoneRow}>
            <Ionicons name="call" size={13} color="#64748B" />
            <Text style={styles.phoneLabel}>Phone: </Text>
            <Text style={styles.phoneNumber}>{phone}</Text>
          </View>
        </View>
      </View>

      {/* 3 Mini Stat Cards */}
      <View style={styles.statsRow}>
        <View style={styles.statMiniCard}>
          <Ionicons name="bus" size={18} color="#007AFF" style={styles.miniIcon} />
          <Text style={styles.miniLabel}>Assigned Van</Text>
          <Text style={styles.miniValue}>{vehicleName}</Text>
        </View>

        <View style={styles.statMiniCard}>
          <Ionicons name="document-text" size={18} color="#007AFF" style={styles.miniIcon} />
          <Text style={styles.miniLabel}>Plate Number</Text>
          <Text style={styles.miniValue}>{plateNumber}</Text>
        </View>

        <View style={styles.statMiniCard}>
          <Ionicons name="shield-checkmark" size={18} color="#007AFF" style={styles.miniIcon} />
          <Text style={styles.miniLabel}>License #</Text>
          <Text style={styles.miniValue}>{licenseNumber}</Text>
        </View>
      </View>

      {/* Primary Action Call Button */}
      <TouchableOpacity style={styles.callButton} onPress={handleCall} activeOpacity={0.85}>
        <View style={styles.callContent}>
          <Ionicons name="call" size={18} color="#FFFFFF" />
          <Text style={styles.callButtonText}>Call Driver ({driverName})</Text>
        </View>
        <View style={styles.callChevronCircle}>
          <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    marginBottom: 20,
    ...shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F1F5F9',
  },
  onlineStatusBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#12B76A',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
  },
  driverInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  assignedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F8EE',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 12,
    gap: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 4,
  },
  assignedText: {
    fontSize: 11,
    color: '#12B76A',
    fontWeight: '700',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  phoneLabel: {
    fontSize: 12.5,
    color: '#64748B',
    marginLeft: 4,
    fontWeight: '500',
  },
  phoneNumber: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statMiniCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  miniIcon: {
    marginBottom: 6,
  },
  miniLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  miniValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  callButton: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  callContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  callChevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DriverDetailsCard;
