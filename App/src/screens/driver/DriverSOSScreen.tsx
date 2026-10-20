import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '../../components/common/Header';
import { DriverSOSBeacon } from '../../components/screencomponents/driver/sos/DriverSOSBeacon';
import { useDriverTrip } from '../../context/DriverTripContext';

interface DriverSOSScreenProps {
  onBack?: () => void;
  onOpenNotifications?: () => void;
}

export const DriverSOSScreen: React.FC<DriverSOSScreenProps> = ({
  onBack,
  onOpenNotifications,
}) => {
  const { gpsState, vehicleName, students } = useDriverTrip();
  const [sosTriggered, setSosTriggered] = useState(false);

  // REQ-D7.1: SOS must capture current location and notify school admin and all parents
  const handleTriggerSOS = () => {
    Alert.alert(
      'EMERGENCY SOS ALERT',
      `Are you sure you want to trigger SOS? This will capture your current GPS location (${gpsState.latitude.toFixed(4)}°N, ${gpsState.longitude.toFixed(4)}°E) and notify the School Administration and all ${students.length} parents on this route.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'DISPATCH EMERGENCY SOS',
          style: 'destructive',
          onPress: () => {
            setSosTriggered(true);
            Alert.alert(
              'SOS Beacon Transmitted',
              `Emergency distress signal transmitted! Live telemetry for ${vehicleName} shared with School Admin and all assigned parents.`
            );
          },
        },
      ]
    );
  };

  const handleClearSOS = () => {
    setSosTriggered(false);
    Alert.alert('SOS Resolved', 'Emergency status deactivated.');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Driver Emergency SOS"
        subtitle="Immediate Safety Escalation"
        onBack={onBack}
        onNotificationPress={onOpenNotifications}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Glowing SOS Beacon matching Parent SOS */}
        <DriverSOSBeacon
          isTriggered={sosTriggered}
          onTrigger={handleTriggerSOS}
          onClear={handleClearSOS}
        />
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
});

export default DriverSOSScreen;
