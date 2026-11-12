import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { OpenStreetMapLiveView } from '../../components/screencomponents/parent/livetracking/OpenStreetMapLiveView';
import { ChildSelectorPills, ChildRouteOption } from '../../components/screencomponents/parent/livetracking/ChildSelectorPills';
import {
  ParentInAppCallModal,
  ParentActiveCall,
} from '../../components/screencomponents/parent/calldriver/ParentInAppCallModal';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import {
  getAssignedDriverDetails,
  getLiveVehicleLocation,
  isVehicleTripRunning,
  subscribeToLiveVehicleLocation,
  getParentChildren,
  AssignedDriverDetails,
  ChildData,
} from '../../services/parentService';
import { shadows } from '../../lib/theme';

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
  const { user } = useAuth();
  const [activeCall, setActiveCall] = useState<ParentActiveCall | null>(null);
  const [children, setChildren] = useState<ChildData[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string>('');
  const [isTripActive, setIsTripActive] = useState<boolean>(false);

  // Live driver & vehicle details from Supabase
  const [driverInfo, setDriverInfo] = useState<AssignedDriverDetails>({
    driverName: 'Farhan Khan',
    phone: '213124',
    vehicleName: 'Bus 1',
    plateNumber: '12312',
    licenseNumber: 'DL-0312',
    route: 'Ring Road',
  });

  // Live coordinates streamed from driver's broadcast (initial null to avoid dummy display)
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // 1. Initial fetch of parent's children
  useEffect(() => {
    let isMounted = true;
    const fetchChildren = async () => {
      const childList = await getParentChildren(user?.userId, user?.schoolId);
      if (isMounted) {
        setChildren(childList);
        if (childList.length > 0 && !selectedChildId) {
          setSelectedChildId(childList[0].id);
        }
      }
    };
    fetchChildren();
    return () => {
      isMounted = false;
    };
  }, [user]);

  // 2. Active child and corresponding vehicle
  const activeChild = children.find((c) => c.id === selectedChildId) || children[0];
  const targetVehicleName = activeChild?.vehicle ? activeChild.vehicle.split(' (')[0].trim() : 'Bus 1';
  const targetDriverName = activeChild?.driverName || 'Farhan Khan';

  // 3. Dynamic fetch and subscription to the selected child's vehicle location and trip status
  useEffect(() => {
    let isMounted = true;

    const fetchDriverAndLocation = async () => {
      const [details, initialLoc, tripRunning] = await Promise.all([
        getAssignedDriverDetails(targetDriverName, targetVehicleName),
        getLiveVehicleLocation(targetVehicleName),
        isVehicleTripRunning(targetVehicleName),
      ]);

      if (isMounted) {
        setDriverInfo(details);
        const active = Boolean(tripRunning && initialLoc && initialLoc.latitude && initialLoc.longitude);
        setIsTripActive(active);

        if (active && initialLoc) {
          setLocation({
            latitude: initialLoc.latitude,
            longitude: initialLoc.longitude,
          });
        } else {
          setLocation(null);
        }
      }
    };
    fetchDriverAndLocation();

    // Subscribe to real-time location changes
    const unsubscribeLocation = subscribeToLiveVehicleLocation(targetVehicleName, (newLoc) => {
      if (isMounted) {
        if (newLoc && newLoc.latitude && newLoc.longitude) {
          setLocation(newLoc);
          setIsTripActive(true);
        } else {
          setLocation(null);
          setIsTripActive(false);
        }
      }
    });

    // Subscribe to trip lifecycle changes
    const tripChannel = supabase
      .channel(`parent:trips_${targetVehicleName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trips',
          filter: `vehicle_name=eq.${targetVehicleName}`,
        },
        (payload) => {
          if (!isMounted) return;
          const trip = payload.new as any;
          if (trip) {
            const running = trip.overall_status === 'pickup_active' || trip.overall_status === 'dropoff_active';
            setIsTripActive(running);
            if (!running) {
              setLocation(null);
            }
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      unsubscribeLocation();
      supabase.removeChannel(tripChannel);
    };
  }, [targetVehicleName, targetDriverName]);

  const handleStartDriverCall = () => {
    setActiveCall({
      name: driverInfo.driverName,
      role: `Assigned Driver • ${driverInfo.vehicleName}`,
      phone: driverInfo.phone,
      avatarIcon: 'person',
    });
  };

  const childOptions: ChildRouteOption[] = children.map((c) => ({
    id: c.id,
    name: c.name,
    initials: c.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
    busLabel: c.vehicle || 'Bus 1',
  }));

  return (
    <View style={styles.container}>
      {/* 1. Screen Header */}
      <Header
        title="Live Van Tracking"
        subtitle={`${driverInfo.vehicleName} • ${isTripActive ? 'In Transit' : 'Trip Not Started'}`}
        onBack={onBack}
        onNotificationPress={onOpenNotifications}
      />

      {/* 2. Full Width and Full Height Google-Tile Leaflet Map */}
      <View style={styles.mapSection}>
        <OpenStreetMapLiveView
          vehicleName={driverInfo.vehicleName}
          driverName={driverInfo.driverName}
          latitude={location?.latitude ?? 34.0100649}
          longitude={location?.longitude ?? 71.6738585}
          isTripActive={isTripActive}
        />

        {/* Top Overlay: Child Selector Pills (if multiple children) */}
        {childOptions.length > 1 && (
          <View style={styles.topSelectorOverlay}>
            <ChildSelectorPills
              options={childOptions}
              selectedId={selectedChildId}
              onSelect={setSelectedChildId}
            />
          </View>
        )}

        {/* Top Status Pill: Indicates Trip Status */}
        <View style={styles.tripStatusPill}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isTripActive ? '#10B981' : '#94A3B8' },
            ]}
          />
          <Text style={styles.tripStatusText}>
            {isTripActive
              ? `${driverInfo.vehicleName} is currently in transit`
              : 'Trip not started yet • Waiting for driver'}
          </Text>
        </View>

        {/* Floating Call Driver Button */}
        <TouchableOpacity
          style={styles.floatingCallBtn}
          onPress={handleStartDriverCall}
          activeOpacity={0.85}
        >
          <Ionicons name="call" size={16} color="#FFFFFF" />
          <Text style={styles.floatingCallText}>Call Driver</Text>
        </TouchableOpacity>
      </View>

      {/* 3. In-App VoIP Call Modal Popup */}
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
    backgroundColor: '#F8FAFC',
  },
  mapSection: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  topSelectorOverlay: {
    position: 'absolute',
    top: 10,
    left: 14,
    right: 14,
    zIndex: 10,
  },
  tripStatusPill: {
    position: 'absolute',
    top: 14,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.card,
    zIndex: 9,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tripStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  floatingCallBtn: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
    ...shadows.card,
    zIndex: 10,
  },
  floatingCallText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default ParentLiveTrackingScreen;
