import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const LoginFooter: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Ionicons name="information-circle-outline" size={16} color="#64748B" />
        <Text style={styles.infoText}>
          Accounts are provisioned by your School Administration.
        </Text>
      </View>
      <Text style={styles.subText}>
        If you haven't received your 4-digit code or password, please contact the school front desk.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  subText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default LoginFooter;
