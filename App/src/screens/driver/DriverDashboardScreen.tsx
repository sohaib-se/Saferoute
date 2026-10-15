import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { DriverSOSBanner } from '../../components/screencomponents/driver/dashboard/DriverSOSBanner';
import { TripStatusCard } from '../../components/screencomponents/driver/dashboard/TripStatusCard';
import { DriverMetrics } from '../../components/screencomponents/driver/dashboard/DriverMetrics';
import { DriverQuickMapCard } from '../../components/screencomponents/driver/dashboard/DriverQuickMapCard';
import {
  DriverRosterPreview,
  StudentRosterItemData,
} from '../../components/screencomponents/driver/dashboard/DriverRosterPreview';
import { AttendanceModal } from '../../components/screencomponents/driver/roster/AttendanceModal';
import { useAuth } from '../../context/AuthContext';

interface DriverDashboardScreenProps {
  onNavigateTab: (tabId: string) => void;
  onOpenSOS: () => void;
}

export const DriverDashboardScreen: React.FC<DriverDashboardScreenProps> = ({
  onNavigateTab,
  onOpenSOS,
}) => {
  const { user } = useAuth();

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
  ]);

  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentRosterItemData | null>(null);

  const handleStatusChange = (studentId: string, newStatus: 'Picked up' | 'Dropped off' | 'Absent') => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status: newStatus } : s))
    );
    setSelectedStudentForModal(null);
  };

  const pickedCount = students.filter((s) => s.status === 'Picked up').length;
  const droppedCount = students.filter((s) => s.status === 'Dropped off').length;
  const waitingCount = students.filter((s) => s.status === 'Waiting').length;

  return (
    <View style={styles.container}>
      <Header
        title="Driver Portal"
        subtitle={`Welcome, ${user?.name || 'Driver'}`}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Prominent Emergency SOS button */}
        <DriverSOSBanner onPress={onOpenSOS} />

        {/* Start / Complete Trip Card */}
        <TripStatusCard
          vehicleName="Bus 1 (ICT-4921)"
          routeTitle="Morning Shift (Route #3)"
          totalStudents={students.length}
        />

        {/* Live Trip Metrics Counter */}
        <DriverMetrics
          total={students.length}
          picked={pickedCount}
          dropped={droppedCount}
          waiting={waitingCount}
        />

        {/* Live Navigation Quick Card */}
        <DriverQuickMapCard
          onPress={() => onNavigateTab('livemap')}
        />

        {/* Quick Student Roster Preview */}
        <DriverRosterPreview
          students={students}
          onViewFullRoster={() => onNavigateTab('roster')}
          onMarkAttendance={(student) => setSelectedStudentForModal(student)}
        />
      </ScrollView>

      {/* Attendance Modal */}
      {selectedStudentForModal && (
        <AttendanceModal
          visible={!!selectedStudentForModal}
          student={selectedStudentForModal}
          onSelectStatus={(studentId, status) => handleStatusChange(studentId, status)}
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
  scrollContent: {
    padding: 16,
    paddingBottom: 28,
  },
});
