import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ParentProfileHeaderProps {
  name: string;
  phone: string;
}

export const ParentProfileHeader: React.FC<ParentProfileHeaderProps> = ({ name, phone }) => {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatarCircle}>
        <Ionicons name="person" size={36} color="#2563EB" />
      </View>
      <Text style={styles.userName}>{name}</Text>
      <View style={styles.roleBadge}>
        <Text style={styles.roleText}>Verified Guardian Account</Text>
      </View>
      <Text style={styles.phoneText}>Phone: {phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  roleBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    marginBottom: 6,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  phoneText: {
    fontSize: 13,
    color: '#64748B',
  },
});
