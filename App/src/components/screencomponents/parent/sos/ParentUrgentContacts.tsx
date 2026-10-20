import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

interface HelplineItem {
  title: string;
  sub: string;
  phone: string;
  icon: keyof typeof Ionicons.glyphMap;
  themeColor: string;
  lightBg: string;
}

export const ParentUrgentContacts: React.FC = () => {
  const helplines: HelplineItem[] = [
    {
      title: 'School Transport Admin Desk',
      sub: 'General inquiries & transport coordination',
      phone: '+92 51 111-222-333',
      icon: 'business',
      themeColor: '#007AFF',
      lightBg: '#EBF4FF',
    },
    {
      title: 'Transport Control Room (Emergency)',
      sub: '24/7 Emergency Support',
      phone: '+92 51 444-555-666',
      icon: 'bus',
      themeColor: '#12B76A',
      lightBg: '#E6F8EE',
    },
    {
      title: 'Police Emergency Helpline (15)',
      sub: 'For immediate law enforcement support',
      phone: '15',
      icon: 'shield',
      themeColor: '#EF4444',
      lightBg: '#FEE2E2',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Direct Urgent Helplines</Text>
        <Text style={styles.sectionSubtitle}>Quick access to important contacts</Text>
      </View>

      {/* Helplines List */}
      {helplines.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => Linking.openURL(`tel:${item.phone}`)}
          activeOpacity={0.8}
        >
          {/* Left Square Icon */}
          <View style={[styles.iconBox, { backgroundColor: item.lightBg }]}>
            <Ionicons name={item.icon} size={22} color={item.themeColor} />
          </View>

          {/* Details */}
          <View style={styles.infoCol}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.sub}>{item.sub}</Text>
            <View style={styles.phoneRow}>
              <Ionicons name="call" size={13} color="#007AFF" />
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
          </View>

          {/* Call Circle */}
          <View style={[styles.callBtnCircle, { backgroundColor: item.lightBg }]}>
            <Ionicons name="call" size={18} color={item.themeColor} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionHeader: {
    marginBottom: 12,
    marginLeft: 2,
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
    marginTop: 2,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    ...shadows.card,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  infoCol: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  sub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '400',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  phone: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007AFF',
  },
  callBtnCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ParentUrgentContacts;
