import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { ParentChatBanner } from '../../components/screencomponents/parent/chat/ParentChatBanner';
import {
  ParentMessageList,
  ChatMessage,
} from '../../components/screencomponents/parent/chat/ParentMessageList';
import { ParentChatInput } from '../../components/screencomponents/parent/chat/ParentChatInput';

interface ParentChatScreenProps {
  onBack?: () => void;
}

export const ParentChatScreen: React.FC<ParentChatScreenProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'Driver Hilal',
      text: 'Good morning! Morning pickup route started on time at 07:05 AM.',
      time: '07:06 AM',
      isMe: false,
    },
    {
      id: 'm-2',
      sender: 'Me',
      text: 'Good morning Hilal bhai, Ayesha is waiting at the main gate.',
      time: '07:15 AM',
      isMe: true,
    },
    {
      id: 'm-3',
      sender: 'Driver Hilal',
      text: 'Got it, arrived at Ring Road, will be at your gate in 5 minutes.',
      time: '07:18 AM',
      isMe: false,
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
        title="Chat with Driver"
        subtitle="Driver Hilal • Bus 1"
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ParentChatBanner />
        <ParentMessageList messages={messages} />
      </ScrollView>

      <ParentChatInput
        value={inputText}
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
