import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const DriverEmergencyHelplines: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Emergency Contact Shortcuts</Text>

      <TouchableOpacity
        style={styles.contactCard}
        onPress={() => Linking.openURL('tel:+925111122233')}
        activeOpacity={0.7}
      >
        <View style={[styles.contactIcon, { backgroundColor: '#EFF6FF' }]}>
          <Ionicons name="business" size={20} color="#2563EB" />
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>School Admin Desk</Text>
          <Text style={styles.contactNumber}>+92 51 111-222-333</Text>
        </View>
        <Ionicons name="call" size={20} color="#2563EB" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contactCard}
        onPress={() => Linking.openURL('tel:15')}
        activeOpacity={0.7}
      >
        <View style={[styles.contactIcon, { backgroundColor: '#FEF2F2' }]}>
          <Ionicons name="shield" size={20} color="#DC2626" />
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Police Emergency Helpline</Text>
          <Text style={styles.contactNumber}>15</Text>
        </View>
        <Ionicons name="call" size={20} color="#DC2626" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contactCard}
        onPress={() => Linking.openURL('tel:1122')}
        activeOpacity={0.7}
      >
        <View style={[styles.contactIcon, { backgroundColor: '#ECFDF5' }]}>
          <Ionicons name="medkit" size={20} color="#059669" />
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Rescue Ambulance</Text>
          <Text style={styles.contactNumber}>1122</Text>
        </View>
        <Ionicons name="call" size={20} color="#059669" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    gap: 12,
  },
  contactIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  contactNumber: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});

export default DriverEmergencyHelplines;
