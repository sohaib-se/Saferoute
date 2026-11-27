import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DriverProfileHeaderProps {
  name: string;
  phone?: string;
  photoUrl?: string;
}

export const DriverProfileHeader: React.FC<DriverProfileHeaderProps> = ({ name, phone, photoUrl }) => {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatarCircle}>
        {photoUrl ? (
          <Image source={{ uri: photoUrl }} style={styles.avatarImage} resizeMode="cover" />
        ) : (
          <Ionicons name="person" size={36} color="#2563EB" />
        )}
      </View>
      <Text style={styles.userName}>{name}</Text>
      <View style={styles.roleBadge}>
        <Text style={styles.roleText}>Certified School Driver</Text>
      </View>
      {phone ? <Text style={styles.phoneText}>Phone: {phone}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#DBEAFE',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  roleBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  phoneText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 6,
  },
});

export default DriverProfileHeader;
