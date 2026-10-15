import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ParentChatBanner: React.FC = () => {
  return (
    <View style={styles.banner}>
      <Ionicons name="chatbubbles" size={16} color="#2563EB" />
      <Text style={styles.bannerText}>
        Direct messaging with your child's assigned driver for daily notices & pickup updates.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
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
  bannerText: {
    fontSize: 12,
    color: '#1E40AF',
    flex: 1,
    lineHeight: 18,
  },
});
