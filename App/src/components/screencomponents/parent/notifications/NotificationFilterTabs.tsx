import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
    <View style={styles.filterRow}>
      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.tab, filter === 'all' && styles.activeTab]}
          onPress={() => onFilterChange('all')}
        >
          <Text style={[styles.tabText, filter === 'all' && styles.activeTabText]}>
            All ({totalCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, filter === 'unread' && styles.activeTab]}
          onPress={() => onFilterChange('unread')}
        >
          <Text style={[styles.tabText, filter === 'unread' && styles.activeTabText]}>
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onMarkAllRead}>
        <Text style={styles.markReadText}>Mark all read</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 3,
    gap: 2,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTabText: {
    color: '#0F172A',
    fontWeight: '700',
  },
  markReadText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
});
