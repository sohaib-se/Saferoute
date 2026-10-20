import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';

export interface ChildData {
  id: string;
  name: string;
  grade: string;
  studentCode: string;
  vehicle: string;
  driverName: string;
  driverPhone: string;
  status: 'Waiting' | 'En route' | 'Picked up' | 'Dropped off' | 'Absent';
  etaMinutes: number;
  pickupTime: string;
}

interface ChildStatusCardProps {
  child: ChildData;
  onTrackPress: (child: ChildData) => void;
  onCallPress: (child: ChildData) => void;
}

export const ChildStatusCard: React.FC<ChildStatusCardProps> = ({
  child,
  onTrackPress,
  onCallPress,
}) => {
  const getStatusConfig = (status: ChildData['status']) => {
    switch (status) {
      case 'En route':
        return {
          bg: colors.primaryLight,
          text: colors.primary,
          border: colors.primaryBorder,
          icon: 'navigate-circle' as const,
        };
      case 'Picked up':
        return {
          bg: colors.emeraldLight,
          text: colors.emeraldDark,
          border: colors.emeraldBorder,
          icon: 'checkmark-circle' as const,
        };
      case 'Dropped off':
        return {
          bg: '#F5F3FF',
          text: '#7C3AED',
          border: '#DDD6FE',
          icon: 'school' as const,
        };
      case 'Absent':
        return {
          bg: colors.dangerLight,
          text: colors.dangerDark,
          border: colors.dangerBorder,
          icon: 'close-circle' as const,
        };
      default:
        return {
          bg: colors.amberLight,
          text: colors.amberDark,
          border: colors.amberBorder,
          icon: 'time' as const,
        };
    }
  };

  const statusConfig = getStatusConfig(child.status);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {child.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </Text>
        </View>

        <View style={styles.infoCol}>
          <Text style={styles.childName}>{child.name}</Text>
          <Text style={styles.gradeText}>
            {child.grade} • Roll #{child.studentCode}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusConfig.bg, borderColor: statusConfig.border },
          ]}
        >
          <Ionicons name={statusConfig.icon} size={13} color={statusConfig.text} />
          <Text style={[styles.statusText, { color: statusConfig.text }]}>
            {child.status}
          </Text>
        </View>
      </View>

      <View style={styles.statsCardGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>ASSIGNED VAN</Text>
          <View style={styles.statValueRow}>
            <Ionicons name="bus-outline" size={13} color={colors.primary} />
            <Text style={styles.statValue} numberOfLines={1}>{child.vehicle}</Text>
          </View>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>DRIVER</Text>
          <View style={styles.statValueRow}>
            <Ionicons name="person-outline" size={13} color={colors.textSecondary} />
            <Text style={styles.statValue} numberOfLines={1}>{child.driverName}</Text>
          </View>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>PICKUP SCHEDULE</Text>
          <View style={styles.statValueRow}>
            <Ionicons name="time-outline" size={13} color={colors.primary} />
            <Text style={styles.statValue} numberOfLines={1}>{child.pickupTime}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => onTrackPress(child)}
          activeOpacity={0.85}
        >
          <Ionicons name="navigate" size={15} color="#FFFFFF" />
          <Text style={styles.trackButtonText}>Live Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.callButton}
          onPress={() => onCallPress(child)}
          activeOpacity={0.8}
        >
          <Ionicons name="call-outline" size={15} color={colors.primary} />
          <Text style={styles.callButtonText}>Contact Driver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: colors.primaryBorder,
    ...shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: radii.md,
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.primary,
  },
  infoCol: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textHeading,
    letterSpacing: -0.2,
  },
  gradeText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radii.full,
    borderWidth: 1,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  statsCardGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.primarySubtle,
    borderRadius: radii.sm,
    padding: 9,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  statBoxEta: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryBorder,
  },
  statLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  statLabelEta: {
    color: colors.primaryDark,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textHeading,
  },
  statValueEta: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.primary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  trackButton: {
    flex: 1.25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: radii.md,
    gap: 6,
    ...shadows.primaryGlow,
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primaryBorder,
    paddingVertical: 12,
    borderRadius: radii.md,
    gap: 6,
  },
  callButtonText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
  },
});

export default ChildStatusCard;
