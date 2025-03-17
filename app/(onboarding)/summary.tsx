import { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { saveOnboardingStatus } from "@/utils/authStorage";

export default function OnboardingSummary() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    ageRange: "",
    height: "",
    weight: "",
    fitnessLevel: "",
    workoutType: "",
    workoutFrequency: "",
    workoutDuration: "",
    workoutPreference: "",
    primaryGoal: "",
    secondaryGoal: "",
    intensity: "",
    motivation: "",
  });

  useEffect(() => {
    // TODO: Retrieve stored user input from state management or AsyncStorage
    setUserData({
      name: "Alex", // Example data
      ageRange: "25-34",
      height: "170 cm",
      weight: "68 kg",
      fitnessLevel: "Intermediate",
      workoutType: "Strength Training",
      workoutFrequency: "4-5 times per week",
      workoutDuration: "45-60 min",
      workoutPreference: "Gym",
      primaryGoal: "Build Muscle",
      secondaryGoal: "Stay Active",
      intensity: "Moderate",
      motivation: "I want to feel stronger and healthier.",
    });
  }, []);

  const handleCompleteOnboarding = async () => {
    await saveOnboardingStatus();
    router.replace("/(tabs)/home"); // ✅ Move to the main app
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Review Your Information</Text>

      {/* User Info */}
      <Text style={styles.sectionTitle}>User Info</Text>
      <Text>Name: {userData.name || "Not provided"}</Text>
      <Text>Age Range: {userData.ageRange}</Text>
      <Text>Height: {userData.height}</Text>
      <Text>Weight: {userData.weight}</Text>

      {/* Fitness Preferences */}
      <Text style={styles.sectionTitle}>Fitness Preferences</Text>
      <Text>Fitness Level: {userData.fitnessLevel}</Text>
      <Text>Preferred Workout: {userData.workoutType}</Text>
      <Text>Workout Frequency: {userData.workoutFrequency}</Text>
      <Text>Workout Duration: {userData.workoutDuration}</Text>
      <Text>Workout Preference: {userData.workoutPreference}</Text>

      {/* Fitness Goals */}
      <Text style={styles.sectionTitle}>Fitness Goals</Text>
      <Text>Primary Goal: {userData.primaryGoal}</Text>
      <Text>Secondary Goal: {userData.secondaryGoal || "None"}</Text>
      <Text>Workout Intensity: {userData.intensity}</Text>
      <Text>Motivation: "{userData.motivation}"</Text>

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <Button title="Back" onPress={() => router.back()} />
        <Button title="Confirm & Continue" onPress={handleCompleteOnboarding} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
  },
});
