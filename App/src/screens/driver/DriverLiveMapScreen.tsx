import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { DriverMapCanvas } from '../../components/screencomponents/driver/livemap/DriverMapCanvas';
import { DriverMapTelemetry } from '../../components/screencomponents/driver/livemap/DriverMapTelemetry';
import { UpcomingStopsList } from '../../components/screencomponents/driver/livemap/UpcomingStopsList';

interface DriverLiveMapScreenProps {
  onBack?: () => void;
}

export const DriverLiveMapScreen: React.FC<DriverLiveMapScreenProps> = ({ onBack }) => {
  const [isBroadcasting, setIsBroadcasting] = useState(true);

  return (
    <View style={styles.container}>
      <Header
        title="Live Route Navigation"
        subtitle="Real-time GPS Tracking Hub"
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Real-time Map Simulation Canvas */}
        <DriverMapCanvas
          speedKmh={isBroadcasting ? 42 : 0}
          etaMins={12}
          distanceKm={3.8}
        />

        {/* Live Broadcast Telemetry Panel */}
        <DriverMapTelemetry
          isBroadcasting={isBroadcasting}
          onToggleBroadcast={() => setIsBroadcasting(!isBroadcasting)}
        />

        {/* Upcoming Route Stops Card */}
        <UpcomingStopsList />
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
