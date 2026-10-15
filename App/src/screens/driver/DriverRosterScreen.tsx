import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { RosterSearchBar } from '../../components/screencomponents/driver/roster/RosterSearchBar';
import {
  RosterStudentCard,
  StudentRosterItemData,
} from '../../components/screencomponents/driver/roster/RosterStudentCard';
import { AttendanceModal } from '../../components/screencomponents/driver/roster/AttendanceModal';

interface DriverRosterScreenProps {
  onBack?: () => void;
}

export const DriverRosterScreen: React.FC<DriverRosterScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentRosterItemData | null>(null);

  const [students, setStudents] = useState<StudentRosterItemData[]>([
    {
      id: 'st-1',
      stopNumber: 1,
      name: 'Sohaib Khan',
      grade: 'Grade 5 - Sec A',
      stopAddress: 'Khatme Nabuwat Chowk, Ghari Rashida',
      status: 'Waiting',
      parentPhone: '03001234567',
      parentName: 'Muhammad Khan',
    },
    {
      id: 'st-2',
      stopNumber: 2,
      name: 'Hamza Ali',
      grade: 'Grade 7 - Sec B',
      stopAddress: 'Main Ring Road, Gate 2',
      status: 'Picked up',
      parentPhone: '0312412412',
      parentName: 'Ali Raza',
    },
    {
      id: 'st-3',
      stopNumber: 3,
      name: 'Ayesha Malik',
      grade: 'Grade 4 - Sec C',
      stopAddress: 'Street 4, Sector G-10',
      status: 'Waiting',
      parentPhone: '03339876543',
      parentName: 'Zeeshan Malik',
    },
    {
      id: 'st-4',
      stopNumber: 4,
      name: 'Zainab Fatima',
      grade: 'Grade 6 - Sec A',
      stopAddress: 'Gulberg Greens, Block B',
      status: 'Waiting',
      parentPhone: '03215554433',
      parentName: 'Tariq Mehmood',
    },
    {
      id: 'st-5',
      stopNumber: 5,
      name: 'Bilal Ahmed',
      grade: 'Grade 8 - Sec C',
      stopAddress: 'I-8 Markaz, Near Clock Tower',
      status: 'Waiting',
      parentPhone: '03007778899',
      parentName: 'Ahmed Raza',
    },
  ]);

  const handleStatusSelected = (studentId: string, newStatus: 'Picked up' | 'Dropped off' | 'Absent') => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status: newStatus } : s))
    );
    setSelectedStudentForModal(null);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.stopAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.parentName && s.parentName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <Header
        title="Student Roster"
        subtitle={`Total: ${students.length} Students`}
        onBack={onBack}
      />

      <View style={styles.content}>
        <RosterSearchBar
          query={searchQuery}
          onChangeQuery={setSearchQuery}
        />

        <ScrollView
          contentContainerStyle={styles.scrollList}
          showsVerticalScrollIndicator={false}
        >
          {filteredStudents.map((student) => (
            <RosterStudentCard
              key={student.id}
              student={student}
              onMarkAttendance={(st) => setSelectedStudentForModal(st)}
            />
          ))}
        </ScrollView>
      </View>

      {selectedStudentForModal && (
        <AttendanceModal
          visible={!!selectedStudentForModal}
          student={selectedStudentForModal}
          onSelectStatus={(studentId, status) =>
            handleStatusSelected(studentId, status)
          }
          onClose={() => setSelectedStudentForModal(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scrollList: {
    paddingBottom: 24,
  },
});
