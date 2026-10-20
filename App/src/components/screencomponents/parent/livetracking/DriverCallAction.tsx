import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';

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
      activeOpacity={0.85}
    >
      <Ionicons name="call" size={17} color="#FFFFFF" />
      <Text style={styles.callDriverBtnText}>Direct Call Driver ({driverName})</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  callDriverBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: radii.lg,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    ...shadows.primaryGlow,
  },
  callDriverBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
});

export default DriverCallAction;
