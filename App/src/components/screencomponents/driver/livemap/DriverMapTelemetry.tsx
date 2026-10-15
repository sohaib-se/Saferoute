import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface DriverMapTelemetryProps {
  isBroadcasting: boolean;
  onToggleBroadcast: () => void;
  channelName?: string;
  subscribersCount?: number;
}

export const DriverMapTelemetry: React.FC<DriverMapTelemetryProps> = ({
  isBroadcasting,
  onToggleBroadcast,
  channelName = 'van_bus_1',
  subscribersCount = 8,
}) => {
  return (
    <View style={styles.telemetryCard}>
      <View style={styles.telemetryHeader}>
        <View style={styles.pingRow}>
          <View
            style={[
              styles.pingDot,
              { backgroundColor: isBroadcasting ? '#10B981' : '#EF4444' },
            ]}
          />
          <Text style={styles.pingText}>
            {isBroadcasting
              ? 'GPS Active (Broadcasting every 5s)'
              : 'Broadcast Paused'}
          </Text>
        </View>
        <TouchableOpacity onPress={onToggleBroadcast} style={styles.toggleBtn}>
          <Text style={styles.toggleBtnText}>
            {isBroadcasting ? 'Pause' : 'Resume'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridStats}>
        <View style={styles.gridItem}>
          <Text style={styles.gridLabel}>Vehicle Channel</Text>
          <Text style={styles.gridValue}>{channelName}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.gridLabel}>Subscribers</Text>
          <Text style={styles.gridValue}>{subscribersCount} Parents Active</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.gridLabel}>Proximity Alert</Text>
          <Text style={styles.gridValue}>500m Auto-trigger</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.gridLabel}>Accuracy</Text>
          <Text style={styles.gridValue}>±4.2 meters</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  telemetryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  telemetryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  toggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  toggleBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  gridStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 8,
  },
  gridLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  gridValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
});

export default DriverMapTelemetry;
