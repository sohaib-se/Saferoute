import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '../../components/common/Header';
import { ParentSOSBeacon } from '../../components/screencomponents/parent/sos/ParentSOSBeacon';
import { ParentUrgentContacts } from '../../components/screencomponents/parent/sos/ParentUrgentContacts';

interface ParentSOSScreenProps {
  onBack?: () => void;
}

export const ParentSOSScreen: React.FC<ParentSOSScreenProps> = ({ onBack }) => {
  const [sosTriggered, setSosTriggered] = useState(false);

  const handleTriggerSOS = () => {
    Alert.alert(
      'EMERGENCY SOS ALERT',
      'Are you sure you want to trigger SOS? This will capture your current location and send an immediate high-priority safety alert to the School Administration and Transport Team.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'SEND SOS ALERT',
          style: 'destructive',
          onPress: () => {
            setSosTriggered(true);
            Alert.alert(
              'Alert Transmitted',
              'School Admin has received your SOS beacon with your GPS coordinates. School security and transport teams are notified.'
            );
          },
        },
      ]
    );
  };

  const handleClearSOS = () => {
    setSosTriggered(false);
    Alert.alert('SOS Cleared', 'Your emergency alert has been resolved.');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Parent Emergency SOS"
        subtitle="Immediate Safety Escalation"
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ParentSOSBeacon
          isTriggered={sosTriggered}
          onTrigger={handleTriggerSOS}
          onCancel={handleClearSOS}
        />
        <ParentUrgentContacts />
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
