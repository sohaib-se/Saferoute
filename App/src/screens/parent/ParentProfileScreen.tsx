import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '../../components/common/Header';
import { ParentProfileHero } from '../../components/screencomponents/parent/profile/ParentProfileHero';
import { ParentPersonalInfoCard } from '../../components/screencomponents/parent/profile/ParentPersonalInfoCard';
import { RegisteredChildrenList } from '../../components/screencomponents/parent/profile/RegisteredChildrenList';
import { ProfileSettingsSection } from '../../components/screencomponents/parent/profile/ProfileSettingsSection';
import { useAuth } from '../../context/AuthContext';
import { getParentProfileData, getParentChildren, ParentProfileData } from '../../services/parentService';

interface ParentProfileScreenProps {
  onOpenNotifications?: () => void;
}

export const ParentProfileScreen: React.FC<ParentProfileScreenProps> = ({
  onOpenNotifications,
}) => {
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState<ParentProfileData>({
    id: user?.userId || 'parent-1',
    name: user?.name || 'Zeeshan Malik',
    email: 'zeeshan@gmail.com',
    phone: user?.phone || '+92 312 412412',
    address: 'Khatme Nabuwat Chowk, Ghari Rashida',
    joinedDate: '15 Sep 2024',
    role: 'Primary Guardian',
    bus: 'Bus 1',
  });

  const [childrenData, setChildrenData] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const loadProfileAndChildren = async () => {
      const [profRes, kidsRes] = await Promise.all([
        getParentProfileData(user?.userId, user?.phone),
        getParentChildren(user?.userId, user?.name, user?.schoolId),
      ]);

      if (isMounted) {
        setProfile(profRes);
        if (kidsRes.length > 0) {
          const formatted = kidsRes.map((k) => {
            const parts = k.name.trim().split(' ');
            const initials =
              parts.length >= 2
                ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
                : k.name.slice(0, 2).toUpperCase();

            return {
              id: k.id,
              name: k.name,
              initials,
              initialsBg: '#E0F2FE',
              initialsColor: '#0284C7',
              grade: k.grade.split(' - ')[0] || 'Grade 5',
              section: k.grade.split(' - ')[1] || 'Section A',
              rollNumber: k.studentCode,
              busNumber: k.vehicle.split(' ')[0] || 'Bus 1',
              busPlate: k.vehicle.includes('(') ? k.vehicle.split('(')[1].replace(')', '') : 'ICT-4921',
              driverName: k.driverName,
            };
          });
          setChildrenData(formatted);
        }
      }
    };
    loadProfileAndChildren();
    return () => {
      isMounted = false;
    };
  }, [user]);

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
        {/* 1. Hero with Banner, Avatar & Name */}
        <ParentProfileHero
          name={profile.name}
          phone={profile.phone}
          onEdit={handleEditProfile}
        />

        {/* 2. Personal Info Grid Card */}
        <ParentPersonalInfoCard
          address={profile.address}
          email={profile.email}
          phone={profile.phone}
          joinedDate={profile.joinedDate}
          role={profile.role}
        />

        {/* 3. Registered Children List */}
        <RegisteredChildrenList children={childrenData} />

        {/* 4. Settings Section */}
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
