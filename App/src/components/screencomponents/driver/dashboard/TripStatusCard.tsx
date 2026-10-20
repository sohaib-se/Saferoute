import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';
import { useDriverTrip, TripArchiveRecord } from '../../../../context/DriverTripContext';

interface TripStatusCardProps {
  onNavigateRoster?: () => void;
}

export const TripStatusCard: React.FC<TripStatusCardProps> = ({ onNavigateRoster }) => {
  const {
    vehicleName,
    vehiclePlate,
    routeTitle,
    isTripActive,
    tripStartTime,
    tripElapsedTime,
    tripId,
    startTrip,
    endTrip,
    students,
    lastCompletedTrip,
    clearLastCompletedTrip,
    gpsState,
    rosterPhase,
  } = useDriverTrip();

  // Modals
  const [showPreStartModal, setShowPreStartModal] = useState(false);
  const [showUnmarkedWarningModal, setShowUnmarkedWarningModal] = useState(false);
  const [unmarkedStudentsCount, setUnmarkedStudentsCount] = useState(0);

  // REQ-D3.1: Explicit confirmation before starting
  const handlePressStart = () => {
    setShowPreStartModal(true);
  };

  const handleConfirmStart = () => {
    setShowPreStartModal(false);
    const ok = startTrip();
    if (ok) {
      Alert.alert(
        'Trip Started',
        `Live GPS broadcasting has started for ${vehicleName}. All assigned parents have been notified.`
      );
    }
  };

  // REQ-D6: End trip handling & warning
  const handlePressEnd = () => {
    const res = endTrip(false);
    if (!res.success) {
      // REQ-D6.2: Warn driver if students remain unmarked
      setUnmarkedStudentsCount(res.unmarkedCount);
      setShowUnmarkedWarningModal(true);
    }
  };

  const handleForceEndTrip = () => {
    setShowUnmarkedWarningModal(false);
    endTrip(true);
  };

  const getPhaseBadge = () => {
    if (rosterPhase === 'morning_pickup') {
      return {
        bg: '#ECFDF5',
        dot: '#10B981',
        text: '#059669',
        label: 'MORNING RUN LIVE',
      };
    }
    if (rosterPhase === 'at_school') {
      return {
        bg: '#FAF5FF',
        dot: '#7C3AED',
        text: '#7C3AED',
        label: 'AT SCHOOL (TRACKING CLOSED)',
      };
    }
    if (rosterPhase === 'afternoon_return') {
      return {
        bg: '#EFF6FF',
        dot: '#0284C7',
        text: '#0284C7',
        label: 'AFTERNOON RETURN LIVE',
      };
    }
    if (rosterPhase === 'completed') {
      return {
        bg: '#ECFDF5',
        dot: '#059669',
        text: '#059669',
        label: 'ALL RUNS COMPLETED',
      };
    }
    return {
      bg: isTripActive ? '#ECFDF5' : '#FFFBEB',
      dot: isTripActive ? '#10B981' : '#F59E0B',
      text: isTripActive ? '#059669' : '#D97706',
      label: isTripActive ? 'IN PROGRESS' : 'NOT STARTED',
    };
  };

  const phaseBadge = getPhaseBadge();

  const getProgressLabel = () => {
    if (rosterPhase === 'morning_pickup') {
      const picked = students.filter((s) => s.milestone === 'picked_home').length;
      const total = students.filter((s) => s.milestone !== 'absent').length;
      return `${picked}/${total} Onboard`;
    }
    if (rosterPhase === 'at_school') {
      const atSchool = students.filter((s) => s.milestone === 'dropped_school').length;
      return `${atSchool} at Campus`;
    }
    if (rosterPhase === 'afternoon_return') {
      const rem = students.filter((s) => s.milestone === 'picked_school').length;
      return `${rem} Drops Left`;
    }
    if (rosterPhase === 'completed') {
      return 'All Done';
    }
    return `${students.filter((s) => s.milestone !== 'waiting_home' && s.milestone !== 'absent').length}/${students.length} Done`;
  };

  return (
    <View style={styles.card}>
      {/* Header Info */}
      <View style={styles.headerRow}>
        <View style={styles.vehicleInfo}>
          <View style={styles.vehicleTitleRow}>
            <Text style={styles.vehicleTitle}>{vehicleName}</Text>
            <View style={styles.plateBadge}>
              <Text style={styles.plateText}>{vehiclePlate}</Text>
            </View>
          </View>
          <Text style={styles.routeSubtitle}>{routeTitle}</Text>
        </View>

        {/* Live Trip Status Pill */}
        <View
          style={[
            styles.badge,
            { backgroundColor: phaseBadge.bg },
          ]}
        >
          <View
            style={[
              styles.dot,
              { backgroundColor: phaseBadge.dot },
            ]}
          />
          <Text
            style={[
              styles.badgeText,
              { color: phaseBadge.text },
            ]}
          >
            {phaseBadge.label}
          </Text>
        </View>
      </View>

      {/* Realtime Trip Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>DURATION</Text>
          <Text style={[styles.statValue, isTripActive && { color: colors.primary }]}>
            {isTripActive ? tripElapsedTime : '00:00'}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>GPS PINGS</Text>
          <Text
            style={[
              styles.statValue,
              { color: isTripActive ? (gpsState.isOnline ? '#059669' : '#D97706') : '#64748B' },
            ]}
          >
            {isTripActive
              ? gpsState.isOnline
                ? '5s Broadcast'
                : 'Buffering'
              : rosterPhase === 'at_school'
              ? 'Closed at School'
              : rosterPhase === 'completed'
              ? 'Closed (Done)'
              : 'Idle (Safe)'}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>ROSTER SHIFT</Text>
          <Text style={styles.statValue}>
            {getProgressLabel()}
          </Text>
        </View>
      </View>

      {/* Main Action Button (Transitions across Roster Workflow) */}
      {rosterPhase === 'idle' && (
        <TouchableOpacity
          style={[styles.actionButton, styles.startButton]}
          onPress={handlePressStart}
          activeOpacity={0.82}
        >
          <Ionicons name="navigate-circle" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Start Trip & Morning Roster</Text>
        </TouchableOpacity>
      )}

      {rosterPhase === 'morning_pickup' && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#7C3AED' }]}
          onPress={onNavigateRoster}
          activeOpacity={0.82}
        >
          <Ionicons name="school" size={19} color="#FFFFFF" />
          <Text style={styles.buttonText}>Manage Roster (Drop All at School) →</Text>
        </TouchableOpacity>
      )}

      {rosterPhase === 'at_school' && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#007AFF' }]}
          onPress={onNavigateRoster}
          activeOpacity={0.82}
        >
          <Ionicons name="people" size={19} color="#FFFFFF" />
          <Text style={styles.buttonText}>Open Roster (Pick All from School) →</Text>
        </TouchableOpacity>
      )}

      {rosterPhase === 'afternoon_return' && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#0284C7' }]}
          onPress={onNavigateRoster}
          activeOpacity={0.82}
        >
          <Ionicons name="home" size={19} color="#FFFFFF" />
          <Text style={styles.buttonText}>Manage Afternoon Drop-offs →</Text>
        </TouchableOpacity>
      )}

      {rosterPhase === 'completed' && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#059669' }]}
          onPress={onNavigateRoster}
          activeOpacity={0.82}
        >
          <Ionicons name="checkmark-done-circle" size={19} color="#FFFFFF" />
          <Text style={styles.buttonText}>Daily Route Finished • Open Roster →</Text>
        </TouchableOpacity>
      )}

      {/* REQ-D3.1: Pre-Start Confirmation Modal */}
      <Modal visible={showPreStartModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconBox}>
              <Ionicons name="bus" size={26} color={colors.primary} />
            </View>
            <Text style={styles.modalTitle}>Confirm Trip Start</Text>
            <Text style={styles.modalDesc}>
              You are about to start the morning transit run for {vehicleName}. Please review the pre-flight checklist:
            </Text>

            <View style={styles.checklist}>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={17} color="#10B981" />
                <Text style={styles.checkText}>Assigned Vehicle: {vehicleName} ({vehiclePlate})</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={17} color="#10B981" />
                <Text style={styles.checkText}>Route: {routeTitle}</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={17} color="#10B981" />
                <Text style={styles.checkText}>Assigned Students: {students.length} stops</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="notifications" size={17} color="#0284C7" />
                <Text style={styles.checkText}>All parents will receive trip departure push alerts</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="radio" size={17} color="#0284C7" />
                <Text style={styles.checkText}>GPS telemetry broadcast channel will activate (5s sample)</Text>
              </View>
            </View>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowPreStartModal(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmStartBtn}
                onPress={handleConfirmStart}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmBtnText}>Confirm & Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* REQ-D6.2: Unmarked Students Warning Modal */}
      <Modal visible={showUnmarkedWarningModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={[styles.modalIconBox, { backgroundColor: '#FEF2F2' }]}>
              <Ionicons name="warning" size={26} color="#DC2626" />
            </View>
            <Text style={[styles.modalTitle, { color: '#991B1B' }]}>Unmarked Students Pending</Text>
            <Text style={styles.modalDesc}>
              There are still {unmarkedStudentsCount} student(s) marked as "Waiting" on your roster. Ending the trip now will record them as unattended.
            </Text>

            <View style={styles.warningBox}>
              <Ionicons name="alert-circle" size={18} color="#DC2626" />
              <Text style={styles.warningBoxText}>
                Are you sure you want to finalize the trip and stop location broadcast?
              </Text>
            </View>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.reviewBtn}
                onPress={() => {
                  setShowUnmarkedWarningModal(false);
                  if (onNavigateRoster) onNavigateRoster();
                }}
                activeOpacity={0.75}
              >
                <Text style={styles.reviewBtnText}>Review Roster</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.endAnywayBtn}
                onPress={handleForceEndTrip}
                activeOpacity={0.8}
              >
                <Text style={styles.endAnywayBtnText}>End Trip Anyway</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* REQ-D6.3: Trip Archive Summary Modal */}
      {lastCompletedTrip && (
        <Modal visible={!!lastCompletedTrip} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={[styles.modalIconBox, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="checkmark-done-circle" size={28} color="#059669" />
              </View>
              <Text style={styles.modalTitle}>Trip Completed & Archived</Text>
              <Text style={styles.modalDesc}>
                Route history record successfully synced to school fleet administration server.
              </Text>

              <View style={styles.archiveDetails}>
                <View style={styles.archiveRow}>
                  <Text style={styles.archiveLabel}>Trip Reference:</Text>
                  <Text style={styles.archiveVal}>{lastCompletedTrip.tripId}</Text>
                </View>
                <View style={styles.archiveRow}>
                  <Text style={styles.archiveLabel}>Active Window:</Text>
                  <Text style={styles.archiveVal}>
                    {lastCompletedTrip.startTime} - {lastCompletedTrip.endTime} ({lastCompletedTrip.durationMinutes} min)
                  </Text>
                </View>
                <View style={styles.archiveRow}>
                  <Text style={styles.archiveLabel}>Students Picked / Dropped:</Text>
                  <Text style={styles.archiveVal}>
                    {lastCompletedTrip.pickedCount} / {lastCompletedTrip.droppedCount} (Absent: {lastCompletedTrip.absentCount})
                  </Text>
                </View>
                <View style={styles.archiveRow}>
                  <Text style={styles.archiveLabel}>Telemetry Sampled Points:</Text>
                  <Text style={styles.archiveVal}>{lastCompletedTrip.sampledPointsCount} GPS pings</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.dismissArchiveBtn}
                onPress={clearLastCompletedTrip}
                activeOpacity={0.8}
              >
                <Text style={styles.dismissArchiveBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    ...shadows.card,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  vehicleInfo: {
    flex: 1,
    marginRight: 8,
  },
  vehicleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vehicleTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  plateBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  plateText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#475569',
  },
  routeSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radii.full,
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
    letterSpacing: 0.4,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginBottom: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    height: 22,
    backgroundColor: '#E2E8F0',
  },
  statLabel: {
    fontSize: 9,
    color: '#64748B',
    marginBottom: 2,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  statValue: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: radii.md,
    gap: 8,
  },
  startButton: {
    backgroundColor: '#007AFF',
    ...shadows.primaryGlow,
  },
  endButton: {
    backgroundColor: '#DC2626',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    ...shadows.floatingDock,
  },
  modalIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 12.5,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  checklist: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginVertical: 14,
    gap: 8,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
    flex: 1,
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  confirmStartBtn: {
    flex: 2,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#007AFF',
  },
  confirmBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 10,
    gap: 8,
    marginVertical: 14,
  },
  warningBoxText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '600',
    flex: 1,
  },
  reviewBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  reviewBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  endAnywayBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#DC2626',
  },
  endAnywayBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  archiveDetails: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginVertical: 14,
    gap: 8,
  },
  archiveRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  archiveLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  archiveVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  dismissArchiveBtn: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissArchiveBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

export default TripStatusCard;
