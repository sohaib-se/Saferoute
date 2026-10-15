import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { NotificationFilterTabs } from '../../components/screencomponents/parent/notifications/NotificationFilterTabs';
import {
  NotificationList,
  NotificationItemData,
} from '../../components/screencomponents/parent/notifications/NotificationList';

interface ParentNotificationsScreenProps {
  onBack?: () => void;
}

export const ParentNotificationsScreen: React.FC<ParentNotificationsScreenProps> = ({ onBack }) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const [notifications, setNotifications] = useState<NotificationItemData[]>([
    {
      id: 'n-1',
      title: 'Bus Approaching Home Stop',
      body: 'Bus 1 is within 500 meters of your pickup point (Khatme Nabuwat Chowk). Estimated arrival in ~5 minutes.',
      time: '07:18 AM',
      type: 'proximity',
      isRead: false,
    },
    {
      id: 'n-2',
      title: 'Morning Trip Started',
      body: 'Driver Hilal has commenced the morning school pickup route for Bus 1.',
      time: '07:05 AM',
      type: 'trip_start',
      isRead: false,
    },
    {
      id: 'n-3',
      title: 'Safely Dropped Off at School',
      body: 'Ayesha Malik was safely dropped off at City School Main Campus.',
      time: 'Yesterday, 07:55 AM',
      type: 'dropped_off',
      isRead: true,
    },
    {
      id: 'n-4',
      title: 'Child Boarded Van',
      body: 'Ayesha Malik was marked Picked Up by Driver Hilal.',
      time: 'Yesterday, 07:22 AM',
      type: 'picked_up',
      isRead: true,
    },
    {
      id: 'n-5',
      title: 'Driver Notice',
      body: 'Hilal: Minor traffic delay on Ring Road due to road repair. ETA adjusted +5 mins.',
      time: 'Oct 10, 07:12 AM',
      type: 'message',
      isRead: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const displayed = filter === 'unread' ? notifications.filter((n) => !n.isRead) : notifications;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View style={styles.container}>
      <Header title="Trip Alerts & Logs" subtitle="FCM Realtime Push Timeline" onBack={onBack} />

      <NotificationFilterTabs
        filter={filter}
        totalCount={notifications.length}
        unreadCount={unreadCount}
        onFilterChange={setFilter}
        onMarkAllRead={markAllRead}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <NotificationList notifications={displayed} />
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
