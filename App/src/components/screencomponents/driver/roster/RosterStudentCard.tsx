import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';
import { StudentRosterItem, RosterShiftPhase } from '../../../../context/DriverTripContext';

interface RosterStudentCardProps {
  student: StudentRosterItem;
  phase?: RosterShiftPhase;
  onPickUp: (student: StudentRosterItem) => void;
  onDropSchool: (student: StudentRosterItem) => void;
  onDropHome: (student: StudentRosterItem) => void;
  onCallParent?: (student: StudentRosterItem) => void;
  onOpenModal?: (student: StudentRosterItem) => void;
}

export const RosterStudentCard: React.FC<RosterStudentCardProps> = ({
  student,
  phase = 'morning_pickup',
  onPickUp,
  onDropSchool,
  onDropHome,
}) => {
  const getBadgeStyle = () => {
    switch (student.milestone) {
      case 'picked_home':
        return { bg: '#ECFDF5', text: '#059669', dot: '#10B981', border: '#A7F3D0', label: 'Onboard (Van)' };
      case 'dropped_school':
        return { bg: '#F5F3FF', text: '#7C3AED', dot: '#8B5CF6', border: '#DDD6FE', label: 'At School' };
      case 'picked_school':
        return { bg: '#E0F2FE', text: '#0284C7', dot: '#0284C7', border: '#BAE6FD', label: 'Onboard (Return)' };
      case 'dropped_home':
        return { bg: '#ECFDF5', text: '#059669', dot: '#10B981', border: '#A7F3D0', label: 'Dropped at Home' };
      case 'absent':
        return { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444', border: '#FECACA', label: 'Absent' };
      default:
        return { bg: '#FFFBEB', text: '#D97706', dot: '#F59E0B', border: '#FDE68A', label: 'Waiting at Home' };
    }
  };

  const badge = getBadgeStyle();
  const isAbsent = student.milestone === 'absent';
  const isDroppedHome = student.milestone === 'dropped_home';
  const isAtSchool = student.milestone === 'dropped_school';

  return (
    <View style={styles.card}>
      {/* Top row: Stop sequence + Student Avatar + Info + Status Badge */}
      <View style={styles.mainRow}>
        <View style={styles.stopSeqCircle}>
          <Text style={styles.stopSeqText}>#{student.stopNumber}</Text>
        </View>

        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{student.avatarInitials}</Text>
        </View>

        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text style={styles.studentName} numberOfLines={1}>
              {student.name}
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

          <Text style={styles.gradeText}>{student.grade}</Text>

          {/* Pickup address */}
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={13} color="#64748B" />
            <Text style={styles.addressText} numberOfLines={1}>
              {student.stopAddress}
            </Text>
          </View>

          {/* Recorded timestamps */}
          {(student.pickedUpAt || student.droppedOffAt || student.afternoonDroppedAt) && (
            <View style={styles.timestampRow}>
              {student.pickedUpAt ? (
                <View style={styles.timeTag}>
                  <Ionicons name="bus-outline" size={11} color="#059669" />
                  <Text style={styles.timeTagText}>Picked: {student.pickedUpAt}</Text>
                </View>
              ) : null}
              {student.droppedOffAt ? (
                <View style={[styles.timeTag, { backgroundColor: '#F5F3FF', borderColor: '#DDD6FE' }]}>
                  <Ionicons name="school-outline" size={11} color="#7C3AED" />
                  <Text style={[styles.timeTagText, { color: '#7C3AED' }]}>School: {student.droppedOffAt}</Text>
                </View>
              ) : null}
              {student.afternoonDroppedAt ? (
                <View style={[styles.timeTag, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
                  <Ionicons name="home-outline" size={11} color="#059669" />
                  <Text style={[styles.timeTagText, { color: '#059669' }]}>Home: {student.afternoonDroppedAt}</Text>
                </View>
              ) : null}
            </View>
          )}
        </View>
      </View>

      {/* Admin Absence Notice */}
      {student.adminNotice ? (
        <View style={styles.noticeBox}>
          <Ionicons name="information-circle" size={14} color="#DC2626" />
          <Text style={styles.noticeText}>{student.adminNotice}</Text>
        </View>
      ) : null}

      {/* Action Row */}
      <View style={styles.actionRow}>
        {/* Dynamic Attendance Action Button based on User flow requirements */}
        {student.milestone === 'waiting_home' && (phase === 'at_school' || phase === 'afternoon_return' || phase === 'completed') && (
          <View style={styles.missedPill}>
            <Ionicons name="alert-circle" size={15} color="#64748B" />
            <Text style={styles.missedText}>Missed Morning</Text>
          </View>
        )}

        {student.milestone === 'waiting_home' && phase !== 'at_school' && phase !== 'afternoon_return' && phase !== 'completed' && (
          <TouchableOpacity
            style={styles.pickUpBtn}
            onPress={() => onPickUp(student)}
            activeOpacity={0.82}
          >
            <Ionicons name="bus" size={15} color="#FFFFFF" />
            <Text style={styles.btnTextWhite}>Pick Up</Text>
          </TouchableOpacity>
        )}

        {student.milestone === 'picked_home' && (
          <TouchableOpacity
            style={styles.dropSchoolBtn}
            onPress={() => onDropSchool(student)}
            activeOpacity={0.82}
          >
            <Ionicons name="school" size={15} color="#FFFFFF" />
            <Text style={styles.btnTextWhite}>Drop School</Text>
          </TouchableOpacity>
        )}

        {student.milestone === 'dropped_school' && (
          <View style={styles.atSchoolPill}>
            <Ionicons name="checkmark-circle" size={15} color="#7C3AED" />
            <Text style={styles.atSchoolText}>At School</Text>
          </View>
        )}

        {student.milestone === 'picked_school' && (
          <TouchableOpacity
            style={styles.dropHomeBtn}
            onPress={() => onDropHome(student)}
            activeOpacity={0.82}
          >
            <Ionicons name="home" size={15} color="#FFFFFF" />
            <Text style={styles.btnTextWhite}>Drop Home</Text>
          </TouchableOpacity>
        )}

        {isDroppedHome && (
          <View style={styles.completedPill}>
            <Ionicons name="checkmark-done-circle" size={16} color="#059669" />
            <Text style={styles.completedText}>Safely at Home</Text>
          </View>
        )}

        {isAbsent && (
          <View style={styles.absentPill}>
            <Ionicons name="close-circle" size={15} color="#DC2626" />
            <Text style={styles.absentText}>Absent Today</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginBottom: 12,
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
  timestampRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
    gap: 4,
  },
  timeTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
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
    paddingVertical: 6,
    marginTop: 8,
    gap: 6,
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
    alignItems: 'center',
  },
  pickUpBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    gap: 6,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  dropSchoolBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    gap: 6,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  dropHomeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    gap: 6,
    ...shadows.primaryGlow,
  },
  btnTextWhite: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  atSchoolPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF5FF',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    paddingVertical: 8,
    borderRadius: radii.md,
    gap: 5,
  },
  atSchoolText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7C3AED',
  },
  completedPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingVertical: 8,
    borderRadius: radii.md,
    gap: 5,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
  },
  absentPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingVertical: 8,
    borderRadius: radii.md,
    gap: 5,
  },
  absentText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  missedPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 8,
    borderRadius: radii.md,
    gap: 5,
  },
  missedText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
});

export default RosterStudentCard;
