import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ParentResidenceCardProps {
  address?: string;
  email?: string;
  loginId?: string;
}

export const ParentResidenceCard: React.FC<ParentResidenceCardProps> = ({
  address = 'Khatme Nabuwat Chowk, Ghari Rashida',
  email = 'zeeshan@gmail.com',
  loginId = '1201',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Contact & Residence</Text>
      <View style={styles.detailBox}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Home Address</Text>
          <Text style={styles.detailValue}>{address}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email</Text>
          <Text style={styles.detailValue}>{email}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>App Login Code</Text>
          <Text style={styles.detailValue}>{loginId}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  detailBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  detailRow: {
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 11,
    color: '#94A3B8',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
});
