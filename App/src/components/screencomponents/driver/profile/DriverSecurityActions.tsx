import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DriverSecurityActionsProps {
  onChangePassword: () => void;
  onLogout: () => void;
}

export const DriverSecurityActions: React.FC<DriverSecurityActionsProps> = ({
  onChangePassword,
  onLogout,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <Ionicons name="shield-checkmark" size={18} color="#007AFF" style={styles.headerIcon} />
          <Text style={styles.sectionTitle}>Security & Account</Text>
        </View>
      </View>
      <Text style={styles.sectionSubtitle}>Manage driver authentication and session</Text>

      <TouchableOpacity
        style={styles.actionRow}
        onPress={onChangePassword}
        activeOpacity={0.75}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="key-outline" size={18} color="#007AFF" />
        </View>
        <Text style={styles.actionText}>Change Account Password</Text>
        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={onLogout}
        activeOpacity={0.78}
      >
        <View style={styles.logoutIconCircle}>
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
        </View>
        <Text style={styles.logoutBtnText}>Sign Out of Driver Portal</Text>
        <Ionicons name="chevron-forward" size={18} color="#DC2626" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
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
    fontSize: 15,
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
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    gap: 12,
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
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 16,
    padding: 14,
    marginTop: 4,
    gap: 12,
  },
  logoutIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtnText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#DC2626',
  },
});

export default DriverSecurityActions;
