import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />      {/* First step */}
      <Stack.Screen name="calendar" />   {/* Period tracking */}
      <Stack.Screen name="fitness" />    {/* Fitness level */}
      <Stack.Screen name="goals" />      {/* Fitness goals */}
      <Stack.Screen name="summary" />    {/* Final summary */}
    </Stack>
  );
}
