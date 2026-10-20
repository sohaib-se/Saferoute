import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

interface ParentProfileHeaderProps {
  name: string;
  phone: string;
  onEdit?: () => void;
}

export const ParentProfileHeader: React.FC<ParentProfileHeaderProps> = ({
  name = 'Zeeshan Malik',
  phone = '+92 312 412412',
  onEdit,
}) => {
  return (
    <View style={styles.card}>
      {/* Curved Sky Blue Gradient Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerArc} />
        {/* Edit Button in Header */}
        <TouchableOpacity style={styles.editButton} onPress={onEdit} activeOpacity={0.8}>
          <Ionicons name="pencil" size={13} color="#007AFF" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Main Profile Info Row */}
      <View style={styles.contentRow}>
        {/* Avatar with Camera badge */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={46} color="#94A3B8" />
          </View>
          <View style={styles.cameraBadge}>
            <Ionicons name="camera" size={12} color="#FFFFFF" />
          </View>
        </View>

        {/* Profile Details */}
        <View style={styles.detailsCol}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={13} color="#007AFF" />
            <Text style={styles.verifiedText}>Verified Guardian Account</Text>
          </View>
          <View style={styles.contactRow}>
            <Ionicons name="call" size={13} color="#64748B" />
            <View>
              <Text style={styles.contactLabel}>Primary Contact</Text>
              <Text style={styles.phoneText}>{phone}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E6EFF7',
    marginBottom: 20,
    ...shadows.card,
  },
  banner: {
    height: 70,
    backgroundColor: '#38BDF8',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 12,
  },
  bannerArc: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#0284C7',
    opacity: 0.6,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 5,
  },
  editText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007AFF',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: -32,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  avatarCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  detailsCol: {
    flex: 1,
    paddingTop: 36,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 12,
    gap: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 6,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#007AFF',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 2,
  },
  contactLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  phoneText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 1,
  },
});

export default ParentProfileHeader;
