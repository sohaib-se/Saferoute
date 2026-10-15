import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { BottomMenu, TabItem } from '../components/common/BottomMenu';

// Driver Screens
import { DriverDashboardScreen } from '../screens/driver/DriverDashboardScreen';
import { DriverRosterScreen } from '../screens/driver/DriverRosterScreen';
import { DriverLiveMapScreen } from '../screens/driver/DriverLiveMapScreen';
import { DriverAttendanceScreen } from '../screens/driver/DriverAttendanceScreen';
import { DriverChatScreen } from '../screens/driver/DriverChatScreen';
import { DriverSOSScreen } from '../screens/driver/DriverSOSScreen';
import { DriverProfileScreen } from '../screens/driver/DriverProfileScreen';

// Parent Screens
import { ParentDashboardScreen } from '../screens/parent/ParentDashboardScreen';
import { ParentLiveTrackingScreen } from '../screens/parent/ParentLiveTrackingScreen';
import { ParentNotificationsScreen } from '../screens/parent/ParentNotificationsScreen';
import { ParentCallDriverScreen } from '../screens/parent/ParentCallDriverScreen';
import { ParentChatScreen } from '../screens/parent/ParentChatScreen';
import { ParentSOSScreen } from '../screens/parent/ParentSOSScreen';
import { ParentProfileScreen } from '../screens/parent/ParentProfileScreen';

export const RootNavigator: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Navigation states
  const [driverTab, setDriverTab] = useState('dashboard');
  const [parentTab, setParentTab] = useState('dashboard');
  const [isDriverSOSOpen, setIsDriverSOSOpen] = useState(false);
  const [isParentSOSOpen, setIsParentSOSOpen] = useState(false);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Connecting to SafeRoute...</Text>
      </View>
    );
  }

  // Not authenticated -> Show Login screen
  if (!isAuthenticated || !user) {
    return <LoginScreen />;
  }

  // ==========================================
  // 1. DRIVER PORTAL
  // ==========================================
  if (user.role === 'driver') {
    if (isDriverSOSOpen) {
      return (
        <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom']}>
          <DriverSOSScreen onBack={() => setIsDriverSOSOpen(false)} />
        </SafeAreaView>
      );
    }

    const driverTabs: TabItem[] = [
      { id: 'dashboard', label: 'Dashboard', icon: 'speedometer-outline' },
      { id: 'roster', label: 'Roster', icon: 'list-outline' },
      { id: 'livemap', label: 'Live Map', icon: 'map-outline' },
      { id: 'attendance', label: 'Attendance', icon: 'checkbox-outline' },
      { id: 'chat', label: 'Messages', icon: 'chatbubbles-outline' },
      { id: 'profile', label: 'Profile', icon: 'person-outline' },
    ];

    const renderDriverScreen = () => {
      switch (driverTab) {
        case 'dashboard':
          return (
            <DriverDashboardScreen
              onNavigateTab={setDriverTab}
              onOpenSOS={() => setIsDriverSOSOpen(true)}
            />
          );
        case 'roster':
          return <DriverRosterScreen onBack={() => setDriverTab('dashboard')} />;
        case 'livemap':
          return <DriverLiveMapScreen onBack={() => setDriverTab('dashboard')} />;
        case 'attendance':
          return <DriverAttendanceScreen onBack={() => setDriverTab('dashboard')} />;
        case 'chat':
          return <DriverChatScreen onBack={() => setDriverTab('dashboard')} />;
        case 'profile':
          return <DriverProfileScreen />;
        default:
          return (
            <DriverDashboardScreen
              onNavigateTab={setDriverTab}
              onOpenSOS={() => setIsDriverSOSOpen(true)}
            />
          );
      }
    };

    return (
      <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom']}>
        <View style={styles.screenBody}>{renderDriverScreen()}</View>
        <BottomMenu tabs={driverTabs} activeTab={driverTab} onTabPress={setDriverTab} />
      </SafeAreaView>
    );
  }

  // ==========================================
  // 2. PARENT PORTAL
  // ==========================================
  if (isParentSOSOpen) {
    return (
      <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom']}>
        <ParentSOSScreen onBack={() => setIsParentSOSOpen(false)} />
      </SafeAreaView>
    );
  }

  const parentTabs: TabItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home-outline' },
    { id: 'tracking', label: 'Live Track', icon: 'navigate-outline' },
    { id: 'notifications', label: 'Alerts', icon: 'notifications-outline', badge: 2 },
    { id: 'call', label: 'Contact', icon: 'call-outline' },
    { id: 'chat', label: 'Messages', icon: 'chatbubble-ellipses-outline' },
    { id: 'profile', label: 'Profile', icon: 'person-outline' },
  ];

  const renderParentScreen = () => {
    switch (parentTab) {
      case 'dashboard':
        return (
          <ParentDashboardScreen
            onNavigateTab={setParentTab}
            onOpenSOS={() => setIsParentSOSOpen(true)}
          />
        );
      case 'tracking':
        return (
          <ParentLiveTrackingScreen
            onBack={() => setParentTab('dashboard')}
            onCallDriver={() => setParentTab('call')}
          />
        );
      case 'notifications':
        return <ParentNotificationsScreen onBack={() => setParentTab('dashboard')} />;
      case 'call':
        return (
          <ParentCallDriverScreen
            onBack={() => setParentTab('dashboard')}
            onOpenChat={() => setParentTab('chat')}
          />
        );
      case 'chat':
        return <ParentChatScreen onBack={() => setParentTab('dashboard')} />;
      case 'profile':
        return <ParentProfileScreen />;
      default:
        return (
          <ParentDashboardScreen
            onNavigateTab={setParentTab}
            onOpenSOS={() => setIsParentSOSOpen(true)}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom']}>
      <View style={styles.screenBody}>{renderParentScreen()}</View>
      <BottomMenu tabs={parentTabs} activeTab={parentTab} onTabPress={setParentTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenBody: {
    flex: 1,
  },
});

export default RootNavigator;
