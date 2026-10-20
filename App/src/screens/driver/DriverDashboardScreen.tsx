import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '../../components/common/Header';
import { TripStatusCard } from '../../components/screencomponents/driver/dashboard/TripStatusCard';
import { AdminRosterNoticeCard } from '../../components/screencomponents/driver/dashboard/AdminRosterNoticeCard';
import { DriverMetrics } from '../../components/screencomponents/driver/dashboard/DriverMetrics';
import { DriverTransitRadarCard } from '../../components/screencomponents/driver/dashboard/DriverTransitRadarCard';
import { DriverRosterPreview } from '../../components/screencomponents/driver/dashboard/DriverRosterPreview';
import { AttendanceModal } from '../../components/screencomponents/driver/roster/AttendanceModal';
import { InAppCallModal } from '../../components/screencomponents/driver/call/InAppCallModal';
import { useAuth } from '../../context/AuthContext';
import { useDriverTrip, StudentRosterItem } from '../../context/DriverTripContext';
import { colors } from '../../lib/theme';

interface DriverDashboardScreenProps {
  onNavigateTab: (tabId: string) => void;
  onOpenSOS?: () => void;
}

export const DriverDashboardScreen: React.FC<DriverDashboardScreenProps> = ({
  onNavigateTab,
  onOpenSOS,
}) => {
  const { user } = useAuth();
  const {
    vehicleName,
    isTripActive,
    gpsState,
    students,
    markAttendance,
    startInAppCall,
    adminNoticeCount,
    tripNotifications,
    toggleConnectivitySimulation,
  } = useDriverTrip();

  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentRosterItem | null>(null);

  const handleStatusChange = (studentId: string, newStatus: 'Picked up' | 'Dropped off' | 'Absent') => {
    const res = markAttendance(studentId, newStatus);
    setSelectedStudentForModal(null);
    if (res.success) {
      Alert.alert(
        'Attendance Updated',
        `${res.message}\n(Notification delivered only to ${res.parentName})`
      );
    } else {
      Alert.alert('Notice', res.message);
    }
  };

  const handleCallParent = (student: StudentRosterItem) => {
    startInAppCall(student.parentName, student.name, student.parentPhone);
  };

  const pickedCount = students.filter(
    (s) => s.milestone === 'picked_home' || s.milestone === 'picked_school'
  ).length;
  const droppedCount = students.filter(
    (s) => s.milestone === 'dropped_school' || s.milestone === 'dropped_home'
  ).length;
  const waitingCount = students.filter((s) => s.milestone === 'waiting_home').length;
  const absentCount = students.filter((s) => s.milestone === 'absent').length;
  const unreadCount = tripNotifications.filter((n) => !n.isRead).length;

  return (
    <View style={styles.container}>
      {/* Floating Header matching Parent Portal */}
      <Header
        title="Driver Portal"
        subtitle={`Welcome, ${user?.name || 'Driver'}`}
        onNotificationPress={() => onNavigateTab('notifications')}
        notificationBadgeCount={unreadCount}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* REQ-D3 & REQ-D6: Start / End Active Trip Card */}
        <TripStatusCard onNavigateRoster={() => onNavigateTab('roster')} />

        {/* REQ-D2.3: Admin Roster Notice Banner (Reflects admin absence changes before departure) */}
        {adminNoticeCount > 0 && (
          <AdminRosterNoticeCard
            absentCount={adminNoticeCount}
            onPressDetails={() => onNavigateTab('roster')}
          />
        )}

        {/* Live Trip Metrics Counter Pills */}
        <DriverMetrics
          total={students.length}
          picked={pickedCount}
          dropped={droppedCount}
          waiting={waitingCount}
          absent={absentCount}
        />

        {/* REQ-D4: Live Transit Radar Map Card (Matching Parent Portal RadarMapCard) */}
        <DriverTransitRadarCard
          vehicleName={vehicleName}
          isTripActive={isTripActive}
          gpsState={gpsState}
          onPressViewRoute={() => onNavigateTab('roster')}
          onToggleConnectivity={toggleConnectivitySimulation}
        />

        {/* REQ-D2 & REQ-D5: Quick Student Roster Preview */}
        <DriverRosterPreview
          students={students}
          onViewFullRoster={() => onNavigateTab('roster')}
          onMarkAttendance={(student) => setSelectedStudentForModal(student)}
          onCallParent={handleCallParent}
        />
      </ScrollView>

      {/* Attendance Modal with Milestone Protection (REQ-D5) */}
      {selectedStudentForModal && (
        <AttendanceModal
          visible={!!selectedStudentForModal}
          student={selectedStudentForModal}
          onSelectStatus={handleStatusChange}
          onClose={() => setSelectedStudentForModal(null)}
        />
      )}

      {/* In-App Calling Function Modal (REQ-D7.2) */}
      <InAppCallModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9FD', // Identical clean background to Parent Portal
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110, // Full clearance for floating bottom dock
  },
});

export default DriverDashboardScreen;
