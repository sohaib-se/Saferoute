import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface ChildData {
  id: string;
  name: string;
  grade: string;
  studentCode: string;
  vehicle: string;
  driverName: string;
  driverPhone: string;
  status: 'Waiting' | 'En route' | 'Picked up' | 'Dropped off' | 'Absent';
  etaMinutes: number;
  pickupTime: string;
}

interface ChildStatusCardProps {
  child: ChildData;
  onTrackPress: (child: ChildData) => void;
  onCallPress: (child: ChildData) => void;
}

export const ChildStatusCard: React.FC<ChildStatusCardProps> = ({
  child,
  onTrackPress,
  onCallPress,
}) => {
  const getStatusColor = (status: ChildData['status']) => {
    switch (status) {
      case 'En route':
        return { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' };
      case 'Picked up':
        return { bg: '#F0FDF4', text: '#059669', border: '#BBF7D0' };
      case 'Dropped off':
        return { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' };
      case 'Absent':
        return { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA' };
      default:
        return { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' };
    }
  };

  const statusStyle = getStatusColor(child.status);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {child.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </Text>
        </View>

        <View style={styles.infoCol}>
          <Text style={styles.childName}>{child.name}</Text>
          <Text style={styles.gradeText}>
            {child.grade} • ID: {child.studentCode}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusStyle.bg, borderColor: statusStyle.border },
          ]}
        >
          <Text style={[styles.statusText, { color: statusStyle.text }]}>
            {child.status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsGrid}>
        <View style={styles.detailCol}>
          <Text style={styles.detailLabel}>Assigned Van</Text>
          <Text style={styles.detailValue}>{child.vehicle}</Text>
        </View>
        <View style={styles.detailCol}>
          <Text style={styles.detailLabel}>Driver</Text>
          <Text style={styles.detailValue}>{child.driverName}</Text>
        </View>
        <View style={styles.detailCol}>
          <Text style={styles.detailLabel}>Estimated ETA</Text>
          <Text style={[styles.detailValue, { color: '#2563EB', fontWeight: '800' }]}>
            ~{child.etaMinutes} mins
          </Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => onTrackPress(child)}
          activeOpacity={0.8}
        >
          <Ionicons name="navigate" size={15} color="#FFFFFF" />
          <Text style={styles.trackButtonText}>Live Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.callButton}
          onPress={() => onCallPress(child)}
          activeOpacity={0.7}
        >
          <Ionicons name="call" size={15} color="#2563EB" />
          <Text style={styles.callButtonText}>Call Driver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563EB',
  },
  infoCol: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  gradeText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  detailCol: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#94A3B8',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  trackButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 11,
    borderRadius: 10,
    gap: 6,
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 11,
    borderRadius: 10,
    gap: 6,
  },
  callButtonText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 13,
  },
});
