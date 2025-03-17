import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Ensure this is installed
import { useRouter } from "expo-router";

export default function UserFitnessScreen() {
  const router = useRouter();
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [workoutFrequency, setWorkoutFrequency] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [workoutPreference, setWorkoutPreference] = useState("Gym"); // Default to Gym

  const handleNext = () => {
    router.push("/(onboarding)/user-goals"); // Move to next onboarding step
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Fitness Preferences</Text>

      {/* Fitness Level */}
      <Text style={styles.label}>Current Fitness Level</Text>
      <Picker selectedValue={fitnessLevel} onValueChange={setFitnessLevel} style={styles.picker}>
        <Picker.Item label="Select Fitness Level" value="" />
        <Picker.Item label="Beginner" value="Beginner" />
        <Picker.Item label="Intermediate" value="Intermediate" />
        <Picker.Item label="Advanced" value="Advanced" />
      </Picker>

      {/* Workout Type */}
      <Text style={styles.label}>Preferred Workout Type</Text>
      <Picker selectedValue={workoutType} onValueChange={setWorkoutType} style={styles.picker}>
        <Picker.Item label="Select Workout Type" value="" />
        <Picker.Item label="Strength Training" value="Strength Training" />
        <Picker.Item label="Cardio" value="Cardio" />
        <Picker.Item label="Yoga & Flexibility" value="Yoga & Flexibility" />
        <Picker.Item label="Mixed Workouts" value="Mixed Workouts" />
      </Picker>

      {/* Workout Frequency */}
      <Text style={styles.label}>How often do you work out?</Text>
      <Picker selectedValue={workoutFrequency} onValueChange={setWorkoutFrequency} style={styles.picker}>
        <Picker.Item label="Select Frequency" value="" />
        <Picker.Item label="0-1 times per week" value="0-1" />
        <Picker.Item label="2-3 times per week" value="2-3" />
        <Picker.Item label="4-5 times per week" value="4-5" />
        <Picker.Item label="6+ times per week" value="6+" />
      </Picker>

      {/* Workout Duration */}
      <Text style={styles.label}>How long are your workouts?</Text>
      <Picker selectedValue={workoutDuration} onValueChange={setWorkoutDuration} style={styles.picker}>
        <Picker.Item label="Select Duration" value="" />
        <Picker.Item label="Under 30 min" value="Under 30 min" />
        <Picker.Item label="30-45 min" value="30-45 min" />
        <Picker.Item label="45-60 min" value="45-60 min" />
        <Picker.Item label="Over 1 hour" value="Over 1 hour" />
      </Picker>

      {/* Workout Preference Toggle */}
      <Text style={styles.label}>Where do you prefer to work out?</Text>
      <View style={styles.toggleContainer}>
        <Button
          title="Gym"
          onPress={() => setWorkoutPreference("Gym")}
          color={workoutPreference === "Gym" ? "#007AFF" : "#ccc"}
        />
        <Button
          title="Home"
          onPress={() => setWorkoutPreference("Home")}
          color={workoutPreference === "Home" ? "#007AFF" : "#ccc"}
        />
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <Button title="Back" onPress={() => router.back()} />
        <Button title="Next" onPress={handleNext} disabled={!fitnessLevel || !workoutType || !workoutFrequency || !workoutDuration} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    alignSelf: "flex-start",
  },
  picker: {
    width: "100%",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginVertical: 5,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
});
