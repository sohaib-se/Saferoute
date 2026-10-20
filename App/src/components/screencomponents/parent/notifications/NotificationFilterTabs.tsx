import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationFilterTabsProps {
  filter: 'all' | 'unread';
  totalCount: number;
  unreadCount: number;
  onFilterChange: (f: 'all' | 'unread') => void;
  onMarkAllRead: () => void;
}

export const NotificationFilterTabs: React.FC<NotificationFilterTabsProps> = ({
  filter,
  totalCount,
  unreadCount,
  onFilterChange,
  onMarkAllRead,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftPills}>
        <TouchableOpacity
          style={[styles.pill, filter === 'all' ? styles.activePill : styles.inactivePill]}
          onPress={() => onFilterChange('all')}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.pillText, filter === 'all' ? styles.activeText : styles.inactiveText]}
          >
            All ({totalCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.pill, filter === 'unread' ? styles.activePill : styles.inactivePill]}
          onPress={() => onFilterChange('unread')}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.pillText, filter === 'unread' ? styles.activeText : styles.inactiveText]}
          >
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onMarkAllRead} style={styles.markReadPill} activeOpacity={0.75}>
        <Ionicons name="checkmark" size={15} color="#007AFF" />
        <Text style={styles.markReadText}>Mark all read</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  leftPills: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  inactivePill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6EFF7',
  },
  pillText: {
    fontSize: 12.5,
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  inactiveText: {
    color: '#64748B',
    fontWeight: '600',
  },
  markReadPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EBF4FF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  markReadText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#007AFF',
  },
});

export default NotificationFilterTabs;
