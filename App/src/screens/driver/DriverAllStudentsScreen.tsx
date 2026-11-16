import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { useDriverTrip, StudentRosterItem } from '../../context/DriverTripContext';
import { useCall } from '../../context/CallContext';
import { colors, radii, shadows } from '../../lib/theme';

interface DriverAllStudentsScreenProps {
  onBack: () => void;
  onOpenNotifications?: () => void;
}

export const DriverAllStudentsScreen: React.FC<DriverAllStudentsScreenProps> = ({
  onBack,
  onOpenNotifications,
}) => {
  const { students, routeTitle, vehicleName, tripNotifications } = useDriverTrip();
  const { startCall } = useCall();
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = tripNotifications.filter((n) => !n.isRead).length;

  const handleCallParent = (student: StudentRosterItem) => {
    startCall({
      calleeId: student.parentUserId || '87ac2bf4-700b-4fec-9ec0-1fd83f3bb448',
      calleeRole: 'parent',
      calleeName: student.parentName,
      studentName: student.name,
      vehicleName,
    });
  };

  const getMilestoneBadge = (milestone: string) => {
    switch (milestone) {
      case 'picked_home':
        return { bg: '#ECFDF5', text: '#059669', label: 'Onboard (Van)' };
      case 'dropped_school':
        return { bg: '#F5F3FF', text: '#7C3AED', label: 'At School' };
      case 'picked_school':
        return { bg: '#E0F2FE', text: '#0284C7', label: 'Onboard (Return)' };
      case 'dropped_home':
        return { bg: '#ECFDF5', text: '#059669', label: 'Safely Home' };
      case 'absent':
        return { bg: '#FEF2F2', text: '#DC2626', label: 'Absent' };
      default:
        return { bg: '#FFFBEB', text: '#D97706', label: 'Waiting at Home' };
    }
  };

  const filteredStudents = students.filter((s) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      s.name.toLowerCase().includes(query) ||
      s.stopAddress.toLowerCase().includes(query) ||
      s.parentName.toLowerCase().includes(query) ||
      s.grade.toLowerCase().includes(query)
    );
  });

  return (
    <View style={styles.container}>
      <Header
        title="Assigned Students"
        subtitle={`${students.length} students • ${routeTitle || vehicleName}`}
        onBack={onBack}
        onNotificationPress={onOpenNotifications}
        notificationBadgeCount={unreadCount}
      />

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search student, address, or parent..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: st }) => {
          const badge = getMilestoneBadge(st.milestone || 'waiting_home');
          return (
            <View style={styles.studentCard}>
              <View style={styles.cardMainRow}>
                <View style={styles.stopSeqCircle}>
                  <Text style={styles.stopSeqText}>#{st.stopNumber}</Text>
                </View>

                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{st.avatarInitials}</Text>
                </View>

                <View style={styles.infoCol}>
                  <View style={styles.nameRow}>
                    <Text style={styles.studentName} numberOfLines={1}>
                      {st.name}
                    </Text>
                    <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.badgeText, { color: badge.text }]}>
                        {badge.label}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.gradeText}>{st.grade}</Text>

                  <View style={styles.detailRow}>
                    <Ionicons name="location-outline" size={13} color={colors.textSecondary} />
                    <Text style={styles.detailText} numberOfLines={1}>
                      {st.stopAddress}
                    </Text>
                  </View>

                  {st.parentName ? (
                    <View style={styles.detailRow}>
                      <Ionicons name="person-outline" size={13} color={colors.textSecondary} />
                      <Text style={styles.detailText} numberOfLines={1}>
                        Parent: {st.parentName}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>

              <View style={styles.cardActionRow}>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => handleCallParent(st)}
                  activeOpacity={0.75}
                >
                  <Ionicons name="call-outline" size={14} color={colors.primary} />
                  <Text style={styles.callButtonText}>Call Parent</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={36} color={colors.textSecondary} />
            <Text style={styles.emptyText}>
              {searchQuery ? 'No matching students found' : 'No students assigned yet'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9FD',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
    ...shadows.card,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textHeading,
    padding: 0,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginBottom: 10,
    ...shadows.card,
  },
  cardMainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stopSeqCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  stopSeqText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.primary,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#051329',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  infoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentName: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textHeading,
    flex: 1,
    marginRight: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.full,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  gradeText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  detailText: {
    fontSize: 11.5,
    color: colors.textSecondary,
    flex: 1,
  },
  cardActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    gap: 5,
  },
  callButtonText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 10,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});

export default DriverAllStudentsScreen;

