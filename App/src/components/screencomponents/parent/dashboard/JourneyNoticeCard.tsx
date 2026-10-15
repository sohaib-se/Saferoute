import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface JourneyNoticeCardProps {
  vehicleName?: string;
  sectorName?: string;
  etaMins?: number;
}

export const JourneyNoticeCard: React.FC<JourneyNoticeCardProps> = ({
  vehicleName = 'Bus 1',
  sectorName = 'G-10',
  etaMins = 7,
}) => {
  return (
    <View style={styles.journeyNoticeBox}>
      <View style={styles.pulseDot} />
      <View style={styles.journeyTextCol}>
        <Text style={styles.journeyTitle}>Active Morning Route In Progress</Text>
        <Text style={styles.journeySub}>
          {vehicleName} is currently approaching {sectorName}. Next stop within 500m geofence in ~{etaMins} mins.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  journeyNoticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    gap: 12,
  },
  pulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },
  journeyTextCol: {
    flex: 1,
  },
  journeyTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E40AF',
  },
  journeySub: {
    fontSize: 11,
    color: '#3B82F6',
    marginTop: 2,
    lineHeight: 16,
  },
});
