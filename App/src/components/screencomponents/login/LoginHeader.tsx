import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../lib/theme';

interface LoginHeaderProps {
  selectedRole: 'parent' | 'driver';
  onSelectRole: (role: 'parent' | 'driver') => void;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({
  selectedRole,
  onSelectRole,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. App Brand Logo Squircle */}
      <View style={styles.brandLogoWrapper}>
        <Ionicons name="shield-checkmark" size={28} color="#FFFFFF" />
      </View>

      {/* 2. Brand Titles */}
      <Text style={styles.brandTitle}>
        Safe<Text style={styles.brandTitleAccent}>Route</Text>
      </Text>
      <Text style={styles.brandSubtitle}>School Transport Safety</Text>

      {/* 3. Section Heading */}
      <Text style={styles.chooseHeading}>Choose Your Portal</Text>

      {/* 4. Dual Portal Cards (Parent Portal vs Driver Portal) */}
      <View style={styles.portalCardsRow}>
        {/* Parent Portal Card */}
        <TouchableOpacity
          style={[
            styles.portalCard,
            selectedRole === 'parent' ? styles.portalCardSelected : styles.portalCardUnselected,
          ]}
          onPress={() => onSelectRole('parent')}
          activeOpacity={0.88}
        >
          {/* Top-Right Radio Indicator */}
          <View style={styles.radioWrapper}>
            {selectedRole === 'parent' ? (
              <View style={styles.radioActiveOuter}>
                <View style={styles.radioActiveInner} />
              </View>
            ) : (
              <View style={styles.radioInactiveRing} />
            )}
          </View>

          {/* Icon */}
          <View
            style={[
              styles.iconContainer,
              selectedRole === 'parent' ? styles.iconContainerParentActive : styles.iconContainerInactive,
            ]}
          >
            <Ionicons
              name="people"
              size={32}
              color={selectedRole === 'parent' ? '#007AFF' : '#64748B'}
            />
          </View>

          {/* Title */}
          <Text
            style={[
              styles.portalTitle,
              selectedRole === 'parent' ? styles.portalTitleActive : styles.portalTitleInactive,
            ]}
          >
            Parent Portal
          </Text>
          <Text style={styles.portalCaption}>Track Child's Van</Text>
        </TouchableOpacity>

        {/* Driver Portal Card */}
        <TouchableOpacity
          style={[
            styles.portalCard,
            selectedRole === 'driver' ? styles.portalCardSelected : styles.portalCardUnselected,
          ]}
          onPress={() => onSelectRole('driver')}
          activeOpacity={0.88}
        >
          {/* Top-Right Radio Indicator */}
          <View style={styles.radioWrapper}>
            {selectedRole === 'driver' ? (
              <View style={styles.radioActiveOuter}>
                <View style={styles.radioActiveInner} />
              </View>
            ) : (
              <View style={styles.radioInactiveRing} />
            )}
          </View>

          {/* Icon */}
          <View
            style={[
              styles.iconContainer,
              selectedRole === 'driver' ? styles.iconContainerDriverActive : styles.iconContainerInactive,
            ]}
          >
            <Ionicons
              name="bus"
              size={32}
              color={selectedRole === 'driver' ? '#007AFF' : '#64748B'}
            />
          </View>

          {/* Title */}
          <Text
            style={[
              styles.portalTitle,
              selectedRole === 'driver' ? styles.portalTitleActive : styles.portalTitleInactive,
            ]}
          >
            Driver Portal
          </Text>
          <Text style={styles.portalCaption}>Manage Trip & Roster</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 2,
  },
  brandLogoWrapper: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  brandTitleAccent: {
    color: '#007AFF',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  chooseHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginTop: 14,
    marginBottom: 10,
    letterSpacing: 0.1,
  },
  portalCardsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  portalCard: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    position: 'relative',
    minHeight: 122,
  },
  portalCardSelected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 4,
  },
  portalCardUnselected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  radioWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  radioActiveOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioActiveInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  radioInactiveRing: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 6,
  },
  iconContainerParentActive: {
    backgroundColor: '#EBF4FF',
  },
  iconContainerDriverActive: {
    backgroundColor: '#EBF4FF',
  },
  iconContainerInactive: {
    backgroundColor: '#F1F5F9',
  },
  portalTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 2,
  },
  portalTitleActive: {
    color: '#0F172A',
  },
  portalTitleInactive: {
    color: '#64748B',
  },
  portalCaption: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default LoginHeader;

