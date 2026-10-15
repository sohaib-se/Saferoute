import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RosterSearchBarProps {
  query: string;
  onChangeQuery: (text: string) => void;
  placeholder?: string;
}

export const RosterSearchBar: React.FC<RosterSearchBarProps> = ({
  query,
  onChangeQuery,
  placeholder = 'Search by student name or stop address...',
}) => {
  return (
    <View style={styles.searchBar}>
      <Ionicons name="search" size={18} color="#94A3B8" />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={query}
        onChangeText={onChangeQuery}
      />
      {query ? (
        <TouchableOpacity onPress={() => onChangeQuery('')}>
          <Ionicons name="close-circle" size={18} color="#94A3B8" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
});

export default RosterSearchBar;
