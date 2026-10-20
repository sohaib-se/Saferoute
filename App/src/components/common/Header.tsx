import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { colors, radii, shadows } from '../../lib/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogout?: boolean;
  showNotification?: boolean;
  onNotificationPress?: () => void;
  notificationBadgeCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack,
  onBack,
  showLogout = false,
  showNotification = true,
  onNotificationPress,
  notificationBadgeCount = 2,
}) => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.floatingWrapper} pointerEvents="box-none">
      <View style={styles.floatingHeader}>
        {/* Left Section: Back / Brand + Title */}
        <View style={styles.leftRow}>
          {showBack && onBack ? (
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.75}>
              <Ionicons name="arrow-back" size={19} color={colors.textHeading} />
            </TouchableOpacity>
          ) : (
            <View style={styles.brandIconWrapper}>
              <Ionicons
                name={user?.role === 'driver' ? 'bus' : 'shield-checkmark'}
                size={20}
                color={colors.primary}
              />
            </View>
          )}

          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subtitle ? (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            ) : user ? (
              <View style={styles.badgeLine}>
                <View style={styles.onlineDot} />
                <Text style={styles.badgeSubtitle} numberOfLines={1}>
                  {user.name} • {user.role === 'driver' ? 'Driver Portal' : 'Parent Portal'}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Right Section: Notifications + Logout */}
        <View style={styles.rightRow}>
          {showNotification && (
            <TouchableOpacity
              onPress={onNotificationPress}
              style={styles.notificationButton}
              activeOpacity={0.75}
              disabled={!onNotificationPress}
            >
              <Ionicons name="notifications-outline" size={19} color="#0F172A" />
              {notificationBadgeCount > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{notificationBadgeCount}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          )}

          {showLogout && (
            <TouchableOpacity onPress={logout} style={styles.logoutButton} activeOpacity={0.75}>
              <Ionicons name="log-out-outline" size={16} color={colors.danger} />
              <Text style={styles.logoutText}>Exit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingWrapper: {
    paddingHorizontal: 14,
    paddingTop: Platform.OS === 'android' ? 6 : 4,
    paddingBottom: 6,
    zIndex: 90,
  },
  floatingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    ...shadows.floatingDock,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  brandIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#D0E4FF',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  badgeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.emerald,
  },
  badgeSubtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    gap: 4,
  },
  logoutText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.danger,
  },
});

export default Header;
