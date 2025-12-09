import React, { FC, useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  activeColor?: string;
  inActiveColor?: string;
}

const CustomSwitch: FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  activeColor = "#033da0ff",
  inActiveColor = "#f4f3f4",
}) => {
  // Use Animated.Value for smooth transition
  const translateX = useRef<Animated.Value>(
    new Animated.Value(value ? 20 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 20 : 0, // Distance to move the thumb
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value, translateX]);

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <View
        style={[
          styles.track,
          { backgroundColor: value ? activeColor : "#767577" },
        ]}
      >
        {/* THE THUMB */}
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
              // Thumb Color Logic: Change color based on 'value'
              backgroundColor: value ? "#ffffff" : inActiveColor,
            },
          ]}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 30,
    borderRadius: 15, // Half of height to make it pill-shaped
    padding: 2, // Spacing between track edge and thumb
    justifyContent: "center",
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13, // Make it a circle
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CustomSwitch;
