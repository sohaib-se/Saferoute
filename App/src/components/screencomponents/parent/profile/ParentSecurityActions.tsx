import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={onChangePassword}
        activeOpacity={0.7}
      >
        <Ionicons name="key-outline" size={18} color="#2563EB" />
        <Text style={styles.actionText}>Change Account Password</Text>
        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionBtn, styles.logoutBtn]}
        onPress={onLogout}
        activeOpacity={0.7}
      >
        <Ionicons name="log-out-outline" size={18} color="#DC2626" />
        <Text style={[styles.actionText, styles.logoutText]}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 24,
  },
  actionBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 12,
  },
  logoutBtn: {
    borderColor: '#FEE2E2',
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '700',
  },
});
