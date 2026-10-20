import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../../../../lib/theme';

export type RosterFilterType = 'all' | 'waiting' | 'picked' | 'dropped' | 'absent';

interface RosterSearchBarProps {
  query: string;
  onChangeQuery: (text: string) => void;
  activeFilter?: RosterFilterType;
  onSelectFilter?: (filter: RosterFilterType) => void;
  counts?: {
    all: number;
    waiting: number;
    picked: number;
    dropped: number;
    absent: number;
  };
}

export const RosterSearchBar: React.FC<RosterSearchBarProps> = ({
  query,
  onChangeQuery,
  activeFilter = 'all',
  onSelectFilter,
  counts,
}) => {
  const filterTabs: Array<{ id: RosterFilterType; label: string; count?: number }> = [
    { id: 'all', label: 'All Stops', count: counts?.all },
    { id: 'waiting', label: 'Pending', count: counts?.waiting },
    { id: 'picked', label: 'Onboard', count: counts?.picked },
    { id: 'dropped', label: 'Dropped', count: counts?.dropped },
    { id: 'absent', label: 'Absent', count: counts?.absent },
  ];

  return (
    <View style={styles.container}>
      {/* Search Bar Input */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#64748B" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search student, stop address, or parent..."
          placeholderTextColor="#94A3B8"
          value={query}
          onChangeText={onChangeQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => onChangeQuery('')} style={styles.clearBtn}>
            <Ionicons name="close-circle" size={17} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Pills */}
      {onSelectFilter && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => onSelectFilter(tab.id)}
                style={[styles.pill, isActive && styles.activePill]}
                activeOpacity={0.75}
              >
                <Text style={[styles.pillText, isActive && styles.activePillText]}>
                  {tab.label}
                  {tab.count !== undefined ? ` (${tab.count})` : ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    paddingHorizontal: 12,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
  },
  clearBtn: {
    padding: 4,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    paddingVertical: 2,
  },
  pill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.full,
  },
  activePill: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  activePillText: {
    color: '#FFFFFF',
  },
});

export default RosterSearchBar;
