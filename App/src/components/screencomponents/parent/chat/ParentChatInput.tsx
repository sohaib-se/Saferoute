import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ParentChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export const ParentChatInput: React.FC<ParentChatInputProps> = ({
  value,
  onChangeText,
  onSend,
}) => {
  return (
    <View style={styles.inputBar}>
      <TextInput
        style={styles.textInput}
        placeholder="Type message to driver..."
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        style={styles.sendBtn}
        onPress={onSend}
        activeOpacity={0.8}
      >
        <Ionicons name="send" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
