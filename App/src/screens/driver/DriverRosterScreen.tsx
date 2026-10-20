import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { RosterTopActionBar } from '../../components/screencomponents/driver/roster/RosterTopActionBar';
import { RosterSearchBar, RosterFilterType } from '../../components/screencomponents/driver/roster/RosterSearchBar';
import { RosterStudentCard } from '../../components/screencomponents/driver/roster/RosterStudentCard';
import { AttendanceModal } from '../../components/screencomponents/driver/roster/AttendanceModal';
import { AdminRosterNoticeCard } from '../../components/screencomponents/driver/dashboard/AdminRosterNoticeCard';
import { InAppCallModal } from '../../components/screencomponents/driver/call/InAppCallModal';
import { useDriverTrip, StudentRosterItem } from '../../context/DriverTripContext';

interface DriverRosterScreenProps {
  onBack?: () => void;
  onOpenNotifications?: () => void;
}

export const DriverRosterScreen: React.FC<DriverRosterScreenProps> = ({
  onBack,
  onOpenNotifications,
}) => {
  const {
    students,
    rosterPhase,
    startRoster,
    pickUpStudent,
    dropStudentAtSchool,
    dropAllAtSchool,
    pickAllFromSchool,
    dropStudentAtHome,
    resetRosterDay,
    markAttendance,
    startInAppCall,
    vehicleName,
    adminNoticeCount,
    tripNotifications,
  } = useDriverTrip();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<RosterFilterType>('all');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentRosterItem | null>(null);

  const unreadCount = tripNotifications.filter((n) => !n.isRead).length;

  // 1. Start Roster and Trip
  const handleStartRoster = () => {
    startRoster();
    Alert.alert(
      'Morning Shift Started',
      `Live GPS broadcasting has started for ${vehicleName}. All assigned parents have been notified.\n\nYou can now begin picking up students from home.`
    );
  };

  // 2. One-tap Pick Up from Home
  const handlePickUp = (student: StudentRosterItem) => {
    const res = pickUpStudent(student.id);
    Alert.alert('Picked Up', `${student.name} marked as Onboard.\nParent ${student.parentName} notified.`);
  };

  // 3. One-tap Drop at School
  const handleDropSchool = (student: StudentRosterItem) => {
    const res = dropStudentAtSchool(student.id);
    Alert.alert('Dropped at School', `${student.name} marked as safely arrived at School.\nParent notified.`);
  };

  // 4. Drop All at School
  const handleDropAllSchool = () => {
    const onboardList = students.filter((s) => s.milestone === 'picked_home');
    if (onboardList.length === 0) {
      Alert.alert('No Students Onboard', 'No students are currently onboard to drop at school.');
      return;
    }

    Alert.alert(
      'Drop All at School',
      `Are you at the school gate? This will mark all ${onboardList.length} onboard students as safely dropped off at school and notify their parents.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Drop All',
          style: 'default',
          onPress: () => {
            const res = dropAllAtSchool();
            Alert.alert('School Arrival Complete', res.message);
          },
        },
      ]
    );
  };

  // 5. Pick All from School for Afternoon Return Trip
  const handlePickAllSchool = () => {
    const atSchoolList = students.filter((s) => s.milestone === 'dropped_school');
    if (atSchoolList.length === 0) {
      Alert.alert(
        'No Students at School',
        'No students are currently recorded as arrived at school to board for the afternoon return.'
      );
      return;
    }

    Alert.alert(
      'Start Afternoon Return Trip',
      `Board all ${atSchoolList.length} students who arrived at school this morning onto ${vehicleName} and begin the afternoon drop-off route?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start & Board All',
          style: 'default',
          onPress: () => {
            const res = pickAllFromSchool();
            Alert.alert('Afternoon Return Started', res.message);
          },
        },
      ]
    );
  };

  // 6. One-tap Drop at Home
  const handleDropHome = (student: StudentRosterItem) => {
    const res = dropStudentAtHome(student.id);
    Alert.alert('Dropped Home', `${student.name} safely dropped at home stop.\nParent ${student.parentName} notified.`);
  };

  // 7. Reset Day
  const handleResetDay = () => {
    Alert.alert(
      'Reset Daily Roster',
      'Are you sure you want to reset the roster for the next shift run?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset Roster',
          style: 'destructive',
          onPress: () => {
            resetRosterDay();
            Alert.alert('Roster Reset', 'Ready for morning run.');
          },
        },
      ]
    );
  };

  const handleCallParent = (student: StudentRosterItem) => {
    startInAppCall(student.parentName, student.name, student.parentPhone);
  };

  const handleModalStatusSelected = (studentId: string, newStatus: 'Picked up' | 'Dropped off' | 'Absent') => {
    const res = markAttendance(studentId, newStatus);
    setSelectedStudentForModal(null);
    Alert.alert('Status Updated', res.message);
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.stopAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'waiting') return s.milestone === 'waiting_home';
    if (activeFilter === 'picked') return s.milestone === 'picked_home' || s.milestone === 'picked_school';
    if (activeFilter === 'dropped') return s.milestone === 'dropped_school' || s.milestone === 'dropped_home';
    if (activeFilter === 'absent') return s.milestone === 'absent';
    return true;
  });

  const pickedCount = students.filter((s) => s.milestone === 'picked_home').length;
  const totalAttending = students.filter((s) => s.milestone !== 'absent').length;
  const remainingHomeDrops = students.filter((s) => s.milestone === 'picked_school').length;
  const studentsAtSchoolCount = students.filter((s) => s.milestone === 'dropped_school').length;

  const counts = {
    all: students.length,
    waiting: students.filter((s) => s.milestone === 'waiting_home').length,
    picked: students.filter((s) => s.milestone === 'picked_home' || s.milestone === 'picked_school').length,
    dropped: students.filter((s) => s.milestone === 'dropped_school' || s.milestone === 'dropped_home').length,
    absent: students.filter((s) => s.milestone === 'absent').length,
  };

  return (
    <View style={styles.container}>
      <Header
        title="Student Roster"
        subtitle={`${vehicleName} • ${students.length} Total Stops`}
        onBack={onBack}
        onNotificationPress={onOpenNotifications}
        notificationBadgeCount={unreadCount}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Workflow Action Bar: Start Roster, Drop All on Top, Pick All on Top */}
        <RosterTopActionBar
          phase={rosterPhase}
          onStartRoster={handleStartRoster}
          onDropAllSchool={handleDropAllSchool}
          onPickAllSchool={handlePickAllSchool}
          onResetDay={handleResetDay}
          pickedCount={pickedCount}
          totalAttending={totalAttending}
          remainingHomeDrops={remainingHomeDrops}
          studentsAtSchoolCount={studentsAtSchoolCount}
        />

        {/* REQ-D2.3: Admin Roster Notice if any */}
        {adminNoticeCount > 0 && (
          <AdminRosterNoticeCard absentCount={adminNoticeCount} />
        )}

        {/* Idle pre-trip view: Explains flow and shows scheduled stops preview */}
        {rosterPhase === 'idle' ? (
          <View style={styles.idleNoticeCard}>
            <View style={styles.idleNoticeHeader}>
              <View style={styles.idleNoticeIcon}>
                <Ionicons name="map-outline" size={22} color="#007AFF" />
              </View>
              <View style={styles.idleNoticeTextCol}>
                <Text style={styles.idleNoticeTitle}>Morning Route Ready</Text>
                <Text style={styles.idleNoticeSub}>
                  {students.length} stops scheduled • Sector G-10 Route
                </Text>
              </View>
            </View>
            <Text style={styles.idleNoticeDesc}>
              Tap <Text style={{ fontWeight: '700', color: '#007AFF' }}>"Start Roster & Trip"</Text> above to initiate live telemetry broadcasting to parents and reveal the interactive student pickup roster.
            </Text>

            {/* Scheduled stops preview list in idle state */}
            <View style={styles.idleStopsContainer}>
              <Text style={styles.idleStopsHeader}>SCHEDULED STOPS PREVIEW</Text>
              {students.map((st) => (
                <View key={st.id} style={styles.idleStopItem}>
                  <View style={styles.idleStopNumCircle}>
                    <Text style={styles.idleStopNumText}>#{st.stopNumber}</Text>
                  </View>
                  <View style={styles.idleStopDetails}>
                    <Text style={styles.idleStopName}>{st.name}</Text>
                    <Text style={styles.idleStopAddr} numberOfLines={1}>
                      {st.stopAddress}
                    </Text>
                  </View>
                  <View style={[styles.idleStatusBadge, st.milestone === 'absent' && styles.idleAbsentBadge]}>
                    <Text style={[styles.idleStatusText, st.milestone === 'absent' && styles.idleAbsentText]}>
                      {st.milestone === 'absent' ? 'Absent' : 'Pending Start'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <>
            {/* Search bar + Status Filter Tabs */}
            <RosterSearchBar
              query={searchQuery}
              onChangeQuery={setSearchQuery}
              activeFilter={activeFilter}
              onSelectFilter={setActiveFilter}
              counts={counts}
            />

            {/* Student Cards List */}
            {filteredStudents.map((student) => (
              <RosterStudentCard
                key={student.id}
                student={student}
                phase={rosterPhase}
                onPickUp={handlePickUp}
                onDropSchool={handleDropSchool}
                onDropHome={handleDropHome}
              />
            ))}
          </>
        )}
      </ScrollView>

      {/* Attendance Modal (for details / marking absent) */}
      {selectedStudentForModal && (
        <AttendanceModal
          visible={!!selectedStudentForModal}
          student={selectedStudentForModal}
          onSelectStatus={handleModalStatusSelected}
          onClose={() => setSelectedStudentForModal(null)}
        />
      )}

      {/* In-App Calling Function Modal */}
      <InAppCallModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9FD',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110,
  },
  idleNoticeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginTop: 4,
  },
  idleNoticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  idleNoticeIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  idleNoticeTextCol: {
    flex: 1,
  },
  idleNoticeTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  idleNoticeSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  idleNoticeDesc: {
    fontSize: 12.5,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 16,
  },
  idleStopsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 14,
  },
  idleStopsHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  idleStopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    gap: 10,
  },
  idleStopNumCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  idleStopNumText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#007AFF',
  },
  idleStopDetails: {
    flex: 1,
  },
  idleStopName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  idleStopAddr: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  idleStatusBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  idleStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  idleAbsentBadge: {
    backgroundColor: '#FEF2F2',
  },
  idleAbsentText: {
    color: '#DC2626',
  },
});

export default DriverRosterScreen;
