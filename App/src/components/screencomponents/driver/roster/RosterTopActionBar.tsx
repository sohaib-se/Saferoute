import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';
import { RosterShiftPhase } from '../../../../context/DriverTripContext';

interface RosterTopActionBarProps {
  phase: RosterShiftPhase;
  onStartRoster: () => void;
  onDropAllSchool: () => void;
  onPickAllSchool: () => void;
  onResetDay: () => void;
  pickedCount: number;
  totalAttending: number;
  remainingHomeDrops: number;
  studentsAtSchoolCount?: number;
}

export const RosterTopActionBar: React.FC<RosterTopActionBarProps> = ({
  phase,
  onStartRoster,
  onDropAllSchool,
  onPickAllSchool,
  onResetDay,
  pickedCount,
  totalAttending,
  remainingHomeDrops,
  studentsAtSchoolCount = 0,
}) => {
  // 1. Idle state: Start Roster
  if (phase === 'idle') {
    return (
      <View style={styles.idleCard}>
        <View style={styles.idleHeaderRow}>
          <View style={styles.idleIconBox}>
            <Ionicons name="bus" size={24} color="#007AFF" />
          </View>
          <View style={styles.idleTextCol}>
            <Text style={styles.idleTitle}>Morning Student Roster</Text>
            <Text style={styles.idleSubtitle}>Ready to begin morning home pickups</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startRosterBtn}
          onPress={onStartRoster}
          activeOpacity={0.85}
        >
          <Ionicons name="play" size={18} color="#FFFFFF" />
          <Text style={styles.startRosterBtnText}>Start Roster & Trip</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 2. Morning Pickup (Home -> School)
  if (phase === 'morning_pickup') {
    return (
      <View style={styles.activeShiftCard}>
        <View style={styles.shiftHeaderRow}>
          <View style={styles.shiftTitleGroup}>
            <View style={styles.morningBadge}>
              <Ionicons name="sunny" size={12} color="#D97706" />
              <Text style={styles.morningBadgeText}>MORNING SHIFT</Text>
            </View>
            <Text style={styles.shiftTitle}>Home → School Route</Text>
          </View>

          <View style={styles.progressCounter}>
            <Text style={styles.progressCounterText}>
              {pickedCount}/{totalAttending} Onboard
            </Text>
          </View>
        </View>

        <Text style={styles.shiftHint}>
          Pick up students at their stops. When you arrive at school, tap "Drop All" below to drop all onboard students at once.
        </Text>

        {/* Drop All Button on Top */}
        <TouchableOpacity
          style={[styles.dropAllBtn, pickedCount === 0 && styles.dropAllBtnDisabled]}
          onPress={onDropAllSchool}
          disabled={pickedCount === 0}
          activeOpacity={0.82}
        >
          <Ionicons name="school" size={17} color="#FFFFFF" />
          <Text style={styles.dropAllBtnText}>
            {pickedCount > 0
              ? `Drop All at School (${pickedCount} Onboard)`
              : 'Drop All at School (0 Onboard)'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. At School (Morning Finished, Ready for Afternoon Return)
  if (phase === 'at_school') {
    return (
      <View style={[styles.activeShiftCard, styles.atSchoolCard]}>
        <View style={styles.shiftHeaderRow}>
          <View style={styles.shiftTitleGroup}>
            <View style={[styles.morningBadge, { backgroundColor: '#EDE9FE', borderColor: '#DDD6FE' }]}>
              <Ionicons name="checkmark-done" size={12} color="#7C3AED" />
              <Text style={[styles.morningBadgeText, { color: '#7C3AED' }]}>SCHOOL ARRIVAL COMPLETE</Text>
            </View>
            <Text style={styles.shiftTitle}>Students Safely at Campus</Text>
          </View>

          <View style={[styles.progressCounter, { backgroundColor: '#EDE9FE', borderColor: '#DDD6FE' }]}>
            <Text style={[styles.progressCounterText, { color: '#7C3AED' }]}>
              {studentsAtSchoolCount} at School
            </Text>
          </View>
        </View>

        <Text style={styles.shiftHint}>
          Morning drop-off is complete. When school ends, tap "Pick All from School" below to board all morning students for their afternoon return trip.
        </Text>

        {/* Pick All Button on Top */}
        <TouchableOpacity
          style={styles.pickAllBtn}
          onPress={onPickAllSchool}
          activeOpacity={0.85}
        >
          <Ionicons name="people" size={18} color="#FFFFFF" />
          <Text style={styles.pickAllBtnText}>
            Pick All from School {studentsAtSchoolCount > 0 ? `(${studentsAtSchoolCount} Students)` : ''}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 4. Afternoon Return (School -> Home)
  if (phase === 'afternoon_return') {
    return (
      <View style={[styles.activeShiftCard, styles.afternoonCard]}>
        <View style={styles.shiftHeaderRow}>
          <View style={styles.shiftTitleGroup}>
            <View style={[styles.morningBadge, { backgroundColor: '#E0F2FE', borderColor: '#BAE6FD' }]}>
              <Ionicons name="partly-sunny" size={12} color="#0284C7" />
              <Text style={[styles.morningBadgeText, { color: '#0284C7' }]}>AFTERNOON RETURN</Text>
            </View>
            <Text style={styles.shiftTitle}>School → Home Drop-offs</Text>
          </View>

          <View style={styles.progressCounter}>
            <Text style={styles.progressCounterText}>
              {remainingHomeDrops} Remaining
            </Text>
          </View>
        </View>

        <Text style={styles.shiftHint}>
          Students are onboard. Drop each child off at their home stop one by one by pressing "Drop Home" on their card below.
        </Text>
      </View>
    );
  }

  // 5. Completed
  return (
    <View style={[styles.activeShiftCard, styles.completedCard]}>
      <View style={styles.shiftHeaderRow}>
        <View style={styles.shiftTitleGroup}>
          <View style={[styles.morningBadge, { backgroundColor: '#D1FAE5', borderColor: '#A7F3D0' }]}>
            <Ionicons name="checkmark-circle" size={12} color="#059669" />
            <Text style={[styles.morningBadgeText, { color: '#059669' }]}>ALL RUNS COMPLETED</Text>
          </View>
          <Text style={styles.shiftTitle}>Daily Transit Route Complete</Text>
        </View>
      </View>

      <Text style={styles.shiftHint}>
        All students have been safely dropped home for the day. You can reset when preparing for the next day's run.
      </Text>

      <TouchableOpacity
        style={styles.resetBtn}
        onPress={onResetDay}
        activeOpacity={0.8}
      >
        <Ionicons name="refresh" size={16} color="#0F172A" />
        <Text style={styles.resetBtnText}>Reset for Next Run</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  idleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginBottom: 14,
    ...shadows.card,
  },
  idleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },
  idleIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  idleTextCol: {
    flex: 1,
  },
  idleTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  idleSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  startRosterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 13,
    borderRadius: radii.md,
    gap: 8,
    ...shadows.primaryGlow,
  },
  startRosterBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  activeShiftCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginBottom: 14,
    ...shadows.card,
  },
  atSchoolCard: {
    borderColor: '#DDD6FE',
    backgroundColor: '#FAF5FF',
  },
  afternoonCard: {
    borderColor: '#BAE6FD',
    backgroundColor: '#F0F9FF',
  },
  completedCard: {
    borderColor: '#A7F3D0',
    backgroundColor: '#F0FDF4',
  },
  shiftHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  shiftTitleGroup: {
    flex: 1,
  },
  morningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.full,
    gap: 4,
    marginBottom: 4,
  },
  morningBadgeText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#B45309',
    letterSpacing: 0.4,
  },
  shiftTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  progressCounter: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  progressCounterText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#334155',
  },
  shiftHint: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 14,
    fontWeight: '500',
  },
  dropAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: radii.md,
    gap: 8,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  dropAllBtnDisabled: {
    opacity: 0.5,
    backgroundColor: '#94A3B8',
    elevation: 0,
    shadowOpacity: 0,
  },
  dropAllBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },
  pickAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: radii.md,
    gap: 8,
    ...shadows.primaryGlow,
  },
  pickAllBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingVertical: 10,
    borderRadius: radii.md,
    gap: 6,
  },
  resetBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
});

export default RosterTopActionBar;
