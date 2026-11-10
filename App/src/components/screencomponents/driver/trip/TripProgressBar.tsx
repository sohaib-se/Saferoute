import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TripProgressBarProps {
  label: string;
  completed: number;
  total: number;
  secondaryLabel?: string;
  barColor?: string;
}

export const TripProgressBar: React.FC<TripProgressBarProps> = ({
  label,
  completed,
  total,
  secondaryLabel,
  barColor = '#007AFF',
}) => {
  const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.title}>{label}</Text>
        <Text style={styles.countText}>
          {completed}/{total} ({percent}%)
        </Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percent}%`, backgroundColor: barColor },
          ]}
        />
      </View>

      {secondaryLabel && (
        <Text style={styles.subText}>{secondaryLabel}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6EFF7',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  countText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#007AFF',
  },
  track: {
    height: 7,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  subText: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 6,
    fontWeight: '500',
  },
});

