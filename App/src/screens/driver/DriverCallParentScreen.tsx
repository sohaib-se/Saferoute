import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { ParentContactCard } from '../../components/screencomponents/driver/call/ParentContactCard';
import { InAppCallModal } from '../../components/screencomponents/driver/call/InAppCallModal';
import { useDriverTrip } from '../../context/DriverTripContext';
import { colors, radii, shadows } from '../../lib/theme';

interface DriverCallParentScreenProps {
  onBack?: () => void;
  onOpenNotifications?: () => void;
}

export const DriverCallParentScreen: React.FC<DriverCallParentScreenProps> = ({
  onBack,
  onOpenNotifications,
}) => {
  const { students, startInAppCall, tripNotifications } = useDriverTrip();
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = tripNotifications.filter((n) => !n.isRead).length;

  const filtered = students.filter(
    (s) =>
      s.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.stopAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header
        title="Call Parent Directory"
        subtitle="In-app voice & cellular directory"
        onBack={onBack}
        onNotificationPress={onOpenNotifications}
        notificationBadgeCount={unreadCount}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={17} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search parent name, student, or stop..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={17} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Assigned Route Guardians ({filtered.length})</Text>
          <Text style={styles.sectionSub}>Tap In-App Call for instant voice connection</Text>
        </View>

        {/* Parent Cards */}
        {filtered.map((st) => (
          <ParentContactCard
            key={st.id}
            student={st}
            onStartInAppCall={startInAppCall}
          />
        ))}

        {/* School Administration Contact Card */}
        <View style={styles.schoolCard}>
          <View style={styles.schoolIconCircle}>
            <Ionicons name="business" size={20} color="#007AFF" />
          </View>
          <View style={styles.schoolInfoCol}>
            <Text style={styles.schoolTitle}>School Transport Control Desk</Text>
            <Text style={styles.schoolDesc}>Direct line for route delays, breakdowns, or road closures.</Text>
            <Text style={styles.schoolPhone}>051-111-222-333 • Extension 104</Text>
          </View>
          <TouchableOpacity
            style={styles.schoolCallBtn}
            onPress={() => startInAppCall('School Transport Desk', 'Administration', '051-111-222')}
            activeOpacity={0.75}
          >
            <Ionicons name="call" size={15} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* In-App VoIP Call Modal Overlay */}
      <InAppCallModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9FD',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: '#E6EFF7',
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 14,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
    fontWeight: '500',
  },
  schoolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: radii.xl,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    marginTop: 8,
    marginBottom: 16,
    gap: 12,
  },
  schoolIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  schoolInfoCol: {
    flex: 1,
  },
  schoolTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  schoolDesc: {
    fontSize: 11,
    color: '#3B82F6',
    marginTop: 2,
    lineHeight: 15,
  },
  schoolPhone: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1D4ED8',
    marginTop: 3,
  },
  schoolCallBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.primaryGlow,
  },
});

export default DriverCallParentScreen;
