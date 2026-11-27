import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '../../components/common/Header';
import { ParentSOSBeacon } from '../../components/screencomponents/parent/sos/ParentSOSBeacon';
import { useAuth } from '../../context/AuthContext';
import { dispatchSOSAlert, getActiveSOSAlert, subscribeToSOSResolution } from '../../services/sosService';
import { getParentChildren, isVehicleTripRunning } from '../../services/parentService';
import { supabase } from '../../lib/supabase';

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
  const [isTripActive, setIsTripActive] = useState<boolean>(false);

  // Check if assigned child's trip or school vehicle trip is active
  useEffect(() => {
    let isMounted = true;

    const checkTripStatus = async () => {
      try {
        const children = await getParentChildren(user?.userId, user?.name, user?.schoolId);
        const targetVehicle = children?.[0]?.vehicle || user?.profile?.bus || '';

        if (targetVehicle) {
          const isRunning = await isVehicleTripRunning(targetVehicle);
          if (isRunning) {
            if (isMounted) setIsTripActive(true);
            return;
          }
        }

        // Fallback: check if any trip in the school is active
        if (user?.schoolId) {
          const { data: activeTrips } = await supabase
            .from('trips')
            .select('id, overall_status')
            .eq('school_id', user.schoolId)
            .in('overall_status', ['pickup_active', 'dropoff_active'])
            .limit(1);

          if (isMounted) {
            setIsTripActive(Boolean(activeTrips && activeTrips.length > 0));
          }
        } else {
          if (isMounted) setIsTripActive(false);
        }
      } catch (err) {
        console.warn('Error checking trip status for parent SOS:', err);
      }
    };

    checkTripStatus();

    // Subscribe to real-time trip lifecycle updates
    const channel = supabase
      .channel(`parent:sos_trip_status_${user?.userId || 'all'}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'trips' },
        () => {
          checkTripStatus();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [user]);

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
    if (!isTripActive) {
      Alert.alert(
        'SOS Disabled',
        'Parent Emergency SOS is only active while your child\'s school bus trip is in progress. The beacon will activate automatically once the driver starts the trip.'
      );
      return;
    }

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
              senderId: user?.userId || '',
              senderName: user?.name || '',
              vehicleName: user?.profile?.bus || '',
              latitude: null,
              longitude: null,
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
          isTripActive={isTripActive}
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
