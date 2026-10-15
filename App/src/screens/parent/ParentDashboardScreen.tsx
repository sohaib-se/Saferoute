import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { ParentSOSBanner } from '../../components/screencomponents/parent/dashboard/ParentSOSBanner';
import { JourneyNoticeCard } from '../../components/screencomponents/parent/dashboard/JourneyNoticeCard';
import {
  ChildStatusCard,
  ChildData,
} from '../../components/screencomponents/parent/dashboard/ChildStatusCard';
import { RadarMapCard } from '../../components/screencomponents/parent/dashboard/RadarMapCard';
import { useAuth } from '../../context/AuthContext';

interface ParentDashboardScreenProps {
  onNavigateTab: (tabId: string) => void;
  onOpenSOS: () => void;
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
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Prominent Emergency SOS button */}
        <ParentSOSBanner onPress={onOpenSOS} />

        {/* Live Journey Quick Alert Banner */}
        <JourneyNoticeCard vehicleName="Bus 1" sectorName="G-10" etaMins={7} />

        {/* Children Status Cards Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Registered Children ({children.length})</Text>
          <TouchableOpacity onPress={() => onNavigateTab('notifications')}>
            <View style={styles.alertsBadge}>
              <Ionicons name="notifications" size={13} color="#2563EB" />
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
          <Text style={styles.sectionTitle}>Live Transit Radar</Text>
          <TouchableOpacity onPress={() => onNavigateTab('tracking')}>
            <Text style={styles.fullScreenText}>Full Map</Text>
          </TouchableOpacity>
        </View>

        <RadarMapCard
          vehicleName="Bus 1"
          driverName="Hilal"
          speedKmh={36}
          etaMins={7}
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
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  alertsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  alertsBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  mapSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  fullScreenText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
});
