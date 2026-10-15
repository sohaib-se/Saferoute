import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { ChildSelectorPills } from '../../components/screencomponents/parent/livetracking/ChildSelectorPills';
import { TrackingMapCanvas } from '../../components/screencomponents/parent/livetracking/TrackingMapCanvas';
import { TransitTimeline } from '../../components/screencomponents/parent/livetracking/TransitTimeline';
import { DriverCallAction } from '../../components/screencomponents/parent/livetracking/DriverCallAction';

interface ParentLiveTrackingScreenProps {
  onBack?: () => void;
  onCallDriver?: () => void;
}

export const ParentLiveTrackingScreen: React.FC<ParentLiveTrackingScreenProps> = ({
  onBack,
  onCallDriver,
}) => {
  const [selectedChild, setSelectedChild] = useState('c-1');

  const childOptions = [
    { id: 'c-1', name: 'Ayesha', busLabel: 'Bus 1' },
    { id: 'c-2', name: 'Zain', busLabel: 'Bus 1' },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Live Van Tracking"
        subtitle="Active Supabase WebSocket Channel"
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Child selector chips */}
        <ChildSelectorPills
          options={childOptions}
          selectedId={selectedChild}
          onSelect={setSelectedChild}
        />

        {/* Live Map Representation */}
        <TrackingMapCanvas
          vehicleName="Bus 1"
          driverName="Hilal"
          speedKmh={38}
          etaMins={7}
          distanceKm={2.1}
        />

        {/* Live Telemetry Progress Timeline */}
        <TransitTimeline
          vehicleName="Bus 1"
          driverName="Hilal"
          driverPhone="+92 312 4124"
        />

        {onCallDriver && (
          <DriverCallAction driverName="Hilal" onPress={onCallDriver} />
        )}
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
});
