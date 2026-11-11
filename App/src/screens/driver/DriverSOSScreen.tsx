import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '../../components/common/Header';
import { DriverSOSBeacon } from '../../components/screencomponents/driver/sos/DriverSOSBeacon';
import { useAuth } from '../../context/AuthContext';
import { useDriverTrip } from '../../context/DriverTripContext';
import { dispatchSOSAlert, getActiveSOSAlert, subscribeToSOSResolution } from '../../services/sosService';

interface DriverSOSScreenProps {
  onBack?: () => void;
  onOpenNotifications?: () => void;
}

export const DriverSOSScreen: React.FC<DriverSOSScreenProps> = ({
  onBack,
  onOpenNotifications,
}) => {
  const { user } = useAuth();
  const { gpsState, vehicleName, students } = useDriverTrip();
  const [sosTriggered, setSosTriggered] = useState(false);
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);

  // Check if an active distress beacon already exists on mount
  useEffect(() => {
    let isMounted = true;
    const checkActiveSOS = async () => {
      const active = await getActiveSOSAlert('driver', user?.userId, vehicleName);
      if (isMounted && active) {
        setSosTriggered(true);
        setActiveAlertId(active.id);
      }
    };
    checkActiveSOS();
    return () => {
      isMounted = false;
    };
  }, [user?.userId, vehicleName]);

  // Subscribe to real-time resolution by School Administration
  useEffect(() => {
    if (!sosTriggered) return;

    const unsubscribe = subscribeToSOSResolution(activeAlertId || undefined, () => {
      setSosTriggered(false);
      setActiveAlertId(null);
      Alert.alert(
        'Emergency Resolved',
        'School Administration has verified safety and marked this SOS emergency as resolved.'
      );
    });

    return () => {
      unsubscribe();
    };
  }, [sosTriggered, activeAlertId]);

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
          onPress: async () => {
            setSosTriggered(true);

            // Extract assigned parent IDs from student roster
            const parentUserIds = students
              .map((s) => s.parentUserId)
              .filter((id): id is string => Boolean(id));

            const result = await dispatchSOSAlert({
              schoolId: user?.schoolId,
              senderType: 'driver',
              senderId: user?.userId || '07322545-3dfa-48d6-a4db-70c28158e431',
              senderName: user?.name || 'Hilal',
              vehicleName,
              latitude: gpsState.latitude,
              longitude: gpsState.longitude,
              parentUserIds,
            });

            if (result.alertId) {
              setActiveAlertId(result.alertId);
            }

            Alert.alert(
              'SOS Alert Sent',
              `SOS has been sent! Emergency distress signal transmitted to School Administration and all ${students.length} parents on this route. Only School Admin can resolve this emergency.`
            );
          },
        },
      ]
    );
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
