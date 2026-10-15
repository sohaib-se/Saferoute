import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DriverSOSBannerProps {
  onPress: () => void;
}

export const DriverSOSBanner: React.FC<DriverSOSBannerProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.fullButton}
      activeOpacity={0.85}
    >
      <View style={styles.iconCircle}>
        <Ionicons name="alert-circle" size={24} color="#DC2626" />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.primaryText}>EMERGENCY SOS</Text>
        <Text style={styles.subText}>Broadcast vehicle incident & GPS to admin</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#FFFFFF" opacity={0.7} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fullButton: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    marginVertical: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  labelContainer: {
    flex: 1,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  subText: {
    color: '#FEE2E2',
    fontSize: 11,
    marginTop: 2,
  },
});

export default DriverSOSBanner;
