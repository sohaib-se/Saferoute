import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface StudentRosterItemData {
  id: string;
  stopNumber: number;
  name: string;
  grade: string;
  stopAddress: string;
  status: 'Waiting' | 'Picked up' | 'Dropped off' | 'Absent';
  parentPhone?: string;
  parentName?: string;
}

interface DriverRosterPreviewProps {
  students: StudentRosterItemData[];
  onMarkAttendance: (student: StudentRosterItemData) => void;
  onViewFullRoster: () => void;
}

export const DriverRosterPreview: React.FC<DriverRosterPreviewProps> = ({
  students,
  onMarkAttendance,
  onViewFullRoster,
}) => {
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'Picked up':
        return { bg: '#ECFDF5', text: '#059669', dot: '#10B981' };
      case 'Dropped off':
        return { bg: '#F5F3FF', text: '#7C3AED', dot: '#8B5CF6' };
      case 'Absent':
        return { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444' };
      default:
        return { bg: '#FFFBEB', text: '#D97706', dot: '#F59E0B' };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Today's Student Roster</Text>
        <TouchableOpacity onPress={onViewFullRoster}>
          <Text style={styles.seeAllText}>View Full Roster ({students.length})</Text>
        </TouchableOpacity>
      </View>

      {students.map((st) => {
        const badge = getBadgeStyle(st.status);
        return (
          <View key={st.id} style={styles.card}>
            <View style={styles.mainRow}>
              <View style={styles.stopCircle}>
                <Text style={styles.stopNumber}>#{st.stopNumber}</Text>
              </View>

              <View style={styles.infoCol}>
                <View style={styles.nameRow}>
                  <Text style={styles.studentName}>{st.name}</Text>
                  <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                    <View style={[styles.dot, { backgroundColor: badge.dot }]} />
                    <Text style={[styles.badgeText, { color: badge.text }]}>{st.status}</Text>
                  </View>
                </View>
                <Text style={styles.gradeText}>{st.grade}</Text>
                <View style={styles.addressRow}>
                  <Ionicons name="location-outline" size={13} color="#64748B" />
                  <Text style={styles.addressText} numberOfLines={1}>
                    {st.stopAddress}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => {
                  if (st.parentPhone) Linking.openURL(`tel:${st.parentPhone}`);
                  else Alert.alert('Contact', `Call parent of ${st.name}`);
                }}
                activeOpacity={0.7}
              >
                <Ionicons name="call" size={13} color="#2563EB" />
                <Text style={styles.callButtonText}>Call Parent</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.markButton}
                onPress={() => onMarkAttendance(st)}
                activeOpacity={0.8}
              >
                <Ionicons name="checkmark-done" size={13} color="#FFFFFF" />
                <Text style={styles.markButtonText}>Mark Attendance</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stopCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  stopNumber: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  infoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  gradeText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  addressText: {
    fontSize: 12,
    color: '#64748B',
    flex: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
    gap: 8,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  callButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  markButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  markButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default DriverRosterPreview;
