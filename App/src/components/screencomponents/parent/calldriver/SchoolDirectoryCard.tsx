import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../../../../lib/theme';

interface SchoolDirectoryCardProps {
  adminName?: string;
  phone?: string;
  hours?: string;
  email?: string;
  onCallAdmin?: () => void;
}

export const SchoolDirectoryCard: React.FC<SchoolDirectoryCardProps> = ({
  adminName = 'School Transport Administration',
  phone = '+92 51 111-222-33',
  hours = '07:30 AM - 04:30 PM (Mon - Fri)',
  email = 'transport@school.edu.pk',
  onCallAdmin,
}) => {
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const cleanEmail = email.trim();

  const initiateCall = async () => {
    if (onCallAdmin) {
      onCallAdmin();
      return;
    }
    const url = `tel:${cleanPhone}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(url);
      }
    } catch {
      Alert.alert(
        'Admin Phone',
        `Dial number manually: ${phone}`
      );
    }
  };

  const handleContactPress = () => {
    if (onCallAdmin) {
      onCallAdmin();
      return;
    }
    Alert.alert(
      'School Administration Desk',
      `Direct Line: ${phone}\nSupport Email: ${email}\nOffice Hours: ${hours}`,
      [
        {
          text: 'Call Admin Desk',
          onPress: initiateCall,
        },
        {
          text: 'Send Email',
          onPress: () => {
            Linking.openURL(`mailto:${cleanEmail}`).catch(() => {
              Alert.alert('Email', `Contact via: ${email}`);
            });
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${cleanEmail}`).catch(() => {
      Alert.alert('Email Support', `Please email us at: ${email}`);
    });
  };

  return (
    <View style={styles.card}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Ionicons name="business" size={32} color="#007AFF" />
          </View>
          <View style={styles.badgeDot} />
        </View>

        <View style={styles.infoCol}>
          <Text style={styles.name}>{adminName}</Text>
          <View style={styles.officialBadge}>
            <Ionicons name="shield-checkmark" size={13} color="#007AFF" />
            <Text style={styles.officialText}>Official Admin Desk</Text>
          </View>
          <View style={styles.phoneRow}>
            <Ionicons name="call" size={13} color="#64748B" />
            <Text style={styles.phoneLabel}>Phone: </Text>
            <Text style={styles.phoneNumber}>{phone}</Text>
          </View>
        </View>
      </View>

      {/* Info Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statMiniCard}>
          <Ionicons name="time" size={16} color="#007AFF" style={styles.miniIcon} />
          <Text style={styles.miniLabel}>Office Hours</Text>
          <Text style={styles.miniValue} numberOfLines={2}>{hours}</Text>
        </View>

        <TouchableOpacity
          style={styles.statMiniCard}
          onPress={handleEmailPress}
          activeOpacity={0.75}
        >
          <Ionicons name="mail" size={16} color="#007AFF" style={styles.miniIcon} />
          <Text style={styles.miniLabel}>Email Support</Text>
          <Text style={[styles.miniValue, { color: '#007AFF' }]} numberOfLines={2}>
            {email}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Primary Action Button */}
      <TouchableOpacity
        style={styles.callButton}
        onPress={handleContactPress}
        activeOpacity={0.85}
      >
        <View style={styles.callContent}>
          <View style={styles.callIconBadge}>
            <Ionicons name="call" size={18} color="#FFFFFF" />
          </View>
          <View style={styles.callTextCol}>
            <Text style={styles.callButtonTitle}>Contact School Admin</Text>
            <Text style={styles.callButtonSubtitle}>{phone}</Text>
          </View>
        </View>
        <View style={styles.callChevronCircle}>
          <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    marginBottom: 20,
    ...shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#D0E4FF',
  },
  badgeDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#007AFF',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
  },
  infoCol: {
    flex: 1,
  },
  name: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  officialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 12,
    gap: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 4,
  },
  officialText: {
    fontSize: 11,
    color: '#007AFF',
    fontWeight: '700',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  phoneLabel: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
    fontWeight: '500',
  },
  phoneNumber: {
    fontSize: 12.5,
    color: '#007AFF',
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statMiniCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  miniIcon: {
    marginBottom: 6,
  },
  miniLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  miniValue: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  callButton: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  callContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  callIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callTextCol: {
    flex: 1,
  },
  callButtonTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  callButtonSubtitle: {
    color: '#E0F2FE',
    fontSize: 11.5,
    fontWeight: '600',
    marginTop: 1,
  },
  callChevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default SchoolDirectoryCard;
