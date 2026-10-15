import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface TabItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  badge?: number;
}

interface BottomMenuProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ tabs, activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            style={styles.tabButton}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <Ionicons
                name={tab.icon}
                size={22}
                color={isActive ? '#2563EB' : '#94A3B8'}
              />
              {tab.badge && tab.badge > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{tab.badge}</Text>
                </View>
              ) : null}
            </View>
            <Text
              style={[
                styles.tabLabel,
                { color: isActive ? '#2563EB' : '#94A3B8', fontWeight: isActive ? '700' : '500' },
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const TabBar = BottomMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
});

export default BottomMenu;
