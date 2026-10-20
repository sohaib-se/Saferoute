import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { DriverProfileHero } from '../../components/screencomponents/driver/profile/DriverProfileHero';
import { DriverPersonalInfoCard } from '../../components/screencomponents/driver/profile/DriverPersonalInfoCard';
import { DriverAssignmentsList } from '../../components/screencomponents/driver/profile/DriverAssignmentsList';
import { ProfileSettingsSection } from '../../components/screencomponents/parent/profile/ProfileSettingsSection';
import { ForcePasswordChangeModal } from '../../components/screencomponents/driver/profile/ForcePasswordChangeModal';
import { useAuth } from '../../context/AuthContext';
import { useDriverTrip } from '../../context/DriverTripContext';
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

  const handleEditProfile = () => {
    Alert.alert(
      'Administrative Scoping',
      'Driver credentials, route assignments, and vehicle registrations are managed strictly by School Administration (REQ-D1.3).'
    );
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
        {/* 1. Profile Hero with Galaxy Banner, Avatar & Name */}
        <DriverProfileHero
          name={user?.name || 'Hilal'}
          phone={user?.phone || '03124124'}
          onEdit={handleEditProfile}
        />

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
                Change temporary password issued by transport office (REQ-D1.2).
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
        onClose={() => setShowPasswordModal(false)}
        onSubmit={(newPass) => completePasswordChange(newPass)}
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
