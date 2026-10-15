import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChildProfileItem {
  id: string;
  name: string;
  initials: string;
  grade: string;
  rollNo: string;
  vanInfo: string;
}

export const RegisteredChildrenCard: React.FC = () => {
  const children: ChildProfileItem[] = [
    {
      id: '1',
      name: 'Ayesha Malik',
      initials: 'AM',
      grade: 'Grade 4 - C',
      rollNo: '1482',
      vanInfo: 'Assigned: Bus 1 (Driver: Hilal)',
    },
    {
      id: '2',
      name: 'Zain Malik',
      initials: 'ZM',
      grade: 'Grade 2 - A',
      rollNo: '1483',
      vanInfo: 'Assigned: Bus 1 (Driver: Hilal)',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Registered Children ({children.length})</Text>
      <View style={styles.childBox}>
        {children.map((child, index) => (
          <React.Fragment key={child.id}>
            <View style={styles.childRow}>
              <View style={styles.childAvatar}>
                <Text style={styles.childAvatarText}>{child.initials}</Text>
              </View>
              <View style={styles.childDetails}>
                <Text style={styles.childName}>{child.name}</Text>
                <Text style={styles.childMeta}>
                  {child.grade} • Roll #{child.rollNo}
                </Text>
                <Text style={styles.childVan}>{child.vanInfo}</Text>
              </View>
            </View>
            {index < children.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
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
  childBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  childRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  childAvatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2563EB',
  },
  childDetails: {
    flex: 1,
  },
  childName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  childMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  childVan: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
});
