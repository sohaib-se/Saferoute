import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../components/common/Header';
import { OpenStreetMapLiveView } from '../../components/screencomponents/parent/livetracking/OpenStreetMapLiveView';
import { CurrentTripStatusCard } from '../../components/screencomponents/parent/livetracking/CurrentTripStatusCard';
import {
  ParentInAppCallModal,
  ParentActiveCall,
} from '../../components/screencomponents/parent/calldriver/ParentInAppCallModal';
import { useAuth } from '../../context/AuthContext';
import {
  getAssignedDriverDetails,
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
  const [activeCall, setActiveCall] = useState<ParentActiveCall | null>(null);
  const [children, setChildren] = useState<ChildData[]>([]);

  // Live driver & vehicle details from Supabase
  const [driverInfo, setDriverInfo] = useState<AssignedDriverDetails>({
    driverName: 'Hilal',
    phone: '03124124',
    vehicleName: 'Bus 1',
    plateNumber: 'ICT-4921',
    licenseNumber: 'DL-32412',
    route: 'Morning Route - Sector G-10',
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
    const fetchDriverAndChildren = async () => {
      const details = await getAssignedDriverDetails('Hilal', 'Bus 1');
      const childList = await getParentChildren(user?.userId, user?.schoolId);
      if (isMounted) {
        setDriverInfo(details);
        setChildren(childList);
      }
    };
    fetchDriverAndChildren();

    const unsubscribe = subscribeToLiveVehicleLocation('Bus 1', (newLoc) => {
      if (isMounted) {
        setLocation(newLoc);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [user]);

  const handleStartDriverCall = () => {
    setActiveCall({
      name: driverInfo.driverName,
      role: `Assigned Driver • ${driverInfo.vehicleName}`,
      phone: driverInfo.phone,
      avatarIcon: 'person',
    });
  };

  const childrenStatusText =
    children.length > 0
      ? children.map((c) => `${c.name} (${c.grade}) • ${c.status}`).join(' | ')
      : 'Enrolled: Sohaib Khan (Grade 5 - Sec A)';

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
          onCallDriver={handleStartDriverCall}
        />
      </View>

      {/* 4. In-App VoIP Call Modal Popup */}
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
