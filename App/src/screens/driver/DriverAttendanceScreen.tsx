import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { AttendanceInfoCard } from '../../components/screencomponents/driver/attendance/AttendanceInfoCard';
import {
  AttendanceLogList,
  AttendanceLogItemData,
} from '../../components/screencomponents/driver/attendance/AttendanceLogList';

interface DriverAttendanceScreenProps {
  onBack?: () => void;
}

export const DriverAttendanceScreen: React.FC<DriverAttendanceScreenProps> = ({ onBack }) => {
  const [logs] = useState<AttendanceLogItemData[]>([
    {
      id: 'log-1',
      studentName: 'Hamza Ali',
      stop: 'Stop #2 (Main Ring Road)',
      time: '07:28 AM',
      status: 'Picked up',
    },
    {
      id: 'log-2',
      studentName: 'Bilal Ahmed',
      stop: 'Stop #5 (I-8 Markaz)',
      time: '07:42 AM',
      status: 'Dropped off',
    },
    {
      id: 'log-3',
      studentName: 'Zainab Fatima',
      stop: 'Stop #4 (Gulberg Greens)',
      time: '07:35 AM',
      status: 'Absent',
    },
  ]);

  return (
    <View style={styles.container}>
      <Header
        title="Attendance Logs"
        subtitle="Immutable Boarding Records"
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AttendanceInfoCard />
        <AttendanceLogList logs={logs} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
});
