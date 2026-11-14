import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { ParentPersonalInfoCard } from '../../components/screencomponents/parent/profile/ParentPersonalInfoCard';
import { RegisteredChildrenList } from '../../components/screencomponents/parent/profile/RegisteredChildrenList';
import { ProfileSettingsSection } from '../../components/screencomponents/parent/profile/ProfileSettingsSection';
import { ForcePasswordChangeModal } from '../../components/screencomponents/driver/profile/ForcePasswordChangeModal';
import { useAuth } from '../../context/AuthContext';
import { getParentProfileData, getParentChildren, ParentProfileData } from '../../services/parentService';
import { updateUserPassword } from '../../services/authService';
import { radii, shadows } from '../../lib/theme';

interface ParentProfileScreenProps {
  onOpenNotifications?: () => void;
}

export const ParentProfileScreen: React.FC<ParentProfileScreenProps> = ({
  onOpenNotifications,
}) => {
  const { user, logout } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

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

  const handlePasswordSubmit = async (newPass: string, currentPass?: string) => {
    const res = await updateUserPassword({
      userId: user?.userId,
      userType: 'parent',
      loginId: user?.loginId,
      phone: profile.phone || user?.phone,
      schoolId: user?.schoolId,
      name: profile.name,
      currentPassword: currentPass,
      newPassword: newPass,
    });

    if (res.success) {
      Alert.alert('Password Updated', 'Your parent account password has been successfully updated in the database.');
      return true;
    } else {
      Alert.alert('Update Failed', res.error || 'Could not update password in database.');
      return false;
    }
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
        {/* 1. Clean Name & Identity Card (No profile or Bg image area) */}
        <View style={styles.nameCard}>
          <View style={styles.roleTag}>
            <Ionicons name="shield-checkmark" size={14} color="#0284C7" />
            <Text style={styles.roleTagText}>Verified Primary Guardian</Text>
          </View>
          <Text style={styles.userNameText}>{profile.name}</Text>
          <Text style={styles.userSubText}>
            Enrolled Child Bus: <Text style={styles.boldSubText}>{profile.bus || 'Bus 1'}</Text>
          </Text>
          <Text style={styles.userPhoneText}>Phone: {profile.phone}</Text>
        </View>

        {/* 2. Personal Info Grid Card */}
        <ParentPersonalInfoCard
          address={profile.address}
          email={profile.email}
          phone={profile.phone}
          joinedDate={profile.joinedDate}
          role={profile.role}
        />

        {/* 3. Password Security Card */}
        <View style={styles.securityCard}>
          <View style={styles.securityLeft}>
            <View style={styles.keyIconCircle}>
              <Ionicons name="key" size={18} color="#007AFF" />
            </View>
            <View style={styles.securityTextCol}>
              <Text style={styles.securityTitle}>Portal Security & Password</Text>
              <Text style={styles.securitySub}>
                Change password to secure your guardian account.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.changePassBtn}
            onPress={() => setShowPasswordModal(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.changePassText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* 4. Registered Children List */}
        <RegisteredChildrenList children={childrenData} />

        {/* 5. Settings Section */}
        <ProfileSettingsSection onLogout={handleLogout} />
      </ScrollView>

      {/* Change Password Modal */}
      <ForcePasswordChangeModal
        visible={showPasswordModal}
        userType="parent"
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
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
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 110, // Clearance for floating bottom dock
  },
  nameCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginBottom: 14,
    ...shadows.card,
  },
  roleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    gap: 5,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  roleTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7',
  },
  userNameText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  userSubText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 2,
    fontWeight: '500',
  },
  boldSubText: {
    fontWeight: '700',
    color: '#1E293B',
  },
  userPhoneText: {
    fontSize: 12.5,
    color: '#64748B',
    fontWeight: '500',
  },
  securityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginBottom: 16,
    ...shadows.card,
  },
  securityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  keyIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  securityTextCol: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  securitySub: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 16,
  },
  changePassBtn: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    borderRadius: radii.md,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePassText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#007AFF',
  },
});

export default ParentProfileScreen;
