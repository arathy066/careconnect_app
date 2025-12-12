import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ChatBotFabProps = {
  onPress?: () => void;
};

const ChatBotFab: React.FC<ChatBotFabProps> = ({ onPress }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.circle}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Dark blue chat bubble icon */}
        <View style={styles.iconBackground}>
          <View style={styles.chatBubble}>
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={[styles.line, styles.shortLine]} />
          </View>
        </View>
        <Text style={styles.label}>ChatBot</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    right: 24,
    bottom: 80, // sits above your bottom nav
    alignItems: "center",
  },
  circle: {
    alignItems: "center",
  },
  iconBackground: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EEF2FF", // light indigo
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  chatBubble: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#0B3B78", // dark blue
    paddingHorizontal: 6,
    paddingVertical: 6,
    justifyContent: "center",
  },
  line: {
    height: 2,
    borderRadius: 999,
    backgroundColor: "white",
    marginBottom: 3,
  },
  shortLine: {
    width: "60%",
  },
  label: {
    fontSize: 16,
    color: "#374151",
  },
});

export default ChatBotFab;
