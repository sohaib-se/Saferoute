import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { DriverChatBanner } from '../../components/screencomponents/driver/chat/DriverChatBanner';
import {
  DriverMessageList,
  ChatMessage,
} from '../../components/screencomponents/driver/chat/DriverMessageList';
import { DriverChatInput } from '../../components/screencomponents/driver/chat/DriverChatInput';

interface DriverChatScreenProps {
  onBack?: () => void;
}

export const DriverChatScreen: React.FC<DriverChatScreenProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'Zeeshan Malik (Parent)',
      text: 'Good morning Hilal bhai, Ayesha is waiting at the main gate.',
      time: '07:15 AM',
      isMe: false,
    },
    {
      id: 'm-2',
      sender: 'Me',
      text: 'Got it, arrived at Ring Road, will be at your gate in 5 minutes.',
      time: '07:18 AM',
      isMe: true,
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'Me',
      text: inputText.trim(),
      time: 'Now',
      isMe: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Parent Communications"
        subtitle="Direct Non-urgent Chat Thread"
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <DriverChatBanner />
        <DriverMessageList messages={messages} />
      </ScrollView>

      <DriverChatInput
        text={inputText}
        onChangeText={setInputText}
        onSend={handleSend}
      />
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
    paddingBottom: 20,
  },
});
