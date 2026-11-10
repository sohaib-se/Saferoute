import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StudentRosterItem } from '../../../../context/DriverTripContext';

interface StudentPickupCardProps {
  student: StudentRosterItem;
  onPickUp: (student: StudentRosterItem) => void;
  onMarkAbsent: (student: StudentRosterItem) => void;
  onCallParent?: (student: StudentRosterItem) => void;
}

export const StudentPickupCard: React.FC<StudentPickupCardProps> = ({
  student,
  onPickUp,
  onMarkAbsent,
  onCallParent,
}) => {
  const isPickedUp = student.milestone === 'picked_home' || student.status === 'Picked up';
  const isAbsent = student.milestone === 'absent' || student.status === 'Absent';
  const isPending = !isPickedUp && !isAbsent;

  return (
    <View style={[styles.card, isPickedUp && styles.cardPicked, isAbsent && styles.cardAbsent]}>
      {/* Top Details Row */}
      <View style={styles.topRow}>
        <View style={styles.stopCircle}>
          <Text style={styles.stopNumber}>#{student.stopNumber}</Text>
        </View>

        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{student.avatarInitials}</Text>
        </View>

        <View style={styles.infoCol}>
          <View style={styles.nameHeader}>
            <Text style={styles.name} numberOfLines={1}>
              {student.name}
            </Text>
            {isPickedUp && (
              <View style={styles.pickedBadge}>
                <Ionicons name="checkmark-circle" size={12} color="#059669" />
                <Text style={styles.pickedBadgeText}>Onboard</Text>
              </View>
            )}
            {isAbsent && (
              <View style={styles.absentBadge}>
                <Ionicons name="close-circle" size={12} color="#DC2626" />
                <Text style={styles.absentBadgeText}>Absent</Text>
              </View>
            )}
            {isPending && (
              <View style={styles.waitingBadge}>
                <View style={styles.waitingDot} />
                <Text style={styles.waitingBadgeText}>Waiting</Text>
              </View>
            )}
          </View>

          <Text style={styles.grade}>{student.grade}</Text>

          {/* Address */}
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={12} color="#64748B" />
            <Text style={styles.addressText} numberOfLines={1}>
              {student.stopAddress}
            </Text>
          </View>

          {/* Parent details */}
          <View style={styles.parentRow}>
            <Ionicons name="person-outline" size={11} color="#94A3B8" />
            <Text style={styles.parentText} numberOfLines={1}>
              {student.parentName} • {student.parentPhone}
            </Text>
          </View>
        </View>

        {/* Quick Call Parent icon */}
        {onCallParent && (
          <TouchableOpacity
            style={styles.callIconBtn}
            onPress={() => onCallParent(student)}
            activeOpacity={0.7}
          >
            <Ionicons name="call" size={15} color="#007AFF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Action buttons if student is pending */}
      {isPending && (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.absentBtn}
            onPress={() => onMarkAbsent(student)}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={15} color="#DC2626" />
            <Text style={styles.absentBtnText}>Mark Absent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pickUpBtn}
            onPress={() => onPickUp(student)}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark-sharp" size={16} color="#FFFFFF" />
            <Text style={styles.pickUpBtnText}>Pick Up Student</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Timestamp if picked up */}
      {isPickedUp && student.pickedUpAt && (
        <View style={styles.loggedTimeRow}>
          <Ionicons name="time-outline" size={12} color="#059669" />
          <Text style={styles.loggedTimeText}>Boarded at {student.pickedUpAt}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
  },
  cardPicked: {
    backgroundColor: '#F8FCFA',
    borderColor: '#A7F3D0',
  },
  cardAbsent: {
    backgroundColor: '#FEF8F8',
    borderColor: '#FECACA',
    opacity: 0.8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  stopCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stopNumber: {
    fontSize: 10,
    fontWeight: '800',
    color: '#007AFF',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  infoCol: {
    flex: 1,
  },
  nameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  grade: {
    fontSize: 11,
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
    fontSize: 11,
    color: '#475569',
    flex: 1,
  },
  parentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  parentText: {
    fontSize: 10.5,
    color: '#94A3B8',
  },
  callIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
    gap: 4,
  },
  waitingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
  },
  waitingBadgeText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#D97706',
  },
  pickedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 4,
  },
  pickedBadgeText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#059669',
  },
  absentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FECACA',
    gap: 4,
  },
  absentBadgeText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#DC2626',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  absentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    gap: 4,
  },
  absentBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  pickUpBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#059669',
    gap: 6,
  },
  pickUpBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  loggedTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#E6EFF7',
  },
  loggedTimeText: {
    fontSize: 10.5,
    color: '#059669',
    fontWeight: '600',
  },
});

