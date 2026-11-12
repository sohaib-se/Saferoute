import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '../../components/common/Header';
import { ParentSOSBeacon } from '../../components/screencomponents/parent/sos/ParentSOSBeacon';
import { useAuth } from '../../context/AuthContext';
import { dispatchSOSAlert, getActiveSOSAlert, subscribeToSOSResolution } from '../../services/sosService';

interface ParentSOSScreenProps {
  onBack?: () => void;
  onOpenNotifications?: () => void;
}

export const ParentSOSScreen: React.FC<ParentSOSScreenProps> = ({
  onBack,
  onOpenNotifications,
}) => {
  const { user } = useAuth();
  const [sosTriggered, setSosTriggered] = useState(false);
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);

  // Check if an active distress beacon already exists on mount
  useEffect(() => {
    let isMounted = true;
    const checkActiveSOS = async () => {
      const active = await getActiveSOSAlert('parent', user?.userId);
      if (isMounted && active) {
        setSosTriggered(true);
        setActiveAlertId(active.id);
      }
    };
    checkActiveSOS();
    return () => {
      isMounted = false;
    };
  }, [user?.userId]);

  // Subscribe to real-time resolution by School Administration
  useEffect(() => {
    if (!sosTriggered) return;

    const unsubscribe = subscribeToSOSResolution(activeAlertId || undefined, () => {
      setSosTriggered(false);
      setActiveAlertId(null);
      Alert.alert(
        'Emergency Resolved',
        'School Administration has verified safety and marked your SOS alert as resolved.'
      );
    });

    return () => {
      unsubscribe();
    };
  }, [sosTriggered, activeAlertId]);

  const handleTriggerSOS = () => {
    Alert.alert(
      'EMERGENCY SOS ALERT',
      'Are you sure you want to trigger SOS? This will send an immediate high-priority emergency safety alert to the School Administration.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'SEND SOS ALERT',
          style: 'destructive',
          onPress: async () => {
            setSosTriggered(true);
            const result = await dispatchSOSAlert({
              schoolId: user?.schoolId,
              senderType: 'parent',
              senderId: user?.userId || '87ac2bf4-700b-4fec-9ec0-1fd83f3bb448',
              senderName: user?.name || 'Zeeshan Malik',
              vehicleName: user?.profile?.bus || 'Bus 1',
              latitude: 33.6844,
              longitude: 73.0479,
            });

            if (result.alertId) {
              setActiveAlertId(result.alertId);
            }

            Alert.alert(
              'SOS Alert Sent',
              'SOS has been sent! School administration and campus safety officers have received your distress alert. Only School Admin can resolve this emergency.'
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Parent Emergency SOS"
        subtitle="Immediate Safety Escalation"
        showBack={!!onBack}
        onBack={onBack}
        onNotificationPress={onOpenNotifications}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ParentSOSBeacon
          isTriggered={sosTriggered}
          onTrigger={handleTriggerSOS}
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
    paddingBottom: 110, // Dock clearance
  },
});

export default ParentSOSScreen;
