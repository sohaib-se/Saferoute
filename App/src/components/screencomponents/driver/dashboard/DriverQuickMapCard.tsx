import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DriverQuickMapCardProps {
  onPress: () => void;
}

export const DriverQuickMapCard: React.FC<DriverQuickMapCardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.mapQuickCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="map" size={24} color="#2563EB" />
      <View style={styles.mapQuickText}>
        <Text style={styles.mapQuickTitle}>Open Live Route Map</Text>
        <Text style={styles.mapQuickSub}>View GPS broadcast channel & upcoming stops</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapQuickCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    gap: 12,
  },
  mapQuickText: {
    flex: 1,
  },
  mapQuickTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E40AF',
  },
  mapQuickSub: {
    fontSize: 11,
    color: '#3B82F6',
    marginTop: 1,
  },
});

export default DriverQuickMapCard;
