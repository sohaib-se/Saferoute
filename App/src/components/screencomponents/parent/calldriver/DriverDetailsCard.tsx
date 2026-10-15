import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DriverDetailsCardProps {
  driverName?: string;
  phone?: string;
  vehicleName?: string;
  plateNumber?: string;
  licenseNumber?: string;
  onOpenChat?: () => void;
}

export const DriverDetailsCard: React.FC<DriverDetailsCardProps> = ({
  driverName = 'Hilal',
  phone = '03124124',
  vehicleName = 'Bus 1',
  plateNumber = 'ICT-4921',
  licenseNumber = 'DL-32412',
  onOpenChat,
}) => {
  const handleCall = () => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={26} color="#2563EB" />
        </View>
        <View style={styles.driverInfo}>
          <Text style={styles.name}>{driverName}</Text>
          <Text style={styles.role}>Assigned Route Driver</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </View>

      <View style={styles.vehicleInfoBox}>
        <View style={styles.vCol}>
          <Text style={styles.vLabel}>Assigned Van</Text>
          <Text style={styles.vVal}>{vehicleName}</Text>
        </View>
        <View style={styles.vCol}>
          <Text style={styles.vLabel}>License Plate</Text>
          <Text style={styles.vVal}>{plateNumber}</Text>
        </View>
        <View style={styles.vCol}>
          <Text style={styles.vLabel}>License #</Text>
          <Text style={styles.vVal}>{licenseNumber}</Text>
        </View>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.callBtn} onPress={handleCall} activeOpacity={0.8}>
          <Ionicons name="call" size={16} color="#FFFFFF" />
          <Text style={styles.callBtnText}>Call Driver</Text>
        </TouchableOpacity>

        {onOpenChat && (
          <TouchableOpacity style={styles.chatBtn} onPress={onOpenChat} activeOpacity={0.8}>
            <Ionicons name="chatbubbles" size={16} color="#2563EB" />
            <Text style={styles.chatBtnText}>Chat</Text>
          </TouchableOpacity>
        )}
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
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  driverInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  role: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  phone: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 2,
  },
  vehicleInfoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  vCol: {
    flex: 1,
  },
  vLabel: {
    fontSize: 10,
    color: '#94A3B8',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  vVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 2,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  callBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  callBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  chatBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  chatBtnText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 14,
  },
});
