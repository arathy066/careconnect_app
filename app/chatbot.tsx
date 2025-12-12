// app/chatbot.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BOT_MESSAGES = [
  "How can I assist you today?",
  "I provide support with tasks like reminders, medications and doctor appointments",
  "Feel free to ask!",
];

function BotBubble({ text }: { text: string }) {
  return (
    <View style={styles.messageRow}>
      <View style={styles.bubbleWrapper}>
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{text}</Text>
        </View>
        <View style={styles.bubbleTail} />
      </View>
    </View>
  );
}

export default function ChatBotScreen() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setInput("");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>ChatBot</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView
            style={styles.messages}
            contentContainerStyle={{ paddingVertical: 24 }}
          >
            {BOT_MESSAGES.map((msg) => (
              <BotBubble key={msg} text={msg} />
            ))}
          </ScrollView>

          {/* Input bar */}
          <View style={styles.inputContainer}>
            <View style={styles.inputPill}>
              <TextInput
                style={styles.input}
                placeholder="Send a message..."
                placeholderTextColor="#9CA3AF"
                value={input}
                onChangeText={setInput}
              />
              <TouchableOpacity onPress={handleSend} activeOpacity={0.8}>
                <Text style={styles.sendIcon}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // header
  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F4FF",
  },
  headerTitle: {
    fontSize: 36, // ✅ TITLE
    fontWeight: "600",
    color: "#124078",
  },
  closeIcon: {
    fontSize: 18, // ✅ rest = 18
    color: "#111827",
  },

  // messages
  messages: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageRow: {
    marginBottom: 12,
    flexDirection: "row",
  },
  bubbleWrapper: {
    maxWidth: "80%",
  },
  bubble: {
    backgroundColor: "#E3EDF7",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  bubbleText: {
    fontSize: 18, // ✅
    color: "#111827",
  },
  bubbleTail: {
    width: 10,
    height: 10,
    backgroundColor: "#E3EDF7",
    transform: [{ rotate: "45deg" }],
    marginLeft: 16,
    marginTop: -4,
  },

  // input
  inputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  inputPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FB",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 18, // ✅
    color: "#111827",
    marginRight: 10,
  },
  sendIcon: {
    fontSize: 18, // ✅
    color: "#1E3A8A",
  },
});
