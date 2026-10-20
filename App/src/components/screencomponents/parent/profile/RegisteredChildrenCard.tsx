import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

export const RegisteredChildrenCard: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <Ionicons name="people" size={20} color="#007AFF" style={styles.headerIcon} />
          <Text style={styles.sectionTitle}>Registered Children</Text>
        </View>
        <View style={styles.enrolledPill}>
          <Text style={styles.enrolledText}>2 Enrolled</Text>
        </View>
      </View>
      <Text style={styles.sectionSubtitle}>
        Manage your children and view their transit details
      </Text>

      {/* Child 1: Ayesha Malik */}
      <TouchableOpacity style={styles.childCard} activeOpacity={0.8}>
        <View style={styles.headerRow}>
          <View style={[styles.avatarCircle, { backgroundColor: '#EBF4FF' }]}>
            <Text style={[styles.avatarText, { color: '#007AFF' }]}>AM</Text>
          </View>

          <View style={styles.childInfoCol}>
            <Text style={styles.childName}>Ayesha Malik</Text>
            <Text style={styles.childMeta}>SafeRoute Enrolled Student</Text>
          </View>

          <View style={styles.statusPillOnTrip}>
            <View style={styles.greenDot} />
            <Text style={styles.onTripText}>On Trip</Text>
          </View>
        </View>

        <View style={styles.cardDivider} />

        <View style={styles.tagsContainer}>
          <View style={[styles.tag, styles.tagClass]}>
            <Ionicons name="school-outline" size={13} color="#0284C7" />
            <Text style={styles.tagText} numberOfLines={1}>
              <Text style={styles.tagLabel}>Class: </Text>
              <Text style={styles.tagValueClass}>Grade 4 (Section C)</Text>
            </Text>
          </View>

          <View style={[styles.tag, styles.tagRoll]}>
            <Ionicons name="id-card-outline" size={13} color="#6366F1" />
            <Text style={styles.tagText} numberOfLines={1}>
              <Text style={styles.tagLabel}>Roll #: </Text>
              <Text style={styles.tagValueRoll}>1482</Text>
            </Text>
          </View>

          <View style={[styles.tag, styles.tagBus]}>
            <Ionicons name="bus-outline" size={13} color="#059669" />
            <Text style={styles.tagText} numberOfLines={1}>
              <Text style={styles.tagLabel}>Bus: </Text>
              <Text style={styles.tagValueBus}>Bus 1 • ICT-4921</Text>
            </Text>
          </View>

          <View style={[styles.tag, styles.tagDriver]}>
            <Ionicons name="person-outline" size={13} color="#D97706" />
            <Text style={styles.tagText} numberOfLines={1}>
              <Text style={styles.tagLabel}>Driver: </Text>
              <Text style={styles.tagValueDriver}>Hilal</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Child 2: Zain Malik */}
      <TouchableOpacity style={styles.childCard} activeOpacity={0.8}>
        <View style={styles.headerRow}>
          <View style={[styles.avatarCircle, { backgroundColor: '#F3E8FF' }]}>
            <Text style={[styles.avatarText, { color: '#8B5CF6' }]}>ZM</Text>
          </View>

          <View style={styles.childInfoCol}>
            <Text style={styles.childName}>Zain Malik</Text>
            <Text style={styles.childMeta}>SafeRoute Enrolled Student</Text>
          </View>

          <View style={styles.statusPillNotStarted}>
            <View style={styles.grayDot} />
            <Text style={styles.notStartedText}>Not Started</Text>
          </View>
        </View>

        <View style={styles.cardDivider} />

        <View style={styles.tagsContainer}>
          <View style={[styles.tag, styles.tagClass]}>
            <Ionicons name="school-outline" size={13} color="#0284C7" />
            <Text style={styles.tagText} numberOfLines={1}>
              <Text style={styles.tagLabel}>Class: </Text>
              <Text style={styles.tagValueClass}>Grade 2 (Section A)</Text>
            </Text>
          </View>

          <View style={[styles.tag, styles.tagRoll]}>
            <Ionicons name="id-card-outline" size={13} color="#6366F1" />
            <Text style={styles.tagText} numberOfLines={1}>
              <Text style={styles.tagLabel}>Roll #: </Text>
              <Text style={styles.tagValueRoll}>1483</Text>
            </Text>
          </View>

          <View style={[styles.tag, styles.tagBus]}>
            <Ionicons name="bus-outline" size={13} color="#059669" />
            <Text style={styles.tagText} numberOfLines={1}>
              <Text style={styles.tagLabel}>Bus: </Text>
              <Text style={styles.tagValueBus}>Bus 1 • ICT-4921</Text>
            </Text>
          </View>

          <View style={[styles.tag, styles.tagDriver]}>
            <Ionicons name="person-outline" size={13} color="#D97706" />
            <Text style={styles.tagText} numberOfLines={1}>
              <Text style={styles.tagLabel}>Driver: </Text>
              <Text style={styles.tagValueDriver}>Hilal</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    marginLeft: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    marginRight: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  enrolledPill: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  enrolledText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#007AFF',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
    marginLeft: 2,
    fontWeight: '500',
  },
  childCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    marginBottom: 10,
    ...shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
  },
  childInfoCol: {
    flex: 1,
    marginRight: 8,
  },
  childName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  childMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  statusPillOnTrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F8EE',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 12,
    gap: 5,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#12B76A',
  },
  onTripText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#12B76A',
  },
  statusPillNotStarted: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 12,
    gap: 5,
  },
  grayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#64748B',
  },
  notStartedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5.5,
    borderRadius: 10,
    borderWidth: 1,
    gap: 5,
    maxWidth: '100%',
  },
  tagText: {
    fontSize: 12,
    flexShrink: 1,
  },
  tagLabel: {
    color: '#64748B',
    fontWeight: '500',
    fontSize: 11,
  },
  tagClass: {
    backgroundColor: '#F0F9FF',
    borderColor: '#BAE6FD',
  },
  tagValueClass: {
    color: '#0369A1',
    fontWeight: '700',
    fontSize: 11.5,
  },
  tagRoll: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  tagValueRoll: {
    color: '#4338CA',
    fontWeight: '700',
    fontSize: 11.5,
  },
  tagBus: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  tagValueBus: {
    color: '#047857',
    fontWeight: '700',
    fontSize: 11.5,
  },
  tagDriver: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  tagValueDriver: {
    color: '#B45309',
    fontWeight: '700',
    fontSize: 11.5,
  },
});

export default RegisteredChildrenCard;
