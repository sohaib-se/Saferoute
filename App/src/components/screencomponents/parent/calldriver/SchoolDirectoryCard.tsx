import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SchoolContact {
  title: string;
  sub: string;
  phone: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
}

export const SchoolDirectoryCard: React.FC = () => {
  const contacts: SchoolContact[] = [
    {
      title: 'City School Transport Office',
      sub: 'Operating Hours: 06:30 AM - 05:00 PM',
      phone: '+92 51 111-222-33',
      icon: 'business',
      color: '#2563EB',
      bg: '#EFF6FF',
    },
    {
      title: 'Campus Security & Safety Desk',
      sub: 'Emergency & Escort Coordination',
      phone: '+92 51 999-8877',
      icon: 'shield-checkmark',
      color: '#059669',
      bg: '#F0FDF4',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>School Administration Contacts</Text>
      {contacts.map((contact, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.card}
          onPress={() => Linking.openURL(`tel:${contact.phone}`)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, { backgroundColor: contact.bg }]}>
            <Ionicons name={contact.icon} size={20} color={contact.color} />
          </View>
          <View style={styles.textCol}>
            <Text style={styles.title}>{contact.title}</Text>
            <Text style={styles.sub}>{contact.sub}</Text>
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
    marginTop: 4,
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
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  },
  sub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  phone: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 3,
  },
});
