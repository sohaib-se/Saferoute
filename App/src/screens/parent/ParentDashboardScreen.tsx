import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { JourneyNoticeCard } from '../../components/screencomponents/parent/dashboard/JourneyNoticeCard';
import {
  ChildStatusCard,
  ChildData,
} from '../../components/screencomponents/parent/dashboard/ChildStatusCard';
import { RadarMapCard } from '../../components/screencomponents/parent/dashboard/RadarMapCard';
import { useAuth } from '../../context/AuthContext';
import {
  getParentChildren,
  subscribeToStudentStatusChanges,
  getAssignedDriverDetailsForParent,
} from '../../services/parentService';
import {
  fetchNotificationsFromDb,
  subscribeToNotifications,
} from '../../services/notificationService';
import { colors, radii } from '../../lib/theme';

interface ParentDashboardScreenProps {
  onNavigateTab: (tabId: string) => void;
  onOpenSOS?: () => void;
}

export const ParentDashboardScreen: React.FC<ParentDashboardScreenProps> = ({
  onNavigateTab,
  onOpenSOS,
}) => {
  const { user } = useAuth();
  const [children, setChildren] = useState<ChildData[]>([]);
  const [isLoadingChildren, setIsLoadingChildren] = useState(true);
  const [unreadNotifCount, setUnreadNotifCount] = useState<number>(0);

  const [assignedDriverInfo, setAssignedDriverInfo] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchChildren = async () => {
      setIsLoadingChildren(true);
      const [data, driverRes] = await Promise.all([
        getParentChildren(user?.userId, user?.name, user?.schoolId),
        getAssignedDriverDetailsForParent(user?.userId, user?.name, user?.schoolId, user?.profile?.bus),
      ]);
      if (isMounted) {
        setChildren(data);
        setAssignedDriverInfo(driverRes);
        setIsLoadingChildren(false);
      }
    };
    fetchChildren();

    // Fetch initial unread notifications count
    fetchNotificationsFromDb('parent', user?.userId, user?.schoolId).then((notifs) => {
      if (isMounted) {
        setUnreadNotifCount(notifs.filter((n) => !n.isRead).length);
      }
    });

    const unsubscribe = subscribeToStudentStatusChanges(user?.schoolId, () => {
      fetchChildren();
    });

    const unsubNotifs = subscribeToNotifications(
      'parent',
      user?.userId,
      user?.schoolId,
      (newNotif) => {
        if (isMounted) {
          setUnreadNotifCount((prev) => prev + 1);
        }
      },
      () => {
        if (isMounted) {
          setUnreadNotifCount((prev) => Math.max(0, prev - 1));
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
      unsubNotifs();
    };
  }, [user]);

  const primaryChild = children[0];
  const vehicleDisplayName = primaryChild?.vehicle
    ? primaryChild.vehicle.split(' ')[0]
    : assignedDriverInfo?.vehicleName || user?.profile?.bus || 'Assigned Van';
  const driverDisplayName = primaryChild?.driverName || assignedDriverInfo?.driverName || 'Driver';

  const handleTrackChild = (child: ChildData) => {
    onNavigateTab('tracking');
  };

  const handleCallDriver = (child: ChildData) => {
    onNavigateTab('call');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Parent Portal"
        subtitle={`Welcome, ${user?.name || 'Parent'}`}
        onNotificationPress={() => onNavigateTab('notifications')}
        notificationBadgeCount={unreadNotifCount}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Live Journey Active Transit Card */}
        <JourneyNoticeCard vehicleName={vehicleDisplayName} sectorName="Sector G-10" driverName={driverDisplayName} />

        {/* Children Status Cards Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleCol}>
            <Text style={styles.sectionTitle}>Registered Children</Text>
            <Text style={styles.sectionSubTitle}>Live tracking & transit cards</Text>
          </View>
          <TouchableOpacity onPress={() => onNavigateTab('notifications')} activeOpacity={0.75}>
            <View style={styles.alertsBadge}>
              <Ionicons name="notifications" size={13} color={colors.primary} />
              <Text style={styles.alertsBadgeText}>View Alerts</Text>
            </View>
          </TouchableOpacity>
        </View>

        {children.map((child) => (
          <ChildStatusCard
            key={child.id}
            child={child}
            onTrackPress={handleTrackChild}
            onCallPress={handleCallDriver}
          />
        ))}

        {/* Live Map Preview Snapshot */}
        <View style={styles.mapSectionHeader}>
          <View style={styles.sectionTitleCol}>
            <Text style={styles.sectionTitle}>Live Transit Radar</Text>
            <Text style={styles.sectionSubTitle}>Realtime WebSocket GPS channel</Text>
          </View>
          <TouchableOpacity onPress={() => onNavigateTab('tracking')} activeOpacity={0.75}>
            <Text style={styles.fullScreenText}>Full Map View →</Text>
          </TouchableOpacity>
        </View>

        <RadarMapCard
          vehicleName={vehicleDisplayName}
          driverName={driverDisplayName}
          speedKmh={36}
          distanceKm={2.1}
          onPressFullMap={() => onNavigateTab('tracking')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110, // Generous padding to clear floating dock
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  sectionTitleCol: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textHeading,
    letterSpacing: -0.3,
  },
  sectionSubTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 1,
  },
  alertsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primaryBorder,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.sm,
    gap: 5,
  },
  alertsBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  mapSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12,
  },
  fullScreenText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
});

export default ParentDashboardScreen;
