import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../components/common/Header';
import { TrackingMapCanvas } from '../../components/screencomponents/parent/livetracking/TrackingMapCanvas';
import { CurrentTripStatusCard } from '../../components/screencomponents/parent/livetracking/CurrentTripStatusCard';
import {
  ParentInAppCallModal,
  ParentActiveCall,
} from '../../components/screencomponents/parent/calldriver/ParentInAppCallModal';

interface ParentLiveTrackingScreenProps {
  onBack?: () => void;
  onCallDriver?: () => void;
  onOpenNotifications?: () => void;
}

export const ParentLiveTrackingScreen: React.FC<ParentLiveTrackingScreenProps> = ({
  onBack,
  onCallDriver,
  onOpenNotifications,
}) => {
  const [activeCall, setActiveCall] = useState<ParentActiveCall | null>(null);

  const handleStartDriverCall = () => {
    setActiveCall({
      name: 'Hilal',
      role: 'Assigned Route Driver • Bus 1',
      phone: '031241242',
      avatarIcon: 'person',
    });
  };

  return (
    <View style={styles.container}>
      {/* 1. Screen Header */}
      <Header
        title="Live Van Tracking"
        subtitle="Bus 1 • Tracking Both Children"
        onBack={onBack}
        onNotificationPress={onOpenNotifications}
      />

      {/* 2. Full Screen Interactive Map Canvas */}
      <View style={styles.mapSection}>
        <TrackingMapCanvas
          vehicleName="Bus 1"
          driverName="Hilal"
          speedKmh={38}
          distanceKm={2.1}
        />
      </View>

      {/* 3. Current Status of Trip Card */}
      <View style={styles.statusSection}>
        <CurrentTripStatusCard
          vehicleName="Bus 1"
          vehiclePlate="ICT-4921"
          driverName="Hilal"
          driverPhone="031241242"
          speedKmh={38}
          distanceKm={2.1}
          etaMins={7}
          currentSector="Sector G-10"
          onCallDriver={handleStartDriverCall}
        />
      </View>

      {/* 4. In-App VoIP Call Modal Popup */}
      <ParentInAppCallModal
        call={activeCall}
        onEndCall={() => setActiveCall(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9FD',
  },
  mapSection: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  statusSection: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#F4F9FD',
  },
});

export default ParentLiveTrackingScreen;
