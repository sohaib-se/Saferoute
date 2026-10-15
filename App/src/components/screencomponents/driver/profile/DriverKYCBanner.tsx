import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const DriverKYCBanner: React.FC = () => {
  return (
    <View style={styles.verificationBanner}>
      <Ionicons name="shield-checkmark" size={20} color="#059669" />
      <View style={styles.verifTextCol}>
        <Text style={styles.verifTitle}>KYC Verified & Approved</Text>
        <Text style={styles.verifSub}>
          Driving license & CNIC documents verified by School Administration.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  verificationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  verifTextCol: {
    flex: 1,
  },
  verifTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065F46',
  },
  verifSub: {
    fontSize: 11,
    color: '#047857',
    marginTop: 2,
  },
});

export default DriverKYCBanner;
