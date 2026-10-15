import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface ParentMessageListProps {
  messages: ChatMessage[];
}

export const ParentMessageList: React.FC<ParentMessageListProps> = ({ messages }) => {
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
    paddingVertical: 8,
  },
  msgWrapper: {
    marginBottom: 12,
    maxWidth: '82%',
  },
  myMsgWrapper: {
    alignSelf: 'flex-end',
  },
  otherMsgWrapper: {
    alignSelf: 'flex-start',
  },
  senderLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
    marginLeft: 6,
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
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
    color: '#1E293B',
  },
  msgTime: {
    fontSize: 9,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myMsgTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherMsgTime: {
    color: '#94A3B8',
  },
});
