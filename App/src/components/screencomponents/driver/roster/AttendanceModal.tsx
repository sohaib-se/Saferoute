import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';
import { StudentRosterItem } from '../../../../context/DriverTripContext';

interface AttendanceModalProps {
  visible: boolean;
  student: StudentRosterItem | null;
  onClose: () => void;
  onSelectStatus: (studentId: string, status: 'Picked up' | 'Dropped off' | 'Absent') => void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  visible,
  student,
  onClose,
  onSelectStatus,
}) => {
  if (!student) return null;

  const isAlreadyPicked = !!student.pickedUpAt || student.status === 'Picked up';
  const isAlreadyDropped = !!student.droppedOffAt || student.status === 'Dropped off';
  const isAbsent = student.status === 'Absent';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.stopBadge}>
                <Text style={styles.stopBadgeText}>Stop #{student.stopNumber}</Text>
              </View>
              <View>
                <Text style={styles.title}>{student.name}</Text>
                <Text style={styles.subtitle}>{student.grade} • {student.stopAddress}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* REQ-D5.2: Notification Disclosure Box */}
          <View style={styles.disclosureBox}>
            <Ionicons name="shield-checkmark" size={16} color="#0284C7" />
            <Text style={styles.disclosureText}>
              Marking attendance will dispatch a real-time push notification <Text style={styles.boldText}>ONLY to {student.parentName}</Text> ({student.parentPhone}).
            </Text>
          </View>

          {/* Status Options */}
          <View style={styles.options}>
            {/* Option 1: Picked Up */}
            <TouchableOpacity
              style={[
                styles.statusOption,
                styles.pickedOption,
                isAlreadyPicked && styles.optionDisabled,
              ]}
              onPress={() => !isAlreadyPicked && onSelectStatus(student.id, 'Picked up')}
              disabled={isAlreadyPicked}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBox, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons
                  name={isAlreadyPicked ? 'checkmark-done-circle' : 'bus'}
                  size={22}
                  color="#059669"
                />
              </View>
              <View style={styles.optionTextContainer}>
                <View style={styles.optionHeaderRow}>
                  <Text style={[styles.optionTitle, { color: '#059669' }]}>
                    Mark Picked Up (Onboard)
                  </Text>
                  {isAlreadyPicked ? (
                    <View style={styles.recordedBadge}>
                      <Text style={styles.recordedBadgeText}>
                        {student.pickedUpAt ? `At ${student.pickedUpAt}` : 'Recorded'}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.optionDesc}>
                  {isAlreadyPicked
                    ? `Milestone already recorded for this trip (REQ-D5.3 protected).`
                    : 'Child safely boarded the vehicle at designated stop.'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Option 2: Dropped Off */}
            <TouchableOpacity
              style={[
                styles.statusOption,
                styles.droppedOption,
                isAlreadyDropped && styles.optionDisabled,
              ]}
              onPress={() => !isAlreadyDropped && onSelectStatus(student.id, 'Dropped off')}
              disabled={isAlreadyDropped}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBox, { backgroundColor: '#F5F3FF' }]}>
                <Ionicons
                  name={isAlreadyDropped ? 'checkmark-done-circle' : 'home'}
                  size={22}
                  color="#7C3AED"
                />
              </View>
              <View style={styles.optionTextContainer}>
                <View style={styles.optionHeaderRow}>
                  <Text style={[styles.optionTitle, { color: '#7C3AED' }]}>
                    Mark Dropped Off
                  </Text>
                  {isAlreadyDropped ? (
                    <View style={[styles.recordedBadge, { backgroundColor: '#EDE9FE' }]}>
                      <Text style={[styles.recordedBadgeText, { color: '#7C3AED' }]}>
                        {student.droppedOffAt ? `At ${student.droppedOffAt}` : 'Recorded'}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.optionDesc}>
                  {isAlreadyDropped
                    ? `Drop-off milestone already marked (REQ-D5.3 protected).`
                    : 'Safely arrived at destination/school gate.'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Option 3: Absent */}
            <TouchableOpacity
              style={[
                styles.statusOption,
                styles.absentOption,
                isAbsent && styles.optionDisabled,
              ]}
              onPress={() => !isAbsent && onSelectStatus(student.id, 'Absent')}
              disabled={isAbsent}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBox, { backgroundColor: '#FEF2F2' }]}>
                <Ionicons name="close-circle" size={22} color="#DC2626" />
              </View>
              <View style={styles.optionTextContainer}>
                <View style={styles.optionHeaderRow}>
                  <Text style={[styles.optionTitle, { color: '#DC2626' }]}>
                    Mark Absent / Not Boarding
                  </Text>
                  {isAbsent ? (
                    <View style={[styles.recordedBadge, { backgroundColor: '#FEE2E2' }]}>
                      <Text style={[styles.recordedBadgeText, { color: '#DC2626' }]}>
                        Absent
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.optionDesc}>
                  Student is absent today and will not board.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Footer note: REQ-D5.4 Real-time sync */}
          <View style={styles.footerSync}>
            <Ionicons name="cloud-upload-outline" size={13} color="#64748B" />
            <Text style={styles.footerSyncText}>
              Real-time sync to School Fleet Admin Command Dashboard
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 20,
    ...shadows.floatingDock,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
    marginRight: 8,
  },
  stopBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.sm,
    marginBottom: 4,
  },
  stopBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#007AFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  closeBtn: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  disclosureBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    padding: 10,
    borderRadius: 12,
    gap: 8,
    marginBottom: 14,
  },
  disclosureText: {
    fontSize: 11.5,
    color: '#0369A1',
    flex: 1,
    lineHeight: 16,
    fontWeight: '500',
  },
  boldText: {
    fontWeight: '800',
  },
  options: {
    gap: 10,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  optionDisabled: {
    opacity: 0.65,
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  pickedOption: {
    borderColor: '#A7F3D0',
    backgroundColor: '#F0FDF4',
  },
  droppedOption: {
    borderColor: '#DDD6FE',
    backgroundColor: '#FAF5FF',
  },
  absentOption: {
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 13.5,
    fontWeight: '800',
  },
  recordedBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  recordedBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#065F46',
  },
  optionDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 15,
  },
  footerSync: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  footerSyncText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
});

export default AttendanceModal;
