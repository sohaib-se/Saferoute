import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '../../components/common/Header';
import { ParentProfileHero } from '../../components/screencomponents/parent/profile/ParentProfileHero';
import { ParentPersonalInfoCard } from '../../components/screencomponents/parent/profile/ParentPersonalInfoCard';
import { RegisteredChildrenList } from '../../components/screencomponents/parent/profile/RegisteredChildrenList';
import { ProfileSettingsSection } from '../../components/screencomponents/parent/profile/ProfileSettingsSection';
import { useAuth } from '../../context/AuthContext';

interface ParentProfileScreenProps {
  onOpenNotifications?: () => void;
}

export const ParentProfileScreen: React.FC<ParentProfileScreenProps> = ({
  onOpenNotifications,
}) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out from SafeRoute Parent Portal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert(
      'Edit Profile',
      'To update student or guardian profile details, please contact school administration.'
    );
  };

  return (
    <View style={styles.container}>
      {/* Modern Floating Header matching bottom dock */}
      <Header
        title="Guardian Profile"
        subtitle="Account & Profile Details"
        showLogout={true}
        onNotificationPress={onOpenNotifications}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 1. Hero with Banner, Avatar & Name (profile tags removed) */}
        <ParentProfileHero
          name={user?.name || 'Zeeshan Malik'}
          phone="+92 312 412412"
          onEdit={handleEditProfile}
        />

        {/* 2. Personal Info Grid Card (alternate phone removed) */}
        <ParentPersonalInfoCard
          address="Ghari Rashida"
          email="zeeshan@gmail.com"
          phone="+92 312 412412"
          joinedDate="15 Sep 2024"
          role="Primary Guardian"
        />

        {/* 3. Registered Children List (fixed layout, status tags removed) */}
        <RegisteredChildrenList />

        {/* 4. Settings Section (clean Log out action) */}
        <ProfileSettingsSection onLogout={handleLogout} />
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
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 110, // Clearance for floating bottom dock
  },
});

export default ParentProfileScreen;
