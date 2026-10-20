import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../../../../lib/theme';

interface AdminRosterNoticeCardProps {
  absentCount: number;
  onPressDetails?: () => void;
}

export const AdminRosterNoticeCard: React.FC<AdminRosterNoticeCardProps> = ({
  absentCount,
  onPressDetails,
}) => {
  if (absentCount === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        <View style={styles.iconCircle}>
          <Ionicons name="information-circle" size={20} color="#D97706" />
        </View>
        <View style={styles.textCol}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Admin Roster Notice</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{absentCount} Reported</Text>
            </View>
          </View>
          <Text style={styles.description}>
            {absentCount} student marked absent by school admin/parent before trip departure. Skip stop to save route time.
          </Text>
        </View>
      </View>
      {onPressDetails ? (
        <TouchableOpacity style={styles.actionBtn} onPress={onPressDetails} activeOpacity={0.75}>
          <Text style={styles.actionText}>View</Text>
          <Ionicons name="chevron-forward" size={14} color="#B45309" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    marginBottom: 14,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
  },
  badge: {
    backgroundColor: '#FDE68A',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: radii.sm,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  description: {
    fontSize: 11.5,
    color: '#B45309',
    lineHeight: 16,
    fontWeight: '500',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 2,
  },
  actionText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#B45309',
  },
});

export default AdminRosterNoticeCard;
