import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Header } from '../../components/common/Header';
import { OpenStreetMapLiveView } from '../../components/screencomponents/parent/livetracking/OpenStreetMapLiveView';
import { CurrentTripStatusCard } from '../../components/screencomponents/parent/livetracking/CurrentTripStatusCard';
import { useAuth } from '../../context/AuthContext';
import { useCall } from '../../context/CallContext';
import {
  getAssignedDriverDetailsForParent,
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
  const { startCall } = useCall();
  const [children, setChildren] = useState<ChildData[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string>('');
  const [isTripActive, setIsTripActive] = useState<boolean>(false);

  // Live driver & vehicle details from Supabase
  const [driverInfo, setDriverInfo] = useState<AssignedDriverDetails>({
    driverName: 'Loading Driver...',
    phone: '',
    vehicleName: '',
    plateNumber: '',
    licenseNumber: '',
    route: '',
  });

  // Live coordinates streamed from driver's broadcast (initial null to avoid dummy display)
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // 1. Initial fetch of parent's children
  useEffect(() => {
    let isMounted = true;
    let unsubscribeLocation: (() => void) | null = null;

    const fetchDriverAndChildren = async () => {
      const details = await getAssignedDriverDetailsForParent(
        user?.userId,
        user?.name,
        user?.schoolId,
        user?.profile?.bus
      );
      const childList = await getParentChildren(user?.userId, user?.name, user?.schoolId);
      if (isMounted) {
        setChildren(childList);

        const targetVehicle = details.vehicleName || 'Bus 1';
        unsubscribeLocation = subscribeToLiveVehicleLocation(targetVehicle, (newLoc) => {
          if (isMounted) {
            setLocation(newLoc);
          }
        });
      }
    };
    fetchDriverAndLocation();

    return () => {
      isMounted = false;
      if (unsubscribeLocation) {
        unsubscribeLocation();
      }
    };
  }, [targetVehicleName, targetDriverName]);

  const handleStartDriverCall = () => {
    if (!driverInfo.driverUserId) {
      if (driverInfo.phone && driverInfo.phone !== 'N/A') {
        Linking.openURL(`tel:${driverInfo.phone}`);
      }
      return;
    }
    startCall({
      calleeId: driverInfo.driverUserId,
      calleeRole: 'driver',
      calleeName: driverInfo.driverName,
      studentName: user?.name ? `${user.name}'s child` : 'Child',
      vehicleName: driverInfo.vehicleName,
    });
  };

  const childrenStatusText =
    children.length > 0
      ? children.map((c) => `${c.name} (${c.grade}) • ${c.status}`).join(' | ')
      : driverInfo.driverName && driverInfo.driverName !== 'Loading Driver...'
      ? `Assigned: ${driverInfo.driverName} • ${driverInfo.vehicleName}`
      : 'Fetching enrolled student status...';

  const firstChildAddress =
    children[0]?.stopAddress || 'Khatme Nabuwat Chowk';

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

      {/* 3. Current Status of Trip Card */}
      <View style={styles.statusSection}>
        <CurrentTripStatusCard
          vehicleName={driverInfo.vehicleName}
          vehiclePlate={driverInfo.plateNumber}
          driverName={driverInfo.driverName}
          driverPhone={driverInfo.phone}
          speedKmh={location.speedKmh}
          distanceKm={1.8}
          etaMins={6}
          currentSector="Sector G-10"
          childrenStatusText={childrenStatusText}
          onCallDriver={onCallDriver || handleStartDriverCall}
        />
      </View>
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
