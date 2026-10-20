import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';

interface ParentSOSBannerProps {
  onPress: () => void;
}

export const ParentSOSBanner: React.FC<ParentSOSBannerProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.bannerContainer}
      activeOpacity={0.88}
    >
      <View style={styles.topRow}>
        <View style={styles.badgeLabel}>
          <View style={styles.pulseDot} />
          <Text style={styles.badgeLabelText}>CRITICAL EMERGENCY BEACON</Text>
        </View>
        <View style={styles.rapidTag}>
          <Text style={styles.rapidTagText}>INSTANT DISPATCH</Text>
        </View>
      </View>

      <View style={styles.contentRow}>
        <View style={styles.iconCircle}>
          <Ionicons name="alert-circle" size={26} color="#FFFFFF" />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.primaryText}>EMERGENCY SOS</Text>
          <Text style={styles.subText}>Alert School Security Desk & Transport Head</Text>
        </View>
        <View style={styles.chevronBox}>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: colors.danger,
    borderRadius: radii.xl,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: '#DC2626',
    ...shadows.dangerGlow,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FEE2E2',
  },
  badgeLabelText: {
    color: '#FEE2E2',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  rapidTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.full,
  },
  rapidTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  labelContainer: {
    flex: 1,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  subText: {
    color: '#FEE2E2',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  chevronBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
});

export default ParentSOSBanner;
