import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { ParentContactCard } from '../../components/screencomponents/driver/call/ParentContactCard';
import { useDriverTrip } from '../../context/DriverTripContext';
import { useCall } from '../../context/CallContext';
import { colors, radii, shadows } from '../../lib/theme';

interface DriverCallParentScreenProps {
  onBack?: () => void;
  onOpenNotifications?: () => void;
}

export const DriverCallParentScreen: React.FC<DriverCallParentScreenProps> = ({
  onBack,
  onOpenNotifications,
}) => {
  const { students, tripNotifications, vehicleName } = useDriverTrip();
  const { startCall } = useCall();
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = tripNotifications.filter((n) => !n.isRead).length;

  const handleStartParentCall = (
    parentName: string,
    studentName: string,
    phone: string,
    parentUserId?: string
  ) => {
    if (!parentUserId) {
      if (phone && phone !== 'N/A') {
        Alert.alert(
          'Parent Call',
          `Direct in-app VoIP connection is unavailable. Would you like to place a cellular phone call to ${phone}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Call Parent', onPress: () => Linking.openURL(`tel:${phone}`) },
          ]
        );
      } else {
        Alert.alert('No Contact Info', 'No phone number or VoIP account registered for this parent.');
      }
      return;
    }

    startCall({
      calleeId: parentUserId,
      calleeRole: 'parent',
      calleeName: parentName,
      studentName,
      vehicleName,
    });
  };

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
            onStartInAppCall={handleStartParentCall}
          />
        ))}
      </ScrollView>
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
});

export default DriverCallParentScreen;
