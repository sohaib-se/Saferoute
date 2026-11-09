import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { DriverDetailsCard } from '../../components/screencomponents/parent/calldriver/DriverDetailsCard';
import { SchoolDirectoryCard } from '../../components/screencomponents/parent/calldriver/SchoolDirectoryCard';
import {
  ParentInAppCallModal,
  ParentActiveCall,
} from '../../components/screencomponents/parent/calldriver/ParentInAppCallModal';
import { useAuth } from '../../context/AuthContext';
import { getAssignedDriverDetails, AssignedDriverDetails } from '../../services/parentService';

interface ParentCallDriverScreenProps {
  onBack?: () => void;
  onOpenNotifications?: () => void;
}

export const ParentCallDriverScreen: React.FC<ParentCallDriverScreenProps> = ({
  onBack,
  onOpenNotifications,
}) => {
  const { user } = useAuth();
  const [activeCall, setActiveCall] = useState<ParentActiveCall | null>(null);

  const [driverInfo, setDriverInfo] = useState<AssignedDriverDetails>({
    driverName: 'Hilal',
    phone: '03124124',
    vehicleName: 'Bus 1',
    plateNumber: 'ICT-4921',
    licenseNumber: 'DL-32412',
    route: 'Morning Route - Sector G-10',
  });

  useEffect(() => {
    let isMounted = true;
    const loadDetails = async () => {
      const res = await getAssignedDriverDetails('Hilal', 'Bus 1');
      if (isMounted) {
        setDriverInfo(res);
      }
    };
    loadDetails();
    return () => {
      isMounted = false;
    };
  }, []);

  const schoolName = user?.profile?.schoolName || 'School Transport Desk';
  const schoolPhone = user?.profile?.schoolPhone || '03001234567';

  const handleCallDriver = () => {
    setActiveCall({
      name: driverInfo.driverName,
      role: `Assigned Route Driver • ${driverInfo.vehicleName}`,
      phone: driverInfo.phone,
      avatarIcon: 'person',
    });
  };

  const handleCallAdmin = () => {
    setActiveCall({
      name: schoolName,
      role: 'Official Transport Desk • Head Office',
      phone: schoolPhone,
      avatarIcon: 'business',
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Contact Directory"
        subtitle="Call assigned driver or school administration"
        onBack={onBack}
        onNotificationPress={onOpenNotifications}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Card 1: Call Driver */}
        <DriverDetailsCard
          driverName={driverInfo.driverName}
          phone={driverInfo.phone}
          vehicleName={driverInfo.vehicleName}
          plateNumber={driverInfo.plateNumber}
          licenseNumber={driverInfo.licenseNumber}
          onCallDriver={handleCallDriver}
        />

        {/* Card 2: Contact Admin */}
        <SchoolDirectoryCard
          onCallAdmin={handleCallAdmin}
        />
      </ScrollView>

      {/* In-App VoIP Call Modal Popup (Identical to Driver Portal) */}
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110, // Dock clearance
  },
});

export default ParentCallDriverScreen;
