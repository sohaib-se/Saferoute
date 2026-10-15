import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DriverCallActionProps {
  driverName?: string;
  onPress: () => void;
}

export const DriverCallAction: React.FC<DriverCallActionProps> = ({
  driverName = 'Hilal',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.callDriverBtn}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="call" size={16} color="#FFFFFF" />
      <Text style={styles.callDriverBtnText}>Call Driver ({driverName})</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  callDriverBtn: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  callDriverBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
