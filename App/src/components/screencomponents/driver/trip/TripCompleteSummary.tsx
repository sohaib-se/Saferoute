import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TripCompleteSummaryProps {
  totalStudents: number;
  pickedCount: number;
  droppedCount: number;
  absentCount: number;
  vehicleName: string;
  routeTitle: string;
  onReset: () => void;
  onCreateNewTrip?: () => void;
  isCreatingNewTrip?: boolean;
}

export const TripCompleteSummary: React.FC<TripCompleteSummaryProps> = ({
  totalStudents,
  pickedCount,
  droppedCount,
  absentCount,
  vehicleName,
  routeTitle,
  onReset,
  onCreateNewTrip,
  isCreatingNewTrip,
}) => {
  const isAllAbsent = pickedCount === 0 && absentCount > 0;

  return (
    <View style={styles.card}>
      <View style={[styles.iconCircle, isAllAbsent && styles.iconCircleAmber]}>
        <Ionicons
          name={isAllAbsent ? 'alert-circle' : 'checkmark-done-circle'}
          size={42}
          color={isAllAbsent ? '#D97706' : '#059669'}
        />
      </View>

      <Text style={styles.heading}>
        {isAllAbsent ? 'Trip Completed (All Students Absent)' : 'Full Daily Trip Completed!'}
      </Text>
      <Text style={[styles.subheading, isAllAbsent && styles.subheadingAmber]}>
        {vehicleName} • {routeTitle}
      </Text>
      <Text style={styles.desc}>
        {isAllAbsent
          ? 'All students were marked absent during morning pickup. With 0 students to drop off, the trip has concluded automatically. You can create a new trip whenever needed.'
          : 'Both pickup and drop-off shifts for today have concluded. All records have been safely synchronized to the school database.'}
      </Text>

      {/* Metrics Row */}
      <View style={styles.grid}>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>{totalStudents}</Text>
          <Text style={styles.statLbl}>Assigned</Text>
        </View>

        <View style={[styles.statBox, styles.statBoxGreen]}>
          <Text style={[styles.statVal, styles.textGreen]}>{pickedCount}</Text>
          <Text style={styles.statLbl}>Picked Up</Text>
        </View>

        <View style={[styles.statBox, styles.statBoxBlue]}>
          <Text style={[styles.statVal, styles.textBlue]}>{droppedCount}</Text>
          <Text style={styles.statLbl}>Dropped Home</Text>
        </View>

        <View style={[styles.statBox, styles.statBoxRed]}>
          <Text style={[styles.statVal, styles.textRed]}>{absentCount}</Text>
          <Text style={styles.statLbl}>Absent</Text>
        </View>
      </View>

      {onCreateNewTrip ? (
        <TouchableOpacity
          style={styles.createTripBtn}
          onPress={onCreateNewTrip}
          disabled={isCreatingNewTrip}
          activeOpacity={0.8}
        >
          {isCreatingNewTrip ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="add-circle" size={18} color="#FFFFFF" />
              <Text style={styles.createTripBtnText}>Create Today's Trip</Text>
            </>
          )}
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity style={styles.resetBtn} onPress={onReset} activeOpacity={0.8}>
        <Ionicons name="refresh-outline" size={16} color="#007AFF" />
        <Text style={styles.resetBtnText}>Start New Shift / Reset View</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 8,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconCircleAmber: {
    backgroundColor: '#FFFBEB',
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginTop: 2,
    textAlign: 'center',
  },
  subheadingAmber: {
    color: '#D97706',
  },
  desc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  grid: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginBottom: 18,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statBoxGreen: {
    backgroundColor: '#F0FDF4',
    borderColor: '#DCFCE7',
  },
  statBoxBlue: {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
  },
  statBoxRed: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  statVal: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  textGreen: {
    color: '#059669',
  },
  textBlue: {
    color: '#0284C7',
  },
  textRed: {
    color: '#DC2626',
  },
  statLbl: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  createTripBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    width: '100%',
    marginBottom: 10,
  },
  createTripBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    gap: 6,
    width: '100%',
  },
  resetBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#007AFF',
  },
});


