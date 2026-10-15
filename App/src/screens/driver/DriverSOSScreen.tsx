import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '../../components/common/Header';
import { DriverSOSBeacon } from '../../components/screencomponents/driver/sos/DriverSOSBeacon';
import { DriverEmergencyHelplines } from '../../components/screencomponents/driver/sos/DriverEmergencyHelplines';

interface DriverSOSScreenProps {
  onBack?: () => void;
}

export const DriverSOSScreen: React.FC<DriverSOSScreenProps> = ({ onBack }) => {
  const [sosTriggered, setSosTriggered] = useState(false);

  const handleTriggerSOS = () => {
    Alert.alert(
      'EMERGENCY CONFIRMATION',
      'Are you sure you want to trigger SOS? This will immediately notify School Administration and all parents on this route with your live location coordinates.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'CONFIRM EMERGENCY',
          style: 'destructive',
          onPress: () => {
            setSosTriggered(true);
            Alert.alert(
              'SOS Dispatched',
              'Emergency beacon activated! Coordinates transmitted to School Admin command panel.'
            );
          },
        },
      ]
    );
  };

  const handleClearSOS = () => {
    setSosTriggered(false);
    Alert.alert('SOS Deactivated', 'Emergency status cleared.');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Driver Emergency SOS"
        subtitle="Incident Escalation Center"
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <DriverSOSBeacon
          isTriggered={sosTriggered}
          onTrigger={handleTriggerSOS}
          onClear={handleClearSOS}
        />
        <DriverEmergencyHelplines />
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
    paddingBottom: 28,
  },
});
