import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../../../../lib/theme';

interface ProfileSettingsSectionProps {
  onLogout: () => void;
}

export const ProfileSettingsSection: React.FC<ProfileSettingsSectionProps> = ({
  onLogout,
}) => {
  return (
    <View style={styles.container}>
      {/* Section Title matching reference image */}
      <Text style={styles.sectionTitle}>Settings</Text>

      {/* Log out Row */}
      <TouchableOpacity
        style={styles.cardRow}
        activeOpacity={0.75}
        onPress={onLogout}
      >
        <View style={[styles.iconBox, { backgroundColor: '#FEF2F2' }]}>
          <Ionicons name="log-out-outline" size={18} color="#DC2626" />
        </View>

        <Text style={[styles.rowTitle, styles.logoutText]}>Log out</Text>

        <Ionicons name="chevron-forward" size={16} color="#DC2626" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D9488', // Teal accent color from reference image
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: -0.2,
  },
  cardRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 13,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6EFF7',
    marginBottom: 8,
    ...shadows.card,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '800',
  },
});

export default ProfileSettingsSection;
