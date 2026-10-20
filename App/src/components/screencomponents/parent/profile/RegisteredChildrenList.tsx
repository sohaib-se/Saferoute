import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

interface ChildData {
  id: string;
  name: string;
  initials: string;
  initialsBg: string;
  initialsColor: string;
  grade: string;
  section: string;
  rollNumber: string;
  busNumber: string;
  busPlate: string;
  driverName: string;
}

const childrenList: ChildData[] = [
  {
    id: '1',
    name: 'Ayesha Malik',
    initials: 'AM',
    initialsBg: '#E0F2FE',
    initialsColor: '#0284C7',
    grade: 'Grade 4',
    section: 'Section C',
    rollNumber: '1482',
    busNumber: 'Bus 1',
    busPlate: 'ICT-4921',
    driverName: 'Hilal',
  },
  {
    id: '2',
    name: 'Zain Malik',
    initials: 'ZM',
    initialsBg: '#F3E8FF',
    initialsColor: '#8B5CF6',
    grade: 'Grade 2',
    section: 'Section A',
    rollNumber: '1483',
    busNumber: 'Bus 1',
    busPlate: 'ICT-4921',
    driverName: 'Hilal',
  },
];

interface RegisteredChildrenListProps {
  onChildPress?: (childName: string) => void;
}

export const RegisteredChildrenList: React.FC<RegisteredChildrenListProps> = ({
  onChildPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Section Title */}
      <Text style={styles.sectionTitle}>Registered Children</Text>

      {/* Children Cards */}
      {childrenList.map((child) => (
        <TouchableOpacity
          key={child.id}
          style={styles.childCard}
          activeOpacity={0.75}
          onPress={() => onChildPress && onChildPress(child.name)}
        >
          {/* Top Row: Avatar, Name & Status Pill */}
          <View style={styles.headerRow}>
            <View style={[styles.avatarCircle, { backgroundColor: child.initialsBg }]}>
              <Text style={[styles.avatarText, { color: child.initialsColor }]}>
                {child.initials}
              </Text>
            </View>

            <View style={styles.nameCol}>
              <Text style={styles.childName}>{child.name}</Text>
              <Text style={styles.schoolSubtitle}>SafeRoute Enrolled Student</Text>
            </View>

            <View style={styles.statusPill}>
              <View style={styles.activeDot} />
              <Text style={styles.statusPillText}>Active</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.cardDivider} />

          {/* Tags Cloud / Wrap-friendly layout (Never overflows) */}
          <View style={styles.tagsContainer}>
            {/* Tag 1: Class & Section */}
            <View style={[styles.tag, styles.tagClass]}>
              <Ionicons name="school-outline" size={13} color="#0284C7" />
              <Text style={styles.tagText} numberOfLines={1}>
                <Text style={styles.tagLabel}>Class: </Text>
                <Text style={styles.tagValueClass}>{child.grade} ({child.section})</Text>
              </Text>
            </View>

            {/* Tag 2: Roll Number */}
            <View style={[styles.tag, styles.tagRoll]}>
              <Ionicons name="id-card-outline" size={13} color="#6366F1" />
              <Text style={styles.tagText} numberOfLines={1}>
                <Text style={styles.tagLabel}>Roll #: </Text>
                <Text style={styles.tagValueRoll}>{child.rollNumber}</Text>
              </Text>
            </View>

            {/* Tag 3: Bus / Vehicle */}
            <View style={[styles.tag, styles.tagBus]}>
              <Ionicons name="bus-outline" size={13} color="#059669" />
              <Text style={styles.tagText} numberOfLines={1}>
                <Text style={styles.tagLabel}>Bus: </Text>
                <Text style={styles.tagValueBus}>{child.busNumber} • {child.busPlate}</Text>
              </Text>
            </View>

            {/* Tag 4: Driver */}
            <View style={[styles.tag, styles.tagDriver]}>
              <Ionicons name="person-outline" size={13} color="#D97706" />
              <Text style={styles.tagText} numberOfLines={1}>
                <Text style={styles.tagLabel}>Driver: </Text>
                <Text style={styles.tagValueDriver}>{child.driverName}</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D9488',
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: -0.2,
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
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
  },
  nameCol: {
    flex: 1,
    marginRight: 8,
  },
  childName: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  schoolSubtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F8EE',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B5EBC7',
    gap: 4,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#12B76A',
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#12B76A',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
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

export default RegisteredChildrenList;
