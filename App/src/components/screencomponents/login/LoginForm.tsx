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

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'driver' | 'parent'>('parent');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setErrorMessage('');
    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Please enter both your Login ID and password.');
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

  const fillQuickCredentials = (id: string, pass: string, role: 'driver' | 'parent') => {
    setSelectedRole(role);
    setIdentifier(id);
    setPassword(pass);
    setErrorMessage('');
  };

  return (
    <View style={styles.formCard}>
      {/* Role Selection Tabs */}
      <View style={styles.roleTabs}>
        <TouchableOpacity
          style={[styles.roleTab, selectedRole === 'parent' && styles.activeRoleTab]}
          onPress={() => {
            setSelectedRole('parent');
            setErrorMessage('');
          }}
          activeOpacity={0.8}
        >
          <Ionicons
            name="person"
            size={16}
            color={selectedRole === 'parent' ? '#2563EB' : '#64748B'}
          />
          <Text
            style={[
              styles.roleTabText,
              selectedRole === 'parent' && styles.activeRoleTabText,
            ]}
          >
            Parent Portal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleTab, selectedRole === 'driver' && styles.activeRoleTab]}
          onPress={() => {
            setSelectedRole('driver');
            setErrorMessage('');
          }}
          activeOpacity={0.8}
        >
          <Ionicons
            name="bus"
            size={16}
            color={selectedRole === 'driver' ? '#2563EB' : '#64748B'}
          />
          <Text
            style={[
              styles.roleTabText,
              selectedRole === 'driver' && styles.activeRoleTabText,
            ]}
          >
            Driver Portal
          </Text>
        </TouchableOpacity>
      </View>

      {/* Error Notice */}
      {errorMessage ? (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={16} color="#DC2626" />
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {/* Identifier Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {selectedRole === 'driver' ? 'Driver Login Code / Phone' : 'Parent Login Code / Phone'}
        </Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="key-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={selectedRole === 'driver' ? 'e.g. 9584 or 03124124' : 'e.g. 1201 or 312412412'}
            placeholderTextColor="#94A3B8"
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#94A3B8"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color="#94A3B8"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <>
            <Text style={styles.submitButtonText}>
              Sign In to {selectedRole === 'driver' ? 'Driver Portal' : 'Parent Portal'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </>
        )}
      </TouchableOpacity>

      {/* Quick Test Credential Pills (Loaded from live Supabase) */}
      <View style={styles.demoSection}>
        <Text style={styles.demoTitle}>Tap to autofill demo credentials from DB:</Text>
        <View style={styles.demoPills}>
          <TouchableOpacity
            style={styles.demoPill}
            onPress={() => fillQuickCredentials('9584', '9584', 'driver')}
          >
            <Ionicons name="bus" size={12} color="#1D4ED8" />
            <Text style={styles.demoPillText}>Driver Hilal (9584)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoPill}
            onPress={() => fillQuickCredentials('1201', '1201', 'parent')}
          >
            <Ionicons name="person" size={12} color="#1D4ED8" />
            <Text style={styles.demoPillText}>Parent Zeeshan (1201)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  roleTabs: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  roleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  activeRoleTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  roleTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  activeRoleTabText: {
    color: '#2563EB',
    fontWeight: '700',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    flex: 1,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F172A',
  },
  eyeIcon: {
    padding: 4,
  },
  submitButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 6,
    gap: 8,
  },
  submitButtonDisabled: {
    opacity: 0.65,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  demoSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  demoTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
    textAlign: 'center',
  },
  demoPills: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  demoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 5,
  },
  demoPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1D4ED8',
  },
});

export default LoginForm;
