import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '../../components/common/Header';
import { DriverProfileHeader } from '../../components/screencomponents/driver/profile/DriverProfileHeader';
import { DriverKYCBanner } from '../../components/screencomponents/driver/profile/DriverKYCBanner';
import { DriverAssignmentsBox } from '../../components/screencomponents/driver/profile/DriverAssignmentsBox';
import { DriverSecurityActions } from '../../components/screencomponents/driver/profile/DriverSecurityActions';
import { useAuth } from '../../context/AuthContext';

export const DriverProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handlePasswordChange = () => {
    Alert.alert(
      'Change Password',
      'A password change request token has been sent to your verified registered phone.'
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Driver Profile" subtitle="Account & Vehicle Verification" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <DriverProfileHeader
          name={user?.name || 'Hilal'}
          phone={user?.phone || '03124124'}
        />

        <DriverKYCBanner />

        <DriverAssignmentsBox
          vehicle={user?.profile?.vehicle || 'Bus 1 (ICT-4921)'}
          route={user?.profile?.route || 'Morning Sector G-10'}
          license={user?.profile?.licenseNumber || 'DL-32412'}
          loginId={user?.loginId || '9584'}
        />

        <DriverSecurityActions
          onChangePassword={handlePasswordChange}
          onLogout={logout}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
});
