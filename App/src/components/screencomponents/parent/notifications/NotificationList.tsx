import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

export interface NotificationItemData {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'proximity' | 'trip_start' | 'dropped_off' | 'picked_up' | 'notice' | 'alert';
  isRead: boolean;
}

interface NotificationListProps {
  notifications: NotificationItemData[];
}

export const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const getIconConfig = (type: NotificationItemData['type']) => {
    switch (type) {
      case 'proximity':
        return {
          icon: 'location' as const,
          bgColor: '#EBF4FF',
          iconColor: '#007AFF',
          lineColor: '#60A5FA',
        };
      case 'trip_start':
        return {
          icon: 'bus' as const,
          bgColor: '#E6F8EE',
          iconColor: '#12B76A',
          lineColor: '#34D399',
        };
      case 'dropped_off':
        return {
          icon: 'school' as const,
          bgColor: '#F3E8FF',
          iconColor: '#8B5CF6',
          lineColor: '#C084FC',
        };
      case 'picked_up':
        return {
          icon: 'checkmark' as const,
          bgColor: '#E6F8EE',
          iconColor: '#12B76A',
          lineColor: '#34D399',
        };
      case 'notice':
        return {
          icon: 'chatbubble' as const,
          bgColor: '#FEF3C7',
          iconColor: '#F59E0B',
          lineColor: '#FBBF24',
        };
      case 'alert':
        return {
          icon: 'warning' as const,
          bgColor: '#FEE2E2',
          iconColor: '#EF4444',
          lineColor: '#F87171',
        };
      default:
        return {
          icon: 'notifications' as const,
          bgColor: '#EBF4FF',
          iconColor: '#007AFF',
          lineColor: '#93C5FD',
        };
    }
  };

  return (
    <View style={styles.container}>
      {notifications.map((item, index) => {
        const config = getIconConfig(item.type);
        const isFirst = index === 0;

        return (
          <View key={item.id} style={styles.itemWrapper}>
            <TouchableOpacity
              style={[styles.card, isFirst && styles.firstCardAccent]}
              activeOpacity={0.8}
            >
              {/* Left Circular Icon Badge */}
              <View style={[styles.iconCircle, { backgroundColor: config.bgColor }]}>
                <Ionicons name={config.icon} size={20} color={config.iconColor} />
              </View>

              {/* Main Content */}
              <View style={styles.contentCol}>
                <View style={styles.titleRow}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  {!item.isRead && <View style={styles.unreadDot} />}
                </View>

                <Text style={styles.itemBody}>{item.body}</Text>

                <View style={styles.timeRow}>
                  <Ionicons name="time-outline" size={13} color="#64748B" />
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>

              {/* Right Chevron Button */}
              <View style={styles.chevronButton}>
                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
              </View>
            </TouchableOpacity>

            {/* Connecting Timeline Line underneath icon to next item */}
            {index < notifications.length - 1 && (
              <View style={[styles.connectorLine, { backgroundColor: config.lineColor }]} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  itemWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    ...shadows.card,
    zIndex: 2,
  },
  firstCardAccent: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  contentCol: {
    flex: 1,
    marginRight: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  itemTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginLeft: 6,
  },
  itemBody: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 6,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 11.5,
    color: '#64748B',
    fontWeight: '500',
  },
  chevronButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectorLine: {
    position: 'absolute',
    left: 37,
    bottom: -13,
    width: 2,
    height: 14,
    zIndex: 1,
    opacity: 0.6,
  },
});

export default NotificationList;
