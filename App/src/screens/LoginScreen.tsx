import React from 'react';
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginHeader } from '../components/screencomponents/login/LoginHeader';
import { LoginForm } from '../components/screencomponents/login/LoginForm';
import { LoginFooter } from '../components/screencomponents/login/LoginFooter';

export const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentWrapper}>
            <LoginHeader />
            <LoginForm />
            <LoginFooter />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  contentWrapper: {
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
});

export default LoginScreen;
