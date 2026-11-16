import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';
import { isVehicleTripRunning, subscribeToLiveVehicleLocation } from '../../../../services/parentService';
import { supabase } from '../../../../lib/supabase';

interface BusLiveStatusCardProps {
  vehicleName: string;
  driverName: string;
  onTrackPress: () => void;
}

export const BusLiveStatusCard: React.FC<BusLiveStatusCardProps> = ({
  vehicleName,
  driverName,
  onTrackPress,
}) => {
  const [isLive, setIsLive] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const cleanName = vehicleName ? vehicleName.split(' (')[0].trim() : '';

  useEffect(() => {
    let isMounted = true;
    if (!cleanName) {
      setIsChecking(false);
      return;
    }

    const checkLiveStatus = async () => {
      try {
        const live = await isVehicleTripRunning(cleanName);
        if (isMounted) setIsLive(live);
      } catch {
        if (isMounted) setIsLive(false);
      } finally {
        if (isMounted) setIsChecking(false);
      }
    };

    checkLiveStatus();

    // Subscribe to realtime location changes
    const unsubLocation = subscribeToLiveVehicleLocation(cleanName, (loc) => {
      if (!isMounted) return;
      if (loc && loc.latitude && loc.longitude) {
        setIsLive(true);
      }
    });

    // Subscribe to realtime trip status changes
    const tripChannel = supabase
      .channel(`live_status_card_trips_${cleanName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trips',
          filter: `vehicle_name=eq.${cleanName}`,
        },
        (payload) => {
          if (!isMounted) return;
          const newTrip = payload.new as any;
          if (newTrip) {
            const running =
              newTrip.overall_status === 'pickup_active' ||
              newTrip.overall_status === 'dropoff_active';
            setIsLive(running);
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      unsubLocation();
      supabase.removeChannel(tripChannel);
    };
  }, [cleanName]);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.busIconCircle}>
          <Ionicons name="bus" size={22} color={colors.primary} />
        </View>
        <View style={styles.busInfoCol}>
          <Text style={styles.busName}>{cleanName || vehicleName}</Text>
          <Text style={styles.driverLabel}>
            Driver: <Text style={styles.driverName}>{driverName}</Text>
          </Text>
        </View>
        {isChecking ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <View style={[styles.statusBadge, isLive ? styles.liveBadge : styles.offlineBadge]}>
            <View style={[styles.statusDot, isLive ? styles.liveDot : styles.offlineDot]} />
            <Text style={[styles.statusText, isLive ? styles.liveText : styles.offlineText]}>
              {isLive ? 'BUS IS LIVE' : 'BUS OFFLINE'}
            </Text>
          </View>
        )}
      </View>
      {isLive && (
        <TouchableOpacity style={styles.trackButton} onPress={onTrackPress} activeOpacity={0.8}>
          <Ionicons name="navigate" size={16} color="#FFFFFF" />
          <Text style={styles.trackButtonText}>Track Live Location →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginBottom: 14,
    ...shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  busIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  busInfoCol: {
    flex: 1,
  },
  busName: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textHeading,
    letterSpacing: -0.2,
  },
  driverLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  driverName: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.full,
    borderWidth: 1,
    gap: 5,
  },
  liveBadge: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  offlineBadge: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  liveDot: {
    backgroundColor: '#10B981',
  },
  offlineDot: {
    backgroundColor: '#94A3B8',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  liveText: {
    color: '#059669',
  },
  offlineText: {
    color: '#94A3B8',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 11,
    borderRadius: radii.md,
    gap: 7,
    marginTop: 14,
  },
  trackButtonText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default BusLiveStatusCard;
