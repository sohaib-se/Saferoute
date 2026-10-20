import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../lib/theme';

export const LoginFooter: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardBox}>
        <View style={styles.iconCircle}>
          <Ionicons name="lock-closed" size={14} color={colors.primary} />
        </View>
        <View style={styles.textCol}>
          <Text style={styles.title}>School-Controlled Security</Text>
          <Text style={styles.subText}>
            Parent credentials are encrypted & distributed by your School Transport Department. For assistance or passkey resets, please reach out to your institution desk.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 4,
  },
  cardBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primaryBorder,
    borderRadius: radii.md,
    padding: 14,
    gap: 12,
    ...shadows.subtle,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  textCol: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textHeading,
    marginBottom: 3,
  },
  subText: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    fontWeight: '500',
  },
});

export default LoginFooter;
