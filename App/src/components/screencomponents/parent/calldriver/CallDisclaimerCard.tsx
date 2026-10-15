import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CallDisclaimerCard: React.FC = () => {
  return (
    <View style={styles.disclaimerBox}>
      <Ionicons name="call" size={18} color="#2563EB" />
      <Text style={styles.disclaimerText}>
        For student safety, drivers may use hands-free audio or pull over to answer calls while on route.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#1E40AF',
    flex: 1,
    lineHeight: 18,
  },
});
