import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { shadows } from '../../../lib/theme';

interface LoginFormProps {
  selectedRole: 'parent' | 'driver';
  onRoleChange?: (role: 'parent' | 'driver') => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ selectedRole }) => {
  const { login, isLoading } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState<'identifier' | 'password' | null>(null);

  const handleSubmit = async () => {
    setErrorMessage('');
    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email/ID and password.');
      return;
    }

    const res = await login({
      identifier: identifier.trim(),
      password: password.trim(),
      role: selectedRole,
    });

    if (!res.success) {
      setErrorMessage(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  return (
    <View style={styles.sheetCard}>
      {/* Title & Subtitle */}
      <Text style={styles.sheetTitle}>Login to Your Account</Text>
      <Text style={styles.sheetSubtitle}>
        Access your SafeRoute {selectedRole === 'parent' ? 'Parent' : 'Driver'} Portal
      </Text>

      {/* Error Callout */}
      {errorMessage ? (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={17} color="#EF4444" />
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {/* Email Address Input */}
      <View
        style={[
          styles.inputContainer,
          focusedField === 'identifier' && styles.inputContainerFocused,
        ]}
      >
        <Ionicons
          name="mail-outline"
          size={20}
          color={focusedField === 'identifier' ? '#007AFF' : '#94A3B8'}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder={selectedRole === 'parent' ? 'Email Address or Login ID (e.g. 1201)' : 'Email Address or Driver ID (e.g. 9584)'}
          placeholderTextColor="#94A3B8"
          value={identifier}
          onChangeText={setIdentifier}
          onFocus={() => setFocusedField('identifier')}
          onBlur={() => setFocusedField(null)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View
        style={[
          styles.inputContainer,
          focusedField === 'password' && styles.inputContainerFocused,
        ]}
      >
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={focusedField === 'password' ? '#007AFF' : '#94A3B8'}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#94A3B8"
          value={password}
          onChangeText={setPassword}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeToggleBtn}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#94A3B8"
          />
        </TouchableOpacity>
      </View>

      {/* Remember Me */}
      <View style={styles.optionsRow}>
        <TouchableOpacity
          style={styles.rememberMeTouchable}
          onPress={() => setRememberMe(!rememberMe)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
            {rememberMe && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
          </View>
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>
      </View>

      {/* Primary Login Button */}
      <TouchableOpacity
        style={[styles.loginBtn, isLoading && styles.loginBtnDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.85}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <View style={styles.loginBtnContent}>
            <Text style={styles.loginBtnText}>Login</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E6EFF7',
    ...shadows.cardHover,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  sheetSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 14,
    fontWeight: '500',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 10,
    borderRadius: 12,
    gap: 8,
    marginBottom: 14,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  inputContainerFocused: {
    borderColor: '#007AFF',
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#0F172A',
    fontWeight: '500',
    paddingVertical: 0,
  },
  eyeToggleBtn: {
    padding: 6,
    marginLeft: 6,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 18,
  },
  rememberMeTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  rememberMeText: {
    fontSize: 12.5,
    color: '#64748B',
    fontWeight: '500',
    marginLeft: 8,
  },
  loginBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  loginBtnDisabled: {
    opacity: 0.7,
  },
  loginBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default LoginForm;
