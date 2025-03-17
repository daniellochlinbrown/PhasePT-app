import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcomePage" options={{ title: "Welcome" }} />
      <Stack.Screen name="user-info" options={{ title: "User Info" }} />
      <Stack.Screen name="importPeriodDates" options={{ title: "Period Tracking" }} />
      <Stack.Screen name="user-fitness" options={{ title: "Fitness Preferences" }} />
      <Stack.Screen name="user-goals" options={{ title: "Fitness Goals" }} />
      <Stack.Screen name="summary" options={{ title: "Review & Finish" }} />
    </Stack>
  );
}
