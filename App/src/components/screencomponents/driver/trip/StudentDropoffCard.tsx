import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StudentRosterItem } from '../../../../context/DriverTripContext';

interface StudentDropoffCardProps {
  student: StudentRosterItem;
  onDropStudent: (student: StudentRosterItem) => void;
  onCallParent?: (student: StudentRosterItem) => void;
}

export const StudentDropoffCard: React.FC<StudentDropoffCardProps> = ({
  student,
  onDropStudent,
  onCallParent,
}) => {
  const isDropped = student.milestone === 'dropped_home' || student.status === 'Dropped off';
  const isPending = !isDropped;

  return (
    <View style={[styles.card, isDropped && styles.cardDropped]}>
      <View style={styles.topRow}>
        <View style={[styles.stopCircle, isDropped && styles.stopCircleDropped]}>
          <Text style={[styles.stopNumber, isDropped && styles.stopNumberDropped]}>
            #{student.stopNumber}
          </Text>
        </View>

        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{student.avatarInitials}</Text>
        </View>

        <View style={styles.infoCol}>
          <View style={styles.nameHeader}>
            <Text style={styles.name} numberOfLines={1}>
              {student.name}
            </Text>
            {isDropped ? (
              <View style={styles.droppedBadge}>
                <Ionicons name="checkmark-circle" size={12} color="#059669" />
                <Text style={styles.droppedBadgeText}>Dropped Home</Text>
              </View>
            ) : (
              <View style={styles.onboardBadge}>
                <Ionicons name="bus" size={11} color="#007AFF" />
                <Text style={styles.onboardBadgeText}>Onboard</Text>
              </View>
            )}
          </View>

          <Text style={styles.grade}>{student.grade}</Text>

          {/* Destination Drop Address */}
          <View style={styles.addressRow}>
            <Ionicons name="home-outline" size={12} color="#64748B" />
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

      {/* Action button if still onboard */}
      {isPending && (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.dropBtn}
            onPress={() => onDropStudent(student)}
            activeOpacity={0.8}
          >
            <Ionicons name="home" size={15} color="#FFFFFF" />
            <Text style={styles.dropBtnText}>Drop Student at Home</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Timestamp if dropped */}
      {isDropped && student.droppedOffAt && (
        <View style={styles.loggedTimeRow}>
          <Ionicons name="checkmark-done" size={13} color="#059669" />
          <Text style={styles.loggedTimeText}>Safely dropped at {student.droppedOffAt}</Text>
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
  cardDropped: {
    backgroundColor: '#F8FCFA',
    borderColor: '#A7F3D0',
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
  stopCircleDropped: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  stopNumber: {
    fontSize: 10,
    fontWeight: '800',
    color: '#007AFF',
  },
  stopNumberDropped: {
    color: '#059669',
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
  onboardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    gap: 4,
  },
  onboardBadgeText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#007AFF',
  },
  droppedBadge: {
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
  droppedBadgeText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#059669',
  },
  actionsRow: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  dropBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#0284C7',
    gap: 6,
  },
  dropBtnText: {
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

