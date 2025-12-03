import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="today" />
      <Stack.Screen name="appointments" />
      <Stack.Screen name="medications" /> 
    </Stack>
  );
}
