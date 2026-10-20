import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

interface DriverAssignmentsListProps {
  onRowPress?: (rowId: string) => void;
}

export const DriverAssignmentsList: React.FC<DriverAssignmentsListProps> = ({
  onRowPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Section Title */}
      <Text style={styles.sectionTitle}>Transport Assignments</Text>

      {/* Row: Active Transit Route */}
      <TouchableOpacity
        style={styles.cardRow}
        activeOpacity={0.75}
        onPress={() => onRowPress && onRowPress('route')}
      >
        <View style={[styles.iconBox, { backgroundColor: '#E0F2FE' }]}>
          <Ionicons name="navigate-outline" size={18} color="#0284C7" />
        </View>

        <View style={styles.infoCol}>
          <Text style={styles.title}>Assigned Transit Route</Text>
          <Text style={styles.subtext}>Morning Sector G-10 • 18 Pickup Stops</Text>
        </View>

        <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
      </TouchableOpacity>
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
  cardRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6EFF7',
    marginBottom: 8,
    ...shadows.card,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtext: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
});

export default DriverAssignmentsList;
