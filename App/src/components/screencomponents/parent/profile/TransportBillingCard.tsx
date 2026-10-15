import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TransportBillingCardProps {
  amount?: string;
  month?: string;
  status?: string;
}

export const TransportBillingCard: React.FC<TransportBillingCardProps> = ({
  amount = 'Rs. 5,000',
  month = 'October 2026',
  status = 'PAID',
}) => {
  return (
    <View style={styles.feeCard}>
      <View style={styles.feeHeader}>
        <View>
          <Text style={styles.feeTitle}>Monthly Transport Fee</Text>
          <Text style={styles.feeSub}>{month} Billing Cycle</Text>
        </View>
        <View style={styles.paidBadge}>
          <Text style={styles.paidBadgeText}>{status}</Text>
        </View>
      </View>
      <Text style={styles.feeAmount}>{amount}</Text>
      <Text style={styles.feeNote}>Managed directly via School Administration</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  feeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  feeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  feeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  feeSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  paidBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  paidBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  feeAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  feeNote: {
    fontSize: 11,
    color: '#64748B',
  },
});
