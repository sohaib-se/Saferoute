import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AttendanceInfoCard: React.FC = () => {
  return (
    <View style={styles.infoBanner}>
      <Ionicons name="shield-checkmark" size={18} color="#2563EB" />
      <Text style={styles.infoBannerText}>
        Every attendance mark is immutably timestamped and synced to the school administration dashboard.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBanner: {
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
  infoBannerText: {
    fontSize: 12,
    color: '#1E40AF',
    flex: 1,
    lineHeight: 16,
  },
});

export default AttendanceInfoCard;
