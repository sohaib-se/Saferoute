import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface NotificationItemData {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'proximity' | 'trip_start' | 'picked_up' | 'dropped_off' | 'emergency' | 'message';
  isRead: boolean;
}

interface NotificationListProps {
  notifications: NotificationItemData[];
}

export const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const getIconConfig = (type: NotificationItemData['type']) => {
    switch (type) {
      case 'proximity':
        return { name: 'location', bg: '#EFF6FF', color: '#2563EB' };
      case 'trip_start':
        return { name: 'bus', bg: '#F0FDF4', color: '#059669' };
      case 'picked_up':
        return { name: 'checkmark-circle', bg: '#ECFDF5', color: '#047857' };
      case 'dropped_off':
        return { name: 'school', bg: '#F5F3FF', color: '#7C3AED' };
      case 'emergency':
        return { name: 'alert-circle', bg: '#FEF2F2', color: '#DC2626' };
      case 'message':
        return { name: 'chatbubble-ellipses', bg: '#FFFBEB', color: '#D97706' };
      default:
        return { name: 'notifications', bg: '#F8FAFC', color: '#64748B' };
    }
  };

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Ionicons name="notifications-off-outline" size={36} color="#CBD5E1" />
        <Text style={styles.emptyText}>No notifications in this filter</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {notifications.map((item) => {
        const iconConfig = getIconConfig(item.type);
        return (
          <View
            key={item.id}
            style={[styles.card, !item.isRead && styles.unreadCard]}
          >
            <View style={[styles.iconBox, { backgroundColor: iconConfig.bg }]}>
              <Ionicons
                name={iconConfig.name as any}
                size={20}
                color={iconConfig.color}
              />
            </View>

            <View style={styles.contentCol}>
              <View style={styles.titleRow}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                {!item.isRead && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.body}>{item.body}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    backgroundColor: '#FAFCFF',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    marginLeft: 8,
  },
  body: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 6,
  },
  time: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 8,
  },
});
