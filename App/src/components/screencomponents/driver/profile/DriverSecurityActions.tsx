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
      <Text style={styles.sectionTitle}>Security & Account</Text>

      <TouchableOpacity
        style={styles.actionRow}
        onPress={onChangePassword}
        activeOpacity={0.7}
      >
        <Ionicons name="key-outline" size={20} color="#2563EB" />
        <Text style={styles.actionText}>Change Account Password</Text>
        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={onLogout}
        activeOpacity={0.8}
      >
        <Ionicons name="log-out-outline" size={18} color="#DC2626" />
        <Text style={styles.logoutBtnText}>Sign Out of Driver Portal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    gap: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 8,
    gap: 8,
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
  },
});

export default DriverSecurityActions;
