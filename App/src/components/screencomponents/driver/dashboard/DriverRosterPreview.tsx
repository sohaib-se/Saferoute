import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';
import { StudentRosterItem } from '../../../../context/DriverTripContext';

interface DriverRosterPreviewProps {
  students: StudentRosterItem[];
  onMarkAttendance: (student: StudentRosterItem) => void;
  onCallParent: (student: StudentRosterItem) => void;
  onViewFullRoster: () => void;
}

export const DriverRosterPreview: React.FC<DriverRosterPreviewProps> = ({
  students,
  onMarkAttendance,
  onCallParent,
  onViewFullRoster,
}) => {
  const getBadgeStyle = (st: StudentRosterItem) => {
    switch (st.milestone) {
      case 'picked_home':
        return { bg: '#ECFDF5', text: '#059669', dot: '#10B981', border: '#A7F3D0', label: 'Onboard (Van)' };
      case 'dropped_school':
        return { bg: '#F5F3FF', text: '#7C3AED', dot: '#8B5CF6', border: '#DDD6FE', label: 'At School' };
      case 'picked_school':
        return { bg: '#E0F2FE', text: '#0284C7', dot: '#0284C7', border: '#BAE6FD', label: 'Onboard (Return)' };
      case 'dropped_home':
        return { bg: '#ECFDF5', text: '#059669', dot: '#10B981', border: '#A7F3D0', label: 'Safely Home' };
      case 'absent':
        return { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444', border: '#FECACA', label: 'Absent' };
      default:
        return { bg: '#FFFBEB', text: '#D97706', dot: '#F59E0B', border: '#FDE68A', label: 'Waiting at Home' };
    }
  };

  // Show top 3 students for dashboard preview
  const previewList = students.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleCol}>
          <Text style={styles.title}>Assigned Student Roster</Text>
          <Text style={styles.subtitle}>Ordered by transit stop sequence</Text>
        </View>
        <TouchableOpacity onPress={onViewFullRoster} activeOpacity={0.75}>
          <View style={styles.seeAllBadge}>
            <Text style={styles.seeAllText}>All Stops ({students.length}) →</Text>
          </View>
        </TouchableOpacity>
      </View>

      {previewList.map((st) => {
        const badge = getBadgeStyle(st);
        const isCompleted = st.milestone === 'dropped_home';
        const isAbsent = st.milestone === 'absent';
        const isAtSchool = st.milestone === 'dropped_school';

        return (
          <View key={st.id} style={styles.card}>
            {/* Top row: Stop circle + Avatar + Name + Status Badge */}
            <View style={styles.mainRow}>
              <View style={styles.stopSeqCircle}>
                <Text style={styles.stopSeqText}>#{st.stopNumber}</Text>
              </View>

              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{st.avatarInitials}</Text>
              </View>

              <View style={styles.infoCol}>
                <View style={styles.nameRow}>
                  <Text style={styles.studentName} numberOfLines={1}>
                    {st.name}
                  </Text>
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: badge.bg, borderColor: badge.border },
                    ]}
                  >
                    <View style={[styles.dot, { backgroundColor: badge.dot }]} />
                    <Text style={[styles.badgeText, { color: badge.text }]}>
                      {badge.label}
                    </Text>
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

            {/* Admin notice if absent */}
            {st.adminNotice ? (
              <View style={styles.noticeBox}>
                <Ionicons name="information-circle" size={13} color="#DC2626" />
                <Text style={styles.noticeText} numberOfLines={1}>
                  {st.adminNotice}
                </Text>
              </View>
            ) : null}

            {/* Action Row */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[
                  styles.markButton,
                  isCompleted && styles.completedMarkButton,
                  isAbsent && styles.disabledMarkButton,
                ]}
                onPress={() => onMarkAttendance(st)}
                activeOpacity={0.8}
                disabled={isAbsent}
              >
                <Ionicons
                  name={isCompleted ? 'checkmark-circle' : 'checkmark-done'}
                  size={15}
                  color={isCompleted ? '#059669' : '#FFFFFF'}
                />
                <Text
                  style={[
                    styles.markButtonText,
                    isCompleted && { color: '#059669' },
                  ]}
                >
                  {isCompleted
                    ? 'Dropped at Home'
                    : isAtSchool
                    ? 'At Campus'
                    : st.milestone === 'picked_home'
                    ? 'Onboard Van'
                    : st.milestone === 'picked_school'
                    ? 'Onboard Return'
                    : 'Scheduled Stop'}
                </Text>
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
  titleCol: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  seeAllBadge: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.sm,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#007AFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginBottom: 10,
    ...shadows.card,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stopSeqCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  stopSeqText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#007AFF',
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#051329',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
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
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
    marginRight: 6,
  },
  gradeText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
    fontWeight: '500',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  addressText: {
    fontSize: 11.5,
    color: '#64748B',
    flex: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.full,
    borderWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    gap: 4,
  },
  noticeText: {
    fontSize: 11,
    color: '#DC2626',
    fontWeight: '600',
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 8,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    gap: 5,
  },
  callButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007AFF',
  },
  markButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    gap: 5,
    ...shadows.primaryGlow,
  },
  completedMarkButton: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    elevation: 0,
    shadowOpacity: 0,
  },
  disabledMarkButton: {
    backgroundColor: '#F1F5F9',
    elevation: 0,
    shadowOpacity: 0,
  },
  markButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

export default DriverRosterPreview;
