import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DriverAssignmentsBoxProps {
  vehicle?: string;
  route?: string;
  license?: string;
  licenseType?: string;
  loginId?: string;
}

export const DriverAssignmentsBox: React.FC<DriverAssignmentsBoxProps> = ({
  vehicle = 'Bus 1 (ICT-4921)',
  route = 'Morning Sector G-10',
  license = '32412',
  licenseType = 'Heavy Transport',
  loginId = '9584',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Transport Assignments</Text>

      <View style={styles.detailBox}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Assigned Bus</Text>
          <Text style={styles.detailValue}>{vehicle}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Assigned Route</Text>
          <Text style={styles.detailValue}>{route}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>License Number</Text>
          <Text style={styles.detailValue}>{license}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>License Type</Text>
          <Text style={styles.detailValue}>{licenseType}</Text>
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
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  detailBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  detailLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
});

export default DriverAssignmentsBox;
