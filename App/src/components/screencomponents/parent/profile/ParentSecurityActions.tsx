import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';

interface ParentSecurityActionsProps {
  onChangePassword: () => void;
  onLogout: () => void;
}

export const ParentSecurityActions: React.FC<ParentSecurityActionsProps> = ({
  onChangePassword,
  onLogout,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <Ionicons name="shield-checkmark" size={20} color="#007AFF" style={styles.headerIcon} />
          <Text style={styles.sectionTitle}>Security & Account</Text>
        </View>
      </View>
      <Text style={styles.sectionSubtitle}>Manage credentials and portal access</Text>

      <TouchableOpacity
        style={styles.actionBtn}
        onPress={onChangePassword}
        activeOpacity={0.78}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="key-outline" size={18} color={colors.primary} />
        </View>
        <Text style={styles.actionText}>Change Account Password</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionBtn, styles.logoutBtn]}
        onPress={onLogout}
        activeOpacity={0.78}
      >
        <View style={[styles.iconCircle, styles.logoutIconCircle]}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
        </View>
        <Text style={[styles.actionText, styles.logoutText]}>Sign Out of Parent Portal</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    marginLeft: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    marginRight: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
    marginLeft: 2,
    fontWeight: '500',
  },
  actionBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6EFF7',
    marginBottom: 10,
    ...shadows.card,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 12,
  },
  logoutBtn: {
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
    marginTop: 4,
  },
  logoutIconCircle: {
    backgroundColor: '#FFFFFF',
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '800',
  },
});

export default ParentSecurityActions;
