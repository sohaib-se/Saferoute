import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { DriverPersonalInfoCard } from '../../components/screencomponents/driver/profile/DriverPersonalInfoCard';
import { DriverAssignmentsList } from '../../components/screencomponents/driver/profile/DriverAssignmentsList';
import { ProfileSettingsSection } from '../../components/screencomponents/parent/profile/ProfileSettingsSection';
import { ForcePasswordChangeModal } from '../../components/screencomponents/driver/profile/ForcePasswordChangeModal';
import { useAuth } from '../../context/AuthContext';
import { useDriverTrip } from '../../context/DriverTripContext';
import { updateUserPassword } from '../../services/authService';
import { colors, radii, shadows } from '../../lib/theme';

interface DriverProfileScreenProps {
  onOpenNotifications?: () => void;
}

export const DriverProfileScreen: React.FC<DriverProfileScreenProps> = ({
  onOpenNotifications,
}) => {
  const { user, logout } = useAuth();
  const {
    vehicleName,
    vehiclePlate,
    routeTitle,
    mustChangePassword,
    completePasswordChange,
    tripNotifications,
  } = useDriverTrip();

  const [showPasswordModal, setShowPasswordModal] = useState(mustChangePassword);

  const unreadCount = tripNotifications.filter((n) => !n.isRead).length;

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out from SafeRoute Driver Portal?',
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
      userType: 'driver',
      loginId: user?.loginId,
      phone: user?.phone,
      schoolId: user?.schoolId,
      name: user?.name,
      currentPassword: currentPass,
      newPassword: newPass,
    });

    if (res.success) {
      await completePasswordChange(newPass, currentPass);
      Alert.alert('Password Updated', 'Your driver password has been successfully updated in the database.');
      return true;
    } else {
      Alert.alert('Update Failed', res.error || 'Could not update password in database.');
      return false;
    }
  };

  return (
    <View style={styles.container}>
      {/* Floating Header matching Parent Profile */}
      <Header
        title="Driver Profile"
        subtitle="Account & Vehicle Verification"
        showLogout={true}
        onNotificationPress={onOpenNotifications}
        notificationBadgeCount={unreadCount}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 1. Clean Name & Identity Card (No profile or Bg image area) */}
        <View style={styles.nameCard}>
          <View style={styles.roleTag}>
            <Ionicons name="shield-checkmark" size={14} color="#0284C7" />
            <Text style={styles.roleTagText}>Certified School Driver</Text>
          </View>
          <Text style={styles.userNameText}>{user?.name || 'Hilal'}</Text>
          <Text style={styles.userSubText}>
            Assigned Vehicle: <Text style={styles.boldSubText}>{vehicleName} ({vehiclePlate})</Text>
          </Text>
          <Text style={styles.userPhoneText}>Phone: {user?.phone || '03124124'}</Text>
        </View>

        {/* 2. REQ-D1.3: Personal Info 2-Column Grid Card Scoped to Assigned Vehicle */}
        <DriverPersonalInfoCard
          vehicle={`${vehicleName} (${vehiclePlate})`}
          route={routeTitle}
          license={user?.profile?.licenseNumber || 'DL-32412'}
          licenseType="Heavy Transport (Commercial)"
          loginId={user?.loginId || '9584'}
          phone={user?.phone || '03124124'}
        />

        {/* REQ-D1.2: Password Security Card */}
        <View style={styles.securityCard}>
          <View style={styles.securityLeft}>
            <View style={styles.keyIconCircle}>
              <Ionicons name="key" size={18} color="#007AFF" />
            </View>
            <View style={styles.securityTextCol}>
              <Text style={styles.securityTitle}>Admin-Issued Credentials</Text>
              <Text style={styles.securitySub}>
                Change password to secure your driver account.
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

        {/* 3. Verified Fleet Assignments & Route Details */}
        <DriverAssignmentsList />

        {/* 4. Settings Section with Sign Out */}
        <ProfileSettingsSection onLogout={handleLogout} />
      </ScrollView>

      {/* Force / Change Password Modal */}
      <ForcePasswordChangeModal
        visible={showPasswordModal}
        isFirstLogin={mustChangePassword}
        userType="driver"
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
    paddingBottom: 110,
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
    fontSize: 12.5,
    fontWeight: '800',
    color: '#007AFF',
  },
});

export default DriverProfileScreen;
