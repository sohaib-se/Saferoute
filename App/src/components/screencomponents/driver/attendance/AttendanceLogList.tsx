import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface AttendanceLogItemData {
  id: string;
  studentName: string;
  stop: string;
  time: string;
  status: 'Picked up' | 'Dropped off' | 'Absent';
}

interface AttendanceLogListProps {
  logs: AttendanceLogItemData[];
}

export const AttendanceLogList: React.FC<AttendanceLogListProps> = ({ logs }) => {
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
      <Text style={styles.sectionTitle}>Recorded Events (Today)</Text>

      {logs.map((log) => {
        const badge = getBadgeStyle(log.status);
        return (
          <View key={log.id} style={styles.logCard}>
            <View style={styles.logLeft}>
              <Text style={styles.studentName}>{log.studentName}</Text>
              <Text style={styles.stopText}>{log.stop}</Text>
              <Text style={styles.timeText}>Logged at: {log.time}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: badge.bg }]}>
              <View style={[styles.dot, { backgroundColor: badge.dot }]} />
              <Text style={[styles.badgeText, { color: badge.text }]}>{log.status}</Text>
            </View>
          </View>
        );
      })}
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
  logCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 10,
  },
  logLeft: {
    flex: 1,
  },
  studentName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  stopText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  timeText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
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
    fontWeight: '700',
  },
});

export default AttendanceLogList;
