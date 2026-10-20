import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows } from '../../../../lib/theme';
import { StudentRosterItem } from '../../../../context/DriverTripContext';

interface ParentContactCardProps {
  student: StudentRosterItem;
  onStartInAppCall: (parentName: string, studentName: string, phone: string) => void;
}

export const ParentContactCard: React.FC<ParentContactCardProps> = ({
  student,
  onStartInAppCall,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{student.avatarInitials}</Text>
        </View>

        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text style={styles.parentName}>{student.parentName}</Text>
            <View style={styles.guardianBadge}>
              <Text style={styles.guardianText}>Guardian</Text>
            </View>
          </View>
          <Text style={styles.childRelation}>
            Child: <Text style={styles.childBold}>{student.name}</Text> • {student.grade}
          </Text>
          <View style={styles.stopRow}>
            <Ionicons name="location-outline" size={13} color="#64748B" />
            <Text style={styles.stopText} numberOfLines={1}>
              Stop #{student.stopNumber} - {student.stopAddress}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonRow}>
        {/* In-App VoIP Call Button */}
        <TouchableOpacity
          style={styles.inAppCallBtn}
          onPress={() => onStartInAppCall(student.parentName, student.name, student.parentPhone)}
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={15} color="#FFFFFF" />
          <Text style={styles.inAppCallBtnText}>In-App Voice Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    marginBottom: 12,
    ...shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#051329',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  infoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  parentName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  guardianBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  guardianText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#007AFF',
  },
  childRelation: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  childBold: {
    fontWeight: '700',
    color: '#1E293B',
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  stopText: {
    fontSize: 11.5,
    color: '#64748B',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  inAppCallBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: radii.md,
    paddingVertical: 11,
    gap: 6,
    ...shadows.primaryGlow,
  },
  inAppCallBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});

export default ParentContactCard;
