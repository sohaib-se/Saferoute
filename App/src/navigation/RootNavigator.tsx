import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { DriverTripProvider } from '../context/DriverTripContext';
import { LoginScreen } from '../screens/LoginScreen';
import { BottomMenu, TabItem, TabBar } from '../components/common/BottomMenu';
import { colors } from '../lib/theme';

// Driver Screens
import { DriverDashboardScreen } from '../screens/driver/DriverDashboardScreen';
import { DriverRosterScreen } from '../screens/driver/DriverRosterScreen';
import { DriverCallParentScreen } from '../screens/driver/DriverCallParentScreen';
import { DriverNotificationsScreen } from '../screens/driver/DriverNotificationsScreen';
import { DriverSOSScreen } from '../screens/driver/DriverSOSScreen';
import { DriverProfileScreen } from '../screens/driver/DriverProfileScreen';

// Parent Screens
import { ParentDashboardScreen } from '../screens/parent/ParentDashboardScreen';
import { ParentLiveTrackingScreen } from '../screens/parent/ParentLiveTrackingScreen';
import { ParentNotificationsScreen } from '../screens/parent/ParentNotificationsScreen';
import { ParentCallDriverScreen } from '../screens/parent/ParentCallDriverScreen';
import { ParentSOSScreen } from '../screens/parent/ParentSOSScreen';
import { ParentProfileScreen } from '../screens/parent/ParentProfileScreen';

export const RootNavigator: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Navigation states
  const [driverTab, setDriverTab] = useState('dashboard');
  const [parentTab, setParentTab] = useState('dashboard');
  const [isDriverSOSOpen, setIsDriverSOSOpen] = useState(false);
  const [isParentSOSOpen, setIsParentSOSOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setDriverTab('dashboard');
      setParentTab('dashboard');
      setIsDriverSOSOpen(false);
      setIsParentSOSOpen(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Connecting to SafeRoute...</Text>
      </View>
    );
  }

  // Not authenticated -> Show Login screen
  if (!isAuthenticated || !user) {
    return <LoginScreen />;
  }

  // ==========================================
  // 1. DRIVER PORTAL (Identical 5-Tab Layout to Parent)
  // ==========================================
  if (user.role === 'driver') {
    const driverTabs: TabItem[] = [
      { id: 'dashboard', label: 'Dashboard', icon: 'speedometer-outline' },
      { id: 'roster', label: 'Roster', icon: 'list-outline' },
      { id: 'sos', label: 'SOS', icon: 'alert-circle', isEmergency: true },
      { id: 'call', label: 'Call Parent', icon: 'call-outline' },
      { id: 'profile', label: 'Profile', icon: 'person-outline' },
    ];

    const handleDriverTabPress = (tabId: string) => {
      if (tabId === 'sos') {
        setIsDriverSOSOpen(true);
      } else {
        setIsDriverSOSOpen(false);
        setDriverTab(tabId);
      }
    };

    if (isDriverSOSOpen) {
      return (
        <DriverTripProvider>
          <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.screenBody}>
              <DriverSOSScreen
                onBack={() => setIsDriverSOSOpen(false)}
                onOpenNotifications={() => {
                  setIsDriverSOSOpen(false);
                  setDriverTab('notifications');
                }}
              />
            </View>
            <TabBar
              tabs={driverTabs}
              activeTab="sos"
              onTabPress={handleDriverTabPress}
            />
          </SafeAreaView>
        </DriverTripProvider>
      );
    }

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
          return (
            <DriverRosterScreen
              onBack={() => setDriverTab('dashboard')}
              onOpenNotifications={() => setDriverTab('notifications')}
            />
          );
        case 'call':
          return (
            <DriverCallParentScreen
              onBack={() => setDriverTab('dashboard')}
              onOpenNotifications={() => setDriverTab('notifications')}
            />
          );
        case 'notifications':
          return <DriverNotificationsScreen onBack={() => setDriverTab('dashboard')} />;
        case 'profile':
          return (
            <DriverProfileScreen
              onOpenNotifications={() => setDriverTab('notifications')}
            />
          );
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
      <DriverTripProvider>
        <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom']}>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
          <View style={styles.screenBody}>{renderDriverScreen()}</View>
          <TabBar
            tabs={driverTabs}
            activeTab={driverTab}
            onTabPress={handleDriverTabPress}
          />
        </SafeAreaView>
      </DriverTripProvider>
    );
  }

  // ==========================================
  // 2. PARENT PORTAL
  // ==========================================
  const parentTabs: TabItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home-outline' },
    { id: 'tracking', label: 'Live Track', icon: 'navigate-outline' },
    { id: 'sos', label: 'SOS', icon: 'alert-circle', isEmergency: true },
    { id: 'call', label: 'Contact', icon: 'call-outline' },
    { id: 'profile', label: 'Profile', icon: 'person-outline' },
  ];

  const handleParentTabPress = (tabId: string) => {
    if (tabId === 'sos') {
      setIsParentSOSOpen(true);
    } else {
      setIsParentSOSOpen(false);
      setParentTab(tabId);
    }
  };

  if (isParentSOSOpen) {
    return (
      <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <View style={styles.screenBody}>
          <ParentSOSScreen
            onBack={() => setIsParentSOSOpen(false)}
            onOpenNotifications={() => {
              setIsParentSOSOpen(false);
              setParentTab('notifications');
            }}
          />
        </View>
        <TabBar
          tabs={parentTabs}
          activeTab="sos"
          onTabPress={handleParentTabPress}
        />
      </SafeAreaView>
    );
  }

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
            onOpenNotifications={() => setParentTab('notifications')}
          />
        );
      case 'notifications':
        return <ParentNotificationsScreen onBack={() => setParentTab('dashboard')} />;
      case 'call':
        return (
          <ParentCallDriverScreen
            onBack={() => setParentTab('dashboard')}
            onOpenNotifications={() => setParentTab('notifications')}
          />
        );
      case 'profile':
        return (
          <ParentProfileScreen
            onOpenNotifications={() => setParentTab('notifications')}
          />
        );
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
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View style={styles.screenBody}>{renderParentScreen()}</View>
      <TabBar tabs={parentTabs} activeTab={parentTab} onTabPress={handleParentTabPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenBody: {
    flex: 1,
  },
});

export default RootNavigator;
