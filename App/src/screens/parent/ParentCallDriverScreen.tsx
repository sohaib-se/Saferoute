import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Alert, Linking } from 'react-native';
import { Header } from '../../components/common/Header';
import { DriverDetailsCard } from '../../components/screencomponents/parent/calldriver/DriverDetailsCard';
import { useAuth } from '../../context/AuthContext';
import { useCall } from '../../context/CallContext';
import { getAssignedDriverDetailsForParent, AssignedDriverDetails } from '../../services/parentService';

interface ParentCallDriverScreenProps {
  onBack?: () => void;
  onOpenNotifications?: () => void;
}

export const ParentCallDriverScreen: React.FC<ParentCallDriverScreenProps> = ({
  onBack,
  onOpenNotifications,
}) => {
  const { user } = useAuth();
  const { startCall } = useCall();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [driverInfo, setDriverInfo] = useState<AssignedDriverDetails>({
    driverName: 'Loading Driver...',
    phone: '...',
    vehicleName: '...',
    plateNumber: '...',
    licenseNumber: '...',
    route: '...',
  });

  useEffect(() => {
    let isMounted = true;
    const loadDetails = async () => {
      setIsLoading(true);
      const res = await getAssignedDriverDetailsForParent(
        user?.userId,
        user?.name,
        user?.schoolId,
        user?.profile?.bus
      );
      if (isMounted) {
        setDriverInfo(res);
        setIsLoading(false);
      }
    };
    loadDetails();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleCallDriver = () => {
    if (!driverInfo.driverUserId) {
      if (driverInfo.phone && driverInfo.phone !== 'N/A') {
        Alert.alert(
          'Driver Call',
          `Direct in-app VoIP connection is unavailable. Would you like to place a cellular phone call to ${driverInfo.phone}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Call Driver', onPress: () => Linking.openURL(`tel:${driverInfo.phone}`) },
          ]
        );
      } else {
        Alert.alert('No Driver Contact', 'No assigned driver phone or VoIP ID found for your student.');
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

  return (
    <View style={styles.container}>
      <Header
        title="Contact Directory"
        subtitle="Call assigned route driver"
        onBack={onBack}
        onNotificationPress={onOpenNotifications}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : (
          /* Card 1: Call Driver */
          <DriverDetailsCard
            driverName={driverInfo.driverName}
            phone={driverInfo.phone}
            vehicleName={driverInfo.vehicleName}
            plateNumber={driverInfo.plateNumber}
            licenseNumber={driverInfo.licenseNumber}
            onCallDriver={handleCallDriver}
          />
        )}
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
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ParentCallDriverScreen;
