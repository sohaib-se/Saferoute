import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StudentRosterItemData } from '../dashboard/DriverRosterPreview';

interface AttendanceModalProps {
  visible: boolean;
  student: StudentRosterItemData | null;
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

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Mark Attendance</Text>
              <Text style={styles.subtitle}>{student.name} • Stop #{student.stopNumber}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <Text style={styles.instruction}>
            Select current transit status. An instant notification will be delivered to the parent:
          </Text>

          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.statusOption, styles.pickedOption]}
              onPress={() => onSelectStatus(student.id, 'Picked up')}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBox, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="checkmark-circle" size={22} color="#059669" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={[styles.optionTitle, { color: '#059669' }]}>Picked Up</Text>
                <Text style={styles.optionDesc}>Student safely boarded the van</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.statusOption, styles.droppedOption]}
              onPress={() => onSelectStatus(student.id, 'Dropped off')}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBox, { backgroundColor: '#F5F3FF' }]}>
                <Ionicons name="home" size={22} color="#7C3AED" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={[styles.optionTitle, { color: '#7C3AED' }]}>Dropped Off</Text>
                <Text style={styles.optionDesc}>Safely arrived at destination/school</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.statusOption, styles.absentOption]}
              onPress={() => onSelectStatus(student.id, 'Absent')}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBox, { backgroundColor: '#FEF2F2' }]}>
                <Ionicons name="close-circle" size={22} color="#DC2626" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={[styles.optionTitle, { color: '#DC2626' }]}>Absent / Not Boarding</Text>
                <Text style={styles.optionDesc}>Student will not ride today</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  instruction: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 18,
  },
  options: {
    gap: 10,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
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
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  optionDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
});

export default AttendanceModal;
