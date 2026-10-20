import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { DriverDetailsCard } from '../../components/screencomponents/parent/calldriver/DriverDetailsCard';
import { SchoolDirectoryCard } from '../../components/screencomponents/parent/calldriver/SchoolDirectoryCard';
import {
  ParentInAppCallModal,
  ParentActiveCall,
} from '../../components/screencomponents/parent/calldriver/ParentInAppCallModal';

interface ParentCallDriverScreenProps {
  onBack?: () => void;
  onOpenNotifications?: () => void;
}

export const ParentCallDriverScreen: React.FC<ParentCallDriverScreenProps> = ({
  onBack,
  onOpenNotifications,
}) => {
  const [activeCall, setActiveCall] = useState<ParentActiveCall | null>(null);

  const handleCallDriver = () => {
    setActiveCall({
      name: 'Hilal',
      role: 'Assigned Route Driver • Bus 1',
      phone: '031241242',
      avatarIcon: 'person',
    });
  };

  const handleCallAdmin = () => {
    setActiveCall({
      name: 'School Transport Administration',
      role: 'Official Transport Desk • Head Office',
      phone: '+92 51 111-222-33',
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
          driverName="Hilal"
          phone="031241242"
          vehicleName="Bus 1"
          plateNumber="ICT-4921"
          licenseNumber="DL-32412"
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

