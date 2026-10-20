import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

export const CallDisclaimerCard: React.FC = () => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.iconCircle}>
        <Ionicons name="information" size={20} color="#007AFF" />
      </View>
      <View style={styles.textCol}>
        <Text style={styles.title}>Safety Calling Guidelines</Text>
        <Text style={styles.body}>
          Drivers operate with hands-free Bluetooth audio during transit routes. Please only call if strictly necessary or during urgent transit updates.
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    ...shadows.card,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 3,
  },
  body: {
    fontSize: 11.5,
    color: '#64748B',
    lineHeight: 16.5,
    fontWeight: '400',
  },
});

export default CallDisclaimerCard;
