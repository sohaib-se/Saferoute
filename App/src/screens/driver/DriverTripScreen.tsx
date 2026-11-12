import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { TripPhaseCard } from '../../components/screencomponents/driver/trip/TripPhaseCard';
import { StudentPickupCard } from '../../components/screencomponents/driver/trip/StudentPickupCard';
import { StudentDropoffCard } from '../../components/screencomponents/driver/trip/StudentDropoffCard';
import { TripProgressBar } from '../../components/screencomponents/driver/trip/TripProgressBar';
import { TripCompleteSummary } from '../../components/screencomponents/driver/trip/TripCompleteSummary';
import { useDriverTrip, StudentRosterItem } from '../../context/DriverTripContext';
import { useCall } from '../../context/CallContext';

interface DriverTripScreenProps {
  onBack?: () => void;
  onOpenNotifications?: () => void;
}

export const DriverTripScreen: React.FC<DriverTripScreenProps> = ({
  onBack,
  onOpenNotifications,
}) => {
  const {
    vehicleName,
    routeTitle,
    currentTrip,
    tripPhase,
    tripAttendance,
    students,
    isLoadingTrip,
    createTrip,
    startPickupTrip,
    pickUpStudent,
    markAbsent,
    completePickupTrip,
    startDropoffTrip,
    dropStudent,
    completeDropoffTrip,
    resetTripDay,
    tripNotifications,
  } = useDriverTrip();
  const { startCall } = useCall();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const unreadCount = tripNotifications.filter((n) => !n.isRead).length;

  // 1. Create Trip Handler
  const handleCreateTrip = async () => {
    setIsSubmitting(true);
    try {
      const ok = await createTrip();
      if (ok) {
        Alert.alert('Trip Created', `Trip record initialized for ${vehicleName}. You can now start the morning pickup.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Start Pickup Handler
  const handleStartPickup = async () => {
    setIsSubmitting(true);
    try {
      const ok = await startPickupTrip();
      if (ok) {
        Alert.alert(
          'Pickup Trip Started',
          `Live GPS broadcasting is active for ${vehicleName}.\n\nYou can now pick up students one by one.`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. One-tap Pick Up Student
  const handlePickUp = async (student: StudentRosterItem) => {
    const res = await pickUpStudent(student.id);
    Alert.alert('Student Picked Up', res.message);
  };

  // 4. Mark Absent
  const handleMarkAbsent = (student: StudentRosterItem) => {
    Alert.alert(
      'Mark Student Absent',
      `Mark ${student.name} as absent for today's morning pickup?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Absent',
          style: 'destructive',
          onPress: async () => {
            const res = await markAbsent(student.id);
            Alert.alert('Status Updated', res.message);
          },
        },
      ]
    );
  };

  // 5. Drop at School (Complete Pickup)
  const handleDropAtSchool = () => {
    const pickedCount = tripAttendance.filter((a) => a.pickup_status === 'picked_up').length;
    const pendingCount = tripAttendance.filter((a) => a.pickup_status === 'pending').length;

    Alert.alert(
      'Arrived at School Gate?',
      `This will complete the morning pickup trip.\n\n• ${pickedCount} students onboard safely dropped at school.\n• ${pendingCount} student(s) still pending will be marked absent.\n\nThe afternoon drop-off trip will then be unlocked.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Drop at School & Complete',
          style: 'default',
          onPress: async () => {
            setIsSubmitting(true);
            try {
              const res = await completePickupTrip();
              Alert.alert('School Arrival Complete', res.message);
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ]
    );
  };

  // 6. Start Drop-off Handler
  const handleStartDropoff = async () => {
    const presentCount = tripAttendance.filter((a) => a.pickup_status === 'picked_up').length;
    if (presentCount === 0) {
      Alert.alert(
        'No Present Students',
        'No students were recorded as picked up this morning to board for the return trip.'
      );
      return;
    }

    Alert.alert(
      'Start Afternoon Return Trip',
      `Board ${presentCount} present students from school and start live navigation to their homes?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Drop-off Route',
          style: 'default',
          onPress: async () => {
            setIsSubmitting(true);
            try {
              const ok = await startDropoffTrip();
              if (ok) {
                Alert.alert(
                  'Afternoon Trip Active',
                  `Live tracking is active. Drop off students at their home stops.`
                );
              }
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ]
    );
  };

  // 7. Drop student at home
  const handleDropStudent = async (student: StudentRosterItem) => {
    const res = await dropStudent(student.id);
    Alert.alert('Dropped at Home', res.message);
  };

  // 8. Complete Dropoff Trip
  const handleCompleteDropoff = async () => {
    // Check if any students remain pending
    const remainingCount = tripAttendance.filter(
      (a) => a.pickup_status === 'picked_up' && a.dropoff_status === 'pending'
    ).length;

    if (remainingCount > 0) {
      Alert.alert(
        'Students Still Onboard',
        `There are still ${remainingCount} student(s) who haven't been dropped off yet.\n\nThe drop-off trip cannot be completed until all students are dropped.\n\n(Tip: Press and hold this button to Force Complete if necessary.)`
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await completeDropoffTrip(false);
      Alert.alert(res.success ? 'Success' : 'Notice', res.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 9. Force Complete Dropoff Trip (on long press)
  const handleForceCompleteDropoff = () => {
    const remainingCount = tripAttendance.filter(
      (a) => a.pickup_status === 'picked_up' && a.dropoff_status === 'pending'
    ).length;

    Alert.alert(
      'Force Complete Trip?',
      `Are you sure you want to force complete this trip?\n\n${remainingCount} remaining student(s) will be marked as skipped.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Force Complete',
          style: 'destructive',
          onPress: async () => {
            setIsSubmitting(true);
            try {
              const res = await completeDropoffTrip(true);
              Alert.alert('Trip Concluded', res.message);
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ]
    );
  };

  const handleCallParent = (student: StudentRosterItem) => {
    startCall({
      calleeId: student.parentUserId || '87ac2bf4-700b-4fec-9ec0-1fd83f3bb448',
      calleeRole: 'parent',
      calleeName: student.parentName,
      studentName: student.name,
      vehicleName,
    });
  };

  // Filter students by search
  const filteredStudents = students.filter((s) => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return true;
    return (
      s.name.toLowerCase().includes(term) ||
      s.stopAddress.toLowerCase().includes(term) ||
      s.parentName.toLowerCase().includes(term)
    );
  });

  // In dropoff phase: only show students who were picked up
  const dropoffStudents = filteredStudents.filter((s) => {
    const att = tripAttendance.find((a) => a.student_id === s.id);
    return att ? att.pickup_status === 'picked_up' : s.status === 'Picked up';
  });

  // Counts
  const pickedCount = tripAttendance.filter((a) => a.pickup_status === 'picked_up').length;
  const droppedCount = tripAttendance.filter((a) => a.dropoff_status === 'dropped').length;
  const absentCount = tripAttendance.filter((a) => a.pickup_status === 'absent').length;
  const totalAssigned = students.length;
  const allDropoffCompleted =
    pickedCount > 0 &&
    tripAttendance.filter(
      (a) => a.pickup_status === 'picked_up' && a.dropoff_status === 'pending'
    ).length === 0;

  return (
    <View style={styles.container}>
      <Header
        title="Trip Management"
        subtitle={`${vehicleName} • ${routeTitle}`}
        onBack={onBack}
        onNotificationPress={onOpenNotifications}
        notificationBadgeCount={unreadCount}
      />

      {isLoadingTrip ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading trip data from database...</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ========================================================= */}
          {/* PHASE 1: NO TRIP CREATED YET                              */}
          {/* ========================================================= */}
          {tripPhase === 'no_trip' && (
            <View style={styles.noTripCard}>
              <View style={styles.noTripIconCircle}>
                <Ionicons name="bus-outline" size={32} color="#007AFF" />
              </View>
              <Text style={styles.noTripTitle}>No Trip Created Today</Text>
              <Text style={styles.noTripSub}>
                Vehicle: <Text style={styles.bold}>{vehicleName}</Text> • Route: <Text style={styles.bold}>{routeTitle}</Text>
              </Text>
              <Text style={styles.noTripDesc}>
                Create today's trip to initialize live tracking and synchronize student attendance with the school administration database.
              </Text>

              <View style={styles.previewStats}>
                <Ionicons name="people" size={16} color="#007AFF" />
                <Text style={styles.previewStatsText}>
                  {totalAssigned} assigned students on this vehicle route
                </Text>
              </View>

              <TouchableOpacity
                style={styles.createTripBtn}
                onPress={handleCreateTrip}
                disabled={isSubmitting}
                activeOpacity={0.8}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Ionicons name="add-circle" size={20} color="#FFFFFF" />
                    <Text style={styles.createTripBtnText}>Create Today's Trip</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* ========================================================= */}
          {/* PHASE 2: TRIP PENDING (NOT STARTED)                       */}
          {/* ========================================================= */}
          {tripPhase === 'pending' && (
            <View>
              <TripPhaseCard
                type="pickup"
                status="pending"
                countText={`${totalAssigned} Students Scheduled`}
                actionLabel="Start Morning Pickup Trip"
                actionIcon="play"
                onPressAction={handleStartPickup}
                disabled={isSubmitting}
              />

              <TripPhaseCard
                type="dropoff"
                status="locked"
                countText="Locked until Morning Pickup is completed"
              />

              {/* Stops Preview */}
              <View style={styles.stopsPreviewCard}>
                <Text style={styles.stopsPreviewHeader}>
                  SCHEDULED PICKUP STOPS ({totalAssigned})
                </Text>
                {students.map((st) => (
                  <View key={st.id} style={styles.stopPreviewItem}>
                    <View style={styles.stopNumCircle}>
                      <Text style={styles.stopNumText}>#{st.stopNumber}</Text>
                    </View>
                    <View style={styles.stopDetails}>
                      <Text style={styles.stopName}>{st.name}</Text>
                      <Text style={styles.stopAddr} numberOfLines={1}>
                        {st.stopAddress}
                      </Text>
                    </View>
                    <Text style={styles.stopGrade}>{st.grade}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ========================================================= */}
          {/* PHASE 3: PICKUP TRIP IN PROGRESS                          */}
          {/* ========================================================= */}
          {tripPhase === 'pickup_active' && (
            <View>
              <TripProgressBar
                label="Pickup Progress (Morning)"
                completed={pickedCount}
                total={totalAssigned}
                secondaryLabel={`Waiting: ${totalAssigned - pickedCount - absentCount} • Absent: ${absentCount}`}
                barColor="#059669"
              />

              {/* Search bar */}
              <View style={styles.searchBox}>
                <Ionicons name="search" size={16} color="#94A3B8" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search student or address..."
                  placeholderTextColor="#94A3B8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery ? (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Ionicons name="close-circle" size={16} color="#94A3B8" />
                  </TouchableOpacity>
                ) : null}
              </View>

              {/* Student Cards */}
              {filteredStudents.map((st) => (
                <StudentPickupCard
                  key={st.id}
                  student={st}
                  onPickUp={handlePickUp}
                  onMarkAbsent={handleMarkAbsent}
                  onCallParent={handleCallParent}
                />
              ))}

              {/* Sticky-like Arrival at School Button */}
              <View style={styles.bottomActionCard}>
                <View style={styles.bottomActionInfo}>
                  <Text style={styles.bottomActionTitle}>Arrived at School Gate?</Text>
                  <Text style={styles.bottomActionSub}>
                    {pickedCount} students onboard. Leftover students will be marked absent.
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.dropAtSchoolBtn}
                  onPress={handleDropAtSchool}
                  disabled={isSubmitting}
                  activeOpacity={0.8}
                >
                  <Ionicons name="school" size={18} color="#FFFFFF" />
                  <Text style={styles.dropAtSchoolBtnText}>Drop at School ✓</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ========================================================= */}
          {/* PHASE 4: PICKUP COMPLETE (AT SCHOOL - DROPOFF UNLOCKED)   */}
          {/* ========================================================= */}
          {tripPhase === 'pickup_done' && (
            <View>
              <TripPhaseCard
                type="pickup"
                status="completed"
                countText={`${pickedCount} of ${totalAssigned} students arrived safely at school`}
                completedTime={
                  currentTrip?.pickup_completed_at
                    ? new Date(currentTrip.pickup_completed_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Morning'
                }
              />

              <TripPhaseCard
                type="dropoff"
                status="pending"
                countText={`${pickedCount} Present Students to Drop Home`}
                actionLabel="Start Afternoon Drop-off Trip"
                actionIcon="play"
                onPressAction={handleStartDropoff}
                disabled={isSubmitting}
              />

              <View style={styles.noticeBox}>
                <Ionicons name="information-circle-outline" size={20} color="#007AFF" />
                <Text style={styles.noticeText}>
                  Only students who boarded this morning ({pickedCount} students) will be on the drop-off list. Tap "Start Afternoon Drop-off Trip" when classes end and boarding begins.
                </Text>
              </View>
            </View>
          )}

          {/* ========================================================= */}
          {/* PHASE 5: DROPOFF IN PROGRESS                              */}
          {/* ========================================================= */}
          {tripPhase === 'dropoff_active' && (
            <View>
              <TripProgressBar
                label="Drop-off Progress (Afternoon)"
                completed={droppedCount}
                total={pickedCount}
                secondaryLabel={`Remaining onboard: ${pickedCount - droppedCount}`}
                barColor="#0284C7"
              />

              {/* Search bar */}
              <View style={styles.searchBox}>
                <Ionicons name="search" size={16} color="#94A3B8" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search present students..."
                  placeholderTextColor="#94A3B8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              {/* Only Present Students */}
              {dropoffStudents.map((st) => (
                <StudentDropoffCard
                  key={st.id}
                  student={st}
                  onDropStudent={handleDropStudent}
                  onCallParent={handleCallParent}
                />
              ))}

              {/* Bottom Complete Trip Action */}
              <View style={styles.bottomActionCard}>
                <View style={styles.bottomActionInfo}>
                  <Text style={styles.bottomActionTitle}>
                    {allDropoffCompleted
                      ? 'All Students Dropped Off!'
                      : `${pickedCount - droppedCount} Student(s) Still Onboard`}
                  </Text>
                  <Text style={styles.bottomActionSub}>
                    {allDropoffCompleted
                      ? 'You can now complete the daily trip.'
                      : 'Trip can only be completed when all students are dropped. (Hold for Force Complete)'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.completeTripBtn,
                    !allDropoffCompleted && styles.completeTripBtnDisabled,
                  ]}
                  onPress={handleCompleteDropoff}
                  onLongPress={handleForceCompleteDropoff}
                  delayLongPress={600}
                  activeOpacity={0.8}
                >
                  <Ionicons name="checkmark-done" size={18} color="#FFFFFF" />
                  <Text style={styles.completeTripBtnText}>
                    {allDropoffCompleted ? 'Complete Trip ✓' : 'Complete Trip (Locked)'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ========================================================= */}
          {/* PHASE 6: TRIP COMPLETED                                   */}
          {/* ========================================================= */}
          {tripPhase === 'completed' && (
            <TripCompleteSummary
              totalStudents={totalAssigned}
              pickedCount={pickedCount}
              droppedCount={droppedCount}
              absentCount={absentCount}
              vehicleName={vehicleName}
              routeTitle={routeTitle}
              onReset={() => {
                Alert.alert(
                  'Reset Trip View',
                  'Reset the current view for another shift run?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Reset', onPress: resetTripDay },
                  ]
                );
              }}
            />
          )}
        </ScrollView>
      )}
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
    paddingBottom: 120,
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  noTripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginTop: 10,
  },
  noTripIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: 12,
  },
  noTripTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  noTripSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  bold: {
    fontWeight: '700',
    color: '#0F172A',
  },
  noTripDesc: {
    fontSize: 12.5,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 18,
    marginVertical: 14,
  },
  previewStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    marginBottom: 16,
  },
  previewStatsText: {
    fontSize: 11.5,
    color: '#0284C7',
    fontWeight: '600',
  },
  createTripBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 14,
    gap: 8,
    width: '100%',
  },
  createTripBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stopsPreviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginTop: 4,
  },
  stopsPreviewHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  stopPreviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    gap: 10,
  },
  stopNumCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  stopNumText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#007AFF',
  },
  stopDetails: {
    flex: 1,
  },
  stopName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  stopAddr: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  stopGrade: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12.5,
    color: '#0F172A',
    padding: 0,
  },
  bottomActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  bottomActionInfo: {
    marginBottom: 12,
  },
  bottomActionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  bottomActionSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  dropAtSchoolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  dropAtSchoolBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  completeTripBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  completeTripBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  completeTripBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    gap: 10,
    marginTop: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    color: '#1E40AF',
    lineHeight: 17,
  },
});

export default DriverTripScreen;

