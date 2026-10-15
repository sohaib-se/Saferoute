import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UrgentContact {
  title: string;
  phone: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
}

export const ParentUrgentContacts: React.FC = () => {
  const contacts: UrgentContact[] = [
    {
      title: 'School Principal / Transport Admin',
      phone: '+92 51 111-222-333',
      icon: 'business',
      color: '#2563EB',
      bg: '#EFF6FF',
    },
    {
      title: 'Transport Control Room (Emergency)',
      phone: '+92 51 444-555-666',
      icon: 'bus',
      color: '#2563EB',
      bg: '#EFF6FF',
    },
    {
      title: 'Police Emergency Helpline (15)',
      phone: '15',
      icon: 'shield',
      color: '#DC2626',
      bg: '#FEF2F2',
    },
    {
      title: 'Rescue & Ambulance (1122)',
      phone: '1122',
      icon: 'medkit',
      color: '#EA580C',
      bg: '#FFF7ED',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Direct Urgent Helplines</Text>
      {contacts.map((contact, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => Linking.openURL(`tel:${contact.phone}`)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, { backgroundColor: contact.bg }]}>
            <Ionicons name={contact.icon} size={20} color={contact.color} />
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.title}>{contact.title}</Text>
            <Text style={styles.phone}>{contact.phone}</Text>
          </View>
          <Ionicons name="call" size={20} color={contact.color} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  phone: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '600',
  },
});
