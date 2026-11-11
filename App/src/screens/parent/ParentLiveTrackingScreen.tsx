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

  // Live driver & vehicle details from Supabase
  const [driverInfo, setDriverInfo] = useState<AssignedDriverDetails>({
    driverName: 'Loading Driver...',
    phone: '',
    vehicleName: '',
    plateNumber: '',
    licenseNumber: '',
    route: '',
  });

  // Live coordinates streamed from driver's broadcast
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    speedKmh: number;
  }>({
    latitude: 33.6844,
    longitude: 73.0479,
    speedKmh: 35,
  });

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
        setDriverInfo(details);
        setChildren(childList);

        const targetVehicle = details.vehicleName || 'Bus 1';
        unsubscribeLocation = subscribeToLiveVehicleLocation(targetVehicle, (newLoc) => {
          if (isMounted) {
            setLocation(newLoc);
          }
        });
      }
    };
    fetchDriverAndChildren();

    return () => {
      isMounted = false;
      if (unsubscribeLocation) {
        unsubscribeLocation();
      }
    };
  }, [user]);

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
        subtitle={`${driverInfo.vehicleName} • Active GPS Telemetry`}
        onBack={onBack}
        onNotificationPress={onOpenNotifications}
      />

      {/* 2. Full Screen OpenStreetMap Canvas */}
      <View style={styles.mapSection}>
        <OpenStreetMapLiveView
          vehicleName={driverInfo.vehicleName}
          driverName={driverInfo.driverName}
          latitude={location.latitude}
          longitude={location.longitude}
          speedKmh={location.speedKmh}
          distanceKm={1.8}
          schoolName="Allied School Campus"
          homeAddress={firstChildAddress}
        />
      </View>

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
