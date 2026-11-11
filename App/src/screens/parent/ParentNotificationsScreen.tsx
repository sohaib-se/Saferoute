import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { NotificationFilterTabs } from '../../components/screencomponents/parent/notifications/NotificationFilterTabs';
import {
  NotificationList,
  NotificationItemData,
} from '../../components/screencomponents/parent/notifications/NotificationList';
import { useAuth } from '../../context/AuthContext';
import {
  fetchNotificationsFromDb,
  markNotificationsAsReadInDb,
  subscribeToNotifications,
} from '../../services/notificationService';

interface ParentNotificationsScreenProps {
  onBack?: () => void;
}

export const ParentNotificationsScreen: React.FC<ParentNotificationsScreenProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<NotificationItemData[]>([]);

  useEffect(() => {
    let isMounted = true;
    const loadNotifs = async () => {
      const items = await fetchNotificationsFromDb('parent', user?.userId, user?.schoolId);
      if (isMounted) {
        setNotifications(items);
      }
    };
    loadNotifs();

    const unsubscribe = subscribeToNotifications(
      'parent',
      user?.userId,
      user?.schoolId,
      (newNotif) => {
        if (isMounted) {
          setNotifications((prev) => [
            newNotif,
            ...prev.filter((item) => item.id !== newNotif.id),
          ]);
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [user]);

  const markAllRead = () => {
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);
    markNotificationsAsReadInDb(unreadIds);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const displayed = filter === 'unread' ? notifications.filter((n) => !n.isRead) : notifications;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View style={styles.container}>
      <Header
        title="Trip Alerts & Logs"
        subtitle="Real-time updates from the field"
        onBack={onBack}
        showNotification={true}
        notificationBadgeCount={unreadCount}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <NotificationFilterTabs
          filter={filter}
          totalCount={notifications.length}
          unreadCount={unreadCount}
          onFilterChange={setFilter}
          onMarkAllRead={markAllRead}
        />

        <NotificationList notifications={displayed} />
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110, // Clearance for floating dock
  },
});

export default ParentNotificationsScreen;
