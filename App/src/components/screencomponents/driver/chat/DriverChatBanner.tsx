import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const DriverChatBanner: React.FC = () => {
  return (
    <View style={styles.noticeBar}>
      <Ionicons name="information-circle" size={16} color="#64748B" />
      <Text style={styles.noticeText}>
        For urgent transit concerns while driving, please prioritize phone calls.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    gap: 8,
  },
  noticeText: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
  },
});

export default DriverChatBanner;
