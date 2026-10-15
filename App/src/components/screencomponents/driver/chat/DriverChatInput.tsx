import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DriverChatInputProps {
  text: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
}

export const DriverChatInput: React.FC<DriverChatInputProps> = ({
  text,
  onChangeText,
  onSend,
  placeholder = 'Type message to parent...',
}) => {
  return (
    <View style={styles.inputBar}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={text}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.sendBtn} onPress={onSend} activeOpacity={0.8}>
        <Ionicons name="send" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 13,
    color: '#0F172A',
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DriverChatInput;
