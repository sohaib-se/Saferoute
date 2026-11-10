import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TripPhaseCardProps {
  type: 'pickup' | 'dropoff';
  status: 'locked' | 'pending' | 'in_progress' | 'completed';
  startTime?: string;
  completedTime?: string;
  countText?: string;
  isActive?: boolean;
  onPressAction?: () => void;
  actionLabel?: string;
  actionIcon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
}

export const TripPhaseCard: React.FC<TripPhaseCardProps> = ({
  type,
  status,
  startTime,
  completedTime,
  countText,
  isActive = false,
  onPressAction,
  actionLabel,
  actionIcon,
  disabled = false,
}) => {
  const isPickup = type === 'pickup';
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in_progress';

  // Badge configuration
  const getBadge = () => {
    if (isLocked) {
      return { bg: '#F1F5F9', text: '#64748B', border: '#E2E8F0', label: 'Locked' };
    }
    if (isCompleted) {
      return { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0', label: 'Completed ✓' };
    }
    if (isInProgress) {
      return { bg: '#EFF6FF', text: '#007AFF', border: '#BFDBFE', label: 'In Progress • Live' };
    }
    return { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A', label: 'Ready to Start' };
  };

  const badge = getBadge();

  return (
    <View
      style={[
        styles.card,
        isInProgress && styles.cardActive,
        isLocked && styles.cardLocked,
      ]}
    >
      <View style={styles.headerRow}>
        <View
          style={[
            styles.iconCircle,
            isPickup ? styles.pickupCircle : styles.dropoffCircle,
            isLocked && styles.lockedCircle,
          ]}
        >
          <Ionicons
            name={
              isLocked
                ? 'lock-closed'
                : isPickup
                ? 'sunny-outline'
                : 'home-outline'
            }
            size={20}
            color={isLocked ? '#94A3B8' : isPickup ? '#D97706' : '#007AFF'}
          />
        </View>

        <View style={styles.titleCol}>
          <Text style={[styles.title, isLocked && styles.textMuted]}>
            {isPickup ? '1. Morning Pickup Trip' : '2. Afternoon Drop-off Trip'}
          </Text>
          <Text style={styles.subtitle}>
            {isPickup
              ? 'Home stops → School Gate arrival'
              : 'School Gate departure → Home stops'}
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            { backgroundColor: badge.bg, borderColor: badge.border },
          ]}
        >
          <Text style={[styles.badgeText, { color: badge.text }]}>
            {badge.label}
          </Text>
        </View>
      </View>

      {/* Meta row */}
      <View style={styles.metaRow}>
        {countText && (
          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={13} color="#64748B" />
            <Text style={styles.metaText}>{countText}</Text>
          </View>
        )}
        {startTime && (
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={13} color="#64748B" />
            <Text style={styles.metaText}>Started: {startTime}</Text>
          </View>
        )}
        {completedTime && (
          <View style={styles.metaItem}>
            <Ionicons name="checkmark-circle-outline" size={13} color="#059669" />
            <Text style={[styles.metaText, { color: '#059669' }]}>
              Ended: {completedTime}
            </Text>
          </View>
        )}
      </View>

      {/* Action Button */}
      {actionLabel && (
        <TouchableOpacity
          style={[
            styles.actionButton,
            isCompleted && styles.actionCompleted,
            disabled && styles.actionDisabled,
          ]}
          onPress={onPressAction}
          disabled={disabled}
          activeOpacity={0.8}
        >
          <Ionicons
            name={actionIcon || 'play-circle-outline'}
            size={18}
            color="#FFFFFF"
          />
          <Text style={styles.actionButtonText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardActive: {
    borderColor: '#007AFF',
    backgroundColor: '#F8FAFF',
  },
  cardLocked: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    opacity: 0.85,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  pickupCircle: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  dropoffCircle: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  lockedCircle: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  titleCol: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  textMuted: {
    color: '#64748B',
  },
  subtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11.5,
    color: '#475569',
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 11,
    marginTop: 14,
    gap: 6,
  },
  actionCompleted: {
    backgroundColor: '#059669',
  },
  actionDisabled: {
    backgroundColor: '#CBD5E1',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

