import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { JourneyNoticeCard } from '../../components/screencomponents/parent/dashboard/JourneyNoticeCard';
import {
  ChildStatusCard,
  ChildData,
} from '../../components/screencomponents/parent/dashboard/ChildStatusCard';
import { RadarMapCard } from '../../components/screencomponents/parent/dashboard/RadarMapCard';
import { useAuth } from '../../context/AuthContext';
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

  // Multi-child support as per SRS REQ-P2.1
  const [children] = useState<ChildData[]>([
    {
      id: 'c-1',
      name: 'Ayesha Malik',
      grade: 'Grade 4 - Section C',
      studentCode: '1482',
      vehicle: 'Bus 1 (ICT-4921)',
      driverName: 'Hilal',
      driverPhone: '03124124',
      status: 'En route',
      etaMinutes: 7,
      pickupTime: '07:25 AM',
    },
    {
      id: 'c-2',
      name: 'Zain Malik',
      grade: 'Grade 2 - Section A',
      studentCode: '1483',
      vehicle: 'Bus 1 (ICT-4921)',
      driverName: 'Hilal',
      driverPhone: '03124124',
      status: 'Waiting',
      etaMinutes: 25,
      pickupTime: '07:45 AM',
    },
  ]);

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
        notificationBadgeCount={2}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Live Journey Active Transit Card */}
        <JourneyNoticeCard vehicleName="Bus 1" sectorName="Sector G-10" driverName="Hilal" />

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
          vehicleName="Bus 1"
          driverName="Hilal"
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
