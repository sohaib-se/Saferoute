import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { useDriverTrip } from '../../context/DriverTripContext';
import { colors, radii, shadows } from '../../lib/theme';

interface DriverNotificationsScreenProps {
  onBack?: () => void;
}

export const DriverNotificationsScreen: React.FC<DriverNotificationsScreenProps> = ({ onBack }) => {
  const { tripNotifications, markNotificationsAsRead } = useDriverTrip();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = tripNotifications.filter((n) => !n.isRead).length;
  const displayed = filter === 'unread' ? tripNotifications.filter((n) => !n.isRead) : tripNotifications;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'trip_start':
        return { name: 'navigate-circle' as const, bg: '#EFF6FF', color: '#007AFF' };
      case 'attendance':
        return { name: 'checkmark-done-circle' as const, bg: '#ECFDF5', color: '#059669' };
      case 'sos':
        return { name: 'alert-circle' as const, bg: '#FEF2F2', color: '#DC2626' };
      default:
        return { name: 'information-circle' as const, bg: '#FFFBEB', color: '#D97706' };
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Driver Alerts & Logs"
        subtitle="Real-time transit telemetry logs"
        onBack={onBack}
        showNotification={false}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Filter Bar */}
        <View style={styles.filterBar}>
          <View style={styles.tabGroup}>
            <TouchableOpacity
              style={[styles.tabBtn, filter === 'all' && styles.tabBtnActive]}
              onPress={() => setFilter('all')}
              activeOpacity={0.75}
            >
              <Text style={[styles.tabText, filter === 'all' && styles.tabTextActive]}>
                All ({tripNotifications.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, filter === 'unread' && styles.tabBtnActive]}
              onPress={() => setFilter('unread')}
              activeOpacity={0.75}
            >
              <Text style={[styles.tabText, filter === 'unread' && styles.tabTextActive]}>
                Unread ({unreadCount})
              </Text>
            </TouchableOpacity>
          </View>

          {unreadCount > 0 && (
            <TouchableOpacity onPress={markNotificationsAsRead} activeOpacity={0.7}>
              <Text style={styles.markReadText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Notifications List */}
        {displayed.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="notifications-off-outline" size={36} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySub}>You are all caught up on transit alerts.</Text>
          </View>
        ) : (
          displayed.map((item) => {
            const icon = getNotificationIcon(item.type);
            return (
              <View key={item.id} style={[styles.card, !item.isRead && styles.unreadCard]}>
                <View style={[styles.iconBox, { backgroundColor: icon.bg }]}>
                  <Ionicons name={icon.name} size={22} color={icon.color} />
                </View>

                <View style={styles.textCol}>
                  <View style={styles.titleRow}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {!item.isRead && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.itemBody}>{item.body}</Text>
                  <Text style={styles.itemTime}>{item.time}</Text>
                </View>
              </View>
            );
          })
        )}
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
    paddingBottom: 110,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  tabGroup: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: radii.full,
    padding: 3,
  },
  tabBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.full,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
    ...shadows.card,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0F172A',
  },
  markReadText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007AFF',
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#334155',
  },
  emptySub: {
    fontSize: 12,
    color: '#94A3B8',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginBottom: 10,
    ...shadows.card,
  },
  unreadCard: {
    borderColor: '#BFDBFE',
    backgroundColor: '#FAFDFE',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#007AFF',
  },
  itemBody: {
    fontSize: 12,
    color: '#475569',
    marginTop: 3,
    lineHeight: 17,
  },
  itemTime: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 6,
  },
});

export default DriverNotificationsScreen;
