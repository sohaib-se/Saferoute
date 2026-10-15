import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '../../components/common/Header';
import { ParentProfileHeader } from '../../components/screencomponents/parent/profile/ParentProfileHeader';
import { TransportBillingCard } from '../../components/screencomponents/parent/profile/TransportBillingCard';
import { RegisteredChildrenCard } from '../../components/screencomponents/parent/profile/RegisteredChildrenCard';
import { ParentResidenceCard } from '../../components/screencomponents/parent/profile/ParentResidenceCard';
import { ParentSecurityActions } from '../../components/screencomponents/parent/profile/ParentSecurityActions';
import { useAuth } from '../../context/AuthContext';

export const ParentProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handlePasswordChange = () => {
    Alert.alert(
      'Password Reset',
      'A secure password reset link has been dispatched to your registered email address.'
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Guardian Profile" subtitle="Account & Transport Billing" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ParentProfileHeader
          name={user?.name || 'Zeeshan Malik'}
          phone={user?.phone || '312412412'}
        />

        <TransportBillingCard
          amount="Rs. 5,000"
          month="October 2026"
          status="PAID"
        />

        <RegisteredChildrenCard />

        <ParentResidenceCard
          address={user?.profile?.address || 'Khatme Nabuwat Chowk, Ghari Rashida'}
          email={user?.profile?.email || 'zeeshan@gmail.com'}
          loginId={user?.loginId || '1201'}
        />

        <ParentSecurityActions
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
