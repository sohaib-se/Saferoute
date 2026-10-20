import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface ChildRouteOption {
  id: string;
  name: string;
  initials: string;
  busLabel: string;
}

interface ChildSelectorPillsProps {
  options: ChildRouteOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const ChildSelectorPills: React.FC<ChildSelectorPillsProps> = ({
  options,
  selectedId,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Select Student Route</Text>
      <View style={styles.pillsRow}>
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              style={[styles.pill, isSelected ? styles.activePill : styles.inactivePill]}
              onPress={() => onSelect(option.id)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.avatarCircle,
                  isSelected ? styles.avatarCircleActive : styles.avatarCircleInactive,
                ]}
              >
                <Text
                  style={[
                    styles.avatarText,
                    isSelected ? styles.avatarTextActive : styles.avatarTextInactive,
                  ]}
                >
                  {option.initials}
                </Text>
              </View>

              <View style={styles.textColumn}>
                <Text
                  style={[styles.childName, isSelected ? styles.childNameActive : styles.childNameInactive]}
                  numberOfLines={1}
                >
                  {option.name}
                </Text>
                <Text
                  style={[styles.busName, isSelected ? styles.busNameActive : styles.busNameInactive]}
                  numberOfLines={1}
                >
                  {option.busLabel}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
    marginLeft: 2,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 24,
  },
  activePill: {
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  inactivePill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6EFF7',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarCircleActive: {
    backgroundColor: '#FFFFFF',
  },
  avatarCircleInactive: {
    backgroundColor: '#EBF4FF',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '800',
  },
  avatarTextActive: {
    color: '#007AFF',
  },
  avatarTextInactive: {
    color: '#007AFF',
  },
  textColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  childName: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  childNameActive: {
    color: '#FFFFFF',
  },
  childNameInactive: {
    color: '#0F172A',
  },
  busName: {
    fontSize: 11,
    marginTop: 2,
  },
  busNameActive: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },
  busNameInactive: {
    color: '#64748B',
    fontWeight: '500',
  },
});

export default ChildSelectorPills;
