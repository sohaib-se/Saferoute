import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { useAuth } from '../../context/AuthContext';
import { useDriverTrip } from '../../context/DriverTripContext';
import { colors, radii, shadows } from '../../lib/theme';

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
    vehiclePlate,
    routeTitle,
    isTripActive,
    rosterPhase,
    students,
    tripPhase,
    createTrip,
    tripNotifications,
    isLoadingTrip,
  } = useDriverTrip();

  const [isCreatingTrip, setIsCreatingTrip] = useState(false);

  const unreadCount = tripNotifications.filter((n) => !n.isRead).length;
  const previewStudents = students.slice(0, 3);

  const handleCreateTrip = async () => {
    setIsCreatingTrip(true);
    try {
      const ok = await createTrip();
      if (ok) {
        onNavigateTab('trip');
      }
    } finally {
      setIsCreatingTrip(false);
    }
  };

  const getMilestoneBadge = (milestone: string) => {
    switch (milestone) {
      case 'picked_home':
        return { bg: '#ECFDF5', text: '#059669', label: 'Onboard' };
      case 'dropped_school':
        return { bg: '#F5F3FF', text: '#7C3AED', label: 'At School' };
      case 'picked_school':
        return { bg: '#E0F2FE', text: '#0284C7', label: 'Return' };
      case 'dropped_home':
        return { bg: '#ECFDF5', text: '#059669', label: 'Home' };
      case 'absent':
        return { bg: '#FEF2F2', text: '#DC2626', label: 'Absent' };
      default:
        return { bg: '#FFFBEB', text: '#D97706', label: 'Waiting' };
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Driver Portal"
        subtitle={`Welcome, ${user?.name || 'Driver'}`}
        onNotificationPress={() => onNavigateTab('notifications')}
        notificationBadgeCount={unreadCount}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ── BUS INFO CARD ── */}
        <View style={styles.busInfoCard}>
          <View style={styles.busInfoTop}>
            <View style={styles.busIconCircle}>
              <Ionicons name="bus" size={24} color={colors.primary} />
            </View>
            <View style={styles.busInfoTextCol}>
              <Text style={styles.busName}>{vehicleName || 'Assigned Vehicle'}</Text>
              {vehiclePlate ? <Text style={styles.busPlate}>{vehiclePlate}</Text> : null}
              <View style={styles.routeRow}>
                <Ionicons name="map-outline" size={12} color={colors.textSecondary} />
                <Text style={styles.routeText} numberOfLines={1}>
                  {routeTitle || 'No route assigned'}
                </Text>
              </View>
            </View>
            {/* Live status indicator */}
            <View
              style={[
                styles.tripStatusPill,
                isTripActive ? styles.tripStatusPillActive : styles.tripStatusPillIdle,
              ]}
            >
              <View
                style={[
                  styles.tripStatusDot,
                  isTripActive ? styles.tripStatusDotActive : styles.tripStatusDotIdle,
                ]}
              />
              <Text
                style={[
                  styles.tripStatusPillText,
                  isTripActive ? styles.tripStatusPillTextActive : styles.tripStatusPillTextIdle,
                ]}
              >
                {isTripActive ? 'LIVE' : 'IDLE'}
              </Text>
            </View>
          </View>

          {/* Action Button: Create Today's Trip or Go to Trip */}
          {isLoadingTrip ? (
            <ActivityIndicator size="small" color={colors.primary} style={styles.loadingBtn} />
          ) : isTripActive ? (
            <TouchableOpacity
              style={styles.goToTripBtn}
              onPress={() => onNavigateTab('trip')}
              activeOpacity={0.8}
            >
              <Ionicons name="navigate" size={18} color="#FFFFFF" />
              <Text style={styles.goToTripBtnText}>Go to Active Trip →</Text>
            </TouchableOpacity>
          ) : tripPhase === 'pending' || tripPhase === 'pickup_done' ? (
            <TouchableOpacity
              style={styles.goToTripBtn}
              onPress={() => onNavigateTab('trip')}
              activeOpacity={0.8}
            >
              <Ionicons name="navigate" size={18} color="#FFFFFF" />
              <Text style={styles.goToTripBtnText}>
                {tripPhase === 'pending' ? 'Go to Scheduled Trip →' : 'Go to Afternoon Drop-off →'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.createTripBtn}
              onPress={handleCreateTrip}
              disabled={isCreatingTrip}
              activeOpacity={0.8}
            >
              {isCreatingTrip ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="add-circle" size={18} color="#FFFFFF" />
                  <Text style={styles.createTripBtnText}>Create Today's Trip</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* ── ASSIGNED STUDENTS SECTION ── */}
        <View style={styles.studentsSection}>
          <View style={styles.studentsSectionHeader}>
            <View style={styles.studentsSectionTitleCol}>
              <Text style={styles.studentsSectionTitle}>Assigned Students</Text>
              <Text style={styles.studentsSectionSubtitle}>
                {students.length} student{students.length !== 1 ? 's' : ''} on this route
              </Text>
            </View>
            <TouchableOpacity
              style={styles.seeAllBadge}
              onPress={() => onNavigateTab('students')}
              activeOpacity={0.75}
            >
              <Text style={styles.seeAllText}>See All →</Text>
            </TouchableOpacity>
          </View>

          {students.length === 0 ? (
            <View style={styles.emptyStudentsCard}>
              <Ionicons name="people-outline" size={28} color={colors.textSecondary} />
              <Text style={styles.emptyStudentsText}>No students assigned yet</Text>
            </View>
          ) : (
            <View style={styles.studentsPreviewCard}>
              {previewStudents.map((st, index) => {
                const badge = getMilestoneBadge(st.milestone || 'waiting_home');
                return (
                  <View
                    key={st.id}
                    style={[
                      styles.studentPreviewRow,
                      index < previewStudents.length - 1 && styles.studentPreviewRowBorder,
                    ]}
                  >
                    <View style={styles.studentAvatarCircle}>
                      <Text style={styles.studentAvatarText}>{st.avatarInitials}</Text>
                    </View>
                    <View style={styles.studentPreviewInfo}>
                      <Text style={styles.studentPreviewName} numberOfLines={1}>
                        {st.name}
                      </Text>
                      <Text style={styles.studentPreviewGrade}>{st.grade}</Text>
                    </View>
                    <View style={[styles.milestoneBadge, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.milestoneBadgeText, { color: badge.text }]}>
                        {badge.label}
                      </Text>
                    </View>
                  </View>
                );
              })}

              {/* Option below to see all students */}
              <TouchableOpacity
                style={styles.seeAllRow}
                onPress={() => onNavigateTab('students')}
                activeOpacity={0.75}
              >
                <Text style={styles.seeAllRowText}>
                  See all {students.length} assigned students
                </Text>
                <Ionicons name="chevron-forward" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
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

  // Bus Info Card
  busInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginBottom: 16,
    ...shadows.card,
  },
  busInfoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  busIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  busInfoTextCol: {
    flex: 1,
  },
  busName: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textHeading,
    letterSpacing: -0.3,
  },
  busPlate: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginTop: 1,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  routeText: {
    fontSize: 11.5,
    color: colors.textSecondary,
    flex: 1,
  },
  tripStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.full,
    borderWidth: 1,
    gap: 5,
  },
  tripStatusPillActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  tripStatusPillIdle: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  tripStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  tripStatusDotActive: {
    backgroundColor: '#10B981',
  },
  tripStatusDotIdle: {
    backgroundColor: '#F59E0B',
  },
  tripStatusPillText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tripStatusPillTextActive: {
    color: '#059669',
  },
  tripStatusPillTextIdle: {
    color: '#D97706',
  },
  loadingBtn: {
    marginTop: 4,
  },
  createTripBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: radii.md,
    gap: 8,
  },
  createTripBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  startTripBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: radii.md,
    gap: 8,
  },
  startTripBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  goToTripBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 13,
    borderRadius: radii.md,
    gap: 8,
  },
  goToTripBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Students Section
  studentsSection: {
    marginBottom: 8,
  },
  studentsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentsSectionTitleCol: {
    flex: 1,
  },
  studentsSectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textHeading,
    letterSpacing: -0.3,
  },
  studentsSectionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 1,
  },
  seeAllBadge: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primaryBorder,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.sm,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  emptyStudentsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 24,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
  },
  emptyStudentsText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  studentsPreviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    overflow: 'hidden',
    ...shadows.card,
  },
  studentPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  studentPreviewRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  studentAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#051329',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentAvatarText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  studentPreviewInfo: {
    flex: 1,
  },
  studentPreviewName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textHeading,
  },
  studentPreviewGrade: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  milestoneBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.full,
  },
  milestoneBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 6,
  },
  seeAllRowText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.primary,
  },
});

export default DriverDashboardScreen;
