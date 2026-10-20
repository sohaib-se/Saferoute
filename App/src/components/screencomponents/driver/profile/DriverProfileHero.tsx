import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

interface DriverProfileHeroProps {
  name: string;
  phone?: string;
  onEdit?: () => void;
}

export const DriverProfileHero: React.FC<DriverProfileHeroProps> = ({
  name = 'Hilal',
  phone = '03124124',
  onEdit,
}) => {
  const usernameHandle = `@${name.toLowerCase().replace(/\s+/g, '.')}.driver`;

  return (
    <View style={styles.container}>
      {/* Curved Cosmic Galaxy Banner */}
      <View style={styles.bannerContainer}>
        <View style={styles.bannerBackground}>
          <View style={styles.bannerOrbLarge} />
          <View style={styles.bannerOrbWarm} />
          <View style={styles.bannerOrbCyan} />
          <View style={styles.starDot1} />
          <View style={styles.starDot2} />
          <View style={styles.starDot3} />
        </View>

        {/* Top Controls inside Banner */}
        <View style={styles.bannerTopBar}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.editButton} onPress={onEdit} activeOpacity={0.8}>
            <Ionicons name="pencil" size={13} color="#FFFFFF" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Overlapping Avatar Row (clean, tags removed) */}
      <View style={styles.avatarRow}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarRing}>
            <View style={styles.avatarInner}>
              <Ionicons name="person" size={46} color="#0284C7" />
            </View>
          </View>
          {/* Edit Badge at bottom of circle */}
          <TouchableOpacity style={styles.avatarEditBadge} onPress={onEdit} activeOpacity={0.85}>
            <Ionicons name="pencil" size={11} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* User Name & Handle */}
      <View style={styles.nameSection}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userHandle}>{usernameHandle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E6EFF7',
    marginBottom: 16,
    ...shadows.card,
  },
  bannerContainer: {
    height: 110,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#0F172A',
  },
  bannerOrbLarge: {
    position: 'absolute',
    top: -40,
    left: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1E1B4B',
    opacity: 0.8,
  },
  bannerOrbWarm: {
    position: 'absolute',
    top: -30,
    right: -20,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#7C2D12',
    opacity: 0.65,
  },
  bannerOrbCyan: {
    position: 'absolute',
    bottom: -20,
    left: '30%',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#0369A1',
    opacity: 0.45,
  },
  starDot1: {
    position: 'absolute',
    top: 25,
    left: '20%',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
  starDot2: {
    position: 'absolute',
    top: 40,
    right: '35%',
    width: 2.5,
    height: 2.5,
    borderRadius: 1.5,
    backgroundColor: '#FDE047',
    opacity: 0.7,
  },
  starDot3: {
    position: 'absolute',
    top: 60,
    left: '60%',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
  },
  bannerTopBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 12,
    zIndex: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 14,
    gap: 4,
  },
  editText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  avatarRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -44,
    zIndex: 20,
  },
  avatarWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    padding: 3,
    backgroundColor: '#06B6D4',
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarInner: {
    flex: 1,
    borderRadius: 42,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarEditBadge: {
    position: 'absolute',
    bottom: -2,
    alignSelf: 'center',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameSection: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
  },
  userName: {
    fontSize: 18.5,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  userHandle: {
    fontSize: 12.5,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
});

export default DriverProfileHero;
