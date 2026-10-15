import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { CallDisclaimerCard } from '../../components/screencomponents/parent/calldriver/CallDisclaimerCard';
import { DriverDetailsCard } from '../../components/screencomponents/parent/calldriver/DriverDetailsCard';
import { SchoolDirectoryCard } from '../../components/screencomponents/parent/calldriver/SchoolDirectoryCard';

interface ParentCallDriverScreenProps {
  onBack?: () => void;
  onOpenChat?: () => void;
}

export const ParentCallDriverScreen: React.FC<ParentCallDriverScreenProps> = ({
  onBack,
  onOpenChat,
}) => {
  return (
    <View style={styles.container}>
      <Header
        title="Driver & School Contact"
        subtitle="Direct One-tap Telephony Access"
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <CallDisclaimerCard />

        <DriverDetailsCard
          driverName="Hilal"
          phone="03124124"
          vehicleName="Bus 1"
          plateNumber="ICT-4921"
          licenseNumber="DL-32412"
          onOpenChat={onOpenChat}
        />

        <SchoolDirectoryCard />
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
