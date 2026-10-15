import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChildOption {
  id: string;
  name: string;
  busLabel: string;
}

interface ChildSelectorPillsProps {
  options: ChildOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const ChildSelectorPills: React.FC<ChildSelectorPillsProps> = ({
  options,
  selectedId,
  onSelect,
}) => {
  return (
    <View style={styles.chipsRow}>
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            style={[styles.chip, isSelected && styles.activeChip]}
            onPress={() => onSelect(option.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name="person"
              size={13}
              color={isSelected ? '#FFFFFF' : '#64748B'}
            />
            <Text style={[styles.chipText, isSelected && styles.activeChipText]}>
              {option.name} ({option.busLabel})
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  activeChip: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
});
