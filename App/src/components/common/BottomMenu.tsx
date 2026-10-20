import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../lib/theme';

export interface TabItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  badge?: number;
  isEmergency?: boolean;
}

interface BottomMenuProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ tabs, activeTab, onTabPress }) => {
  return (
    <View style={styles.floatingWrapper} pointerEvents="box-none">
      <View style={styles.floatingDock}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isEmergency = tab.isEmergency || tab.id === 'sos';

          const iconColor = isEmergency
            ? '#EF4444'
            : isActive
            ? colors.primary
            : '#64748B';

          const labelColor = isEmergency
            ? '#EF4444'
            : isActive
            ? colors.primary
            : '#64748B';

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabPress(tab.id)}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconBox,
                  isActive && (isEmergency ? styles.activeEmergencyIconBox : styles.activeIconBox),
                ]}
              >
                <Ionicons
                  name={tab.icon}
                  size={20}
                  color={iconColor}
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
                  { color: labelColor, fontWeight: isActive || isEmergency ? '800' : '600' },
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>

              {isActive ? (
                <View
                  style={[
                    styles.activeDot,
                    isEmergency && { backgroundColor: '#EF4444' },
                  ]}
                />
              ) : (
                <View style={styles.inactiveDotPlaceholder} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export const TabBar = BottomMenu;

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 14,
    right: 14,
    alignItems: 'center',
    zIndex: 999,
  },
  floatingDock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    ...shadows.floatingDock,
    maxWidth: 440,
    width: '100%',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  iconBox: {
    position: 'relative',
    width: 48,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconBox: {
    backgroundColor: '#EBF4FF',
    borderRadius: 16,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 3,
  },
  activeEmergencyIconBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 3,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: 8,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#007AFF',
    marginTop: 3,
  },
  inactiveDotPlaceholder: {
    width: 4,
    height: 4,
    marginTop: 3,
  },
});

export default BottomMenu;
