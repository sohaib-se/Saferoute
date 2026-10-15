import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface DriverMessageListProps {
  messages: ChatMessage[];
}

export const DriverMessageList: React.FC<DriverMessageListProps> = ({ messages }) => {
  return (
    <View style={styles.container}>
      {messages.map((m) => (
        <View
          key={m.id}
          style={[styles.msgWrapper, m.isMe ? styles.myMsgWrapper : styles.otherMsgWrapper]}
        >
          {!m.isMe && <Text style={styles.senderLabel}>{m.sender}</Text>}
          <View style={[styles.bubble, m.isMe ? styles.myBubble : styles.otherBubble]}>
            <Text style={[styles.msgText, m.isMe ? styles.myMsgText : styles.otherMsgText]}>
              {m.text}
            </Text>
            <Text style={[styles.msgTime, m.isMe ? styles.myMsgTime : styles.otherMsgTime]}>
              {m.time}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  msgWrapper: {
    marginBottom: 12,
  },
  myMsgWrapper: {
    alignItems: 'flex-end',
  },
  otherMsgWrapper: {
    alignItems: 'flex-start',
  },
  senderLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 4,
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: '#2563EB',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  msgText: {
    fontSize: 13,
    lineHeight: 18,
  },
  myMsgText: {
    color: '#FFFFFF',
  },
  otherMsgText: {
    color: '#0F172A',
  },
  msgTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myMsgTime: {
    color: '#DBEAFE',
  },
  otherMsgTime: {
    color: '#94A3B8',
  },
});

export default DriverMessageList;
