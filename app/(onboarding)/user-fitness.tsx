import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

export default function UserFitnessScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [workoutFrequency, setWorkoutFrequency] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [workoutPreference, setWorkoutPreference] = useState("Gym"); // Default to Gym

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      router.push("/(onboarding)/user-goals"); // Move to next onboarding step
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back(); // Go back to previous onboarding screen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Fitness Preferences</Text>

      {/* Step 1: Fitness Level */}
      {step === 1 && (
        <>
          <Text style={styles.label}>Current Fitness Level</Text>
          <Picker selectedValue={fitnessLevel} onValueChange={setFitnessLevel} style={styles.picker}>
            <Picker.Item label="Select Fitness Level" value="" />
            <Picker.Item label="Beginner" value="Beginner" />
            <Picker.Item label="Intermediate" value="Intermediate" />
            <Picker.Item label="Advanced" value="Advanced" />
          </Picker>
        </>
      )}

      {/* Step 2: Workout Type */}
      {step === 2 && (
        <>
          <Text style={styles.label}>Preferred Workout Type</Text>
          <Picker selectedValue={workoutType} onValueChange={setWorkoutType} style={styles.picker}>
            <Picker.Item label="Select Workout Type" value="" />
            <Picker.Item label="Strength Training" value="Strength Training" />
            <Picker.Item label="Cardio" value="Cardio" />
            <Picker.Item label="Yoga & Flexibility" value="Yoga & Flexibility" />
            <Picker.Item label="Mixed Workouts" value="Mixed Workouts" />
          </Picker>
        </>
      )}

      {/* Step 3: Workout Frequency */}
      {step === 3 && (
        <>
          <Text style={styles.label}>How often do you work out?</Text>
          <Picker selectedValue={workoutFrequency} onValueChange={setWorkoutFrequency} style={styles.picker}>
            <Picker.Item label="Select Frequency" value="" />
            <Picker.Item label="0-1 times per week" value="0-1" />
            <Picker.Item label="2-3 times per week" value="2-3" />
            <Picker.Item label="4-5 times per week" value="4-5" />
            <Picker.Item label="6+ times per week" value="6+" />
          </Picker>
        </>
      )}

      {/* Step 4: Workout Duration */}
      {step === 4 && (
        <>
          <Text style={styles.label}>How long are your workouts?</Text>
          <Picker selectedValue={workoutDuration} onValueChange={setWorkoutDuration} style={styles.picker}>
            <Picker.Item label="Select Duration" value="" />
            <Picker.Item label="Under 30 min" value="Under 30 min" />
            <Picker.Item label="30-45 min" value="30-45 min" />
            <Picker.Item label="45-60 min" value="45-60 min" />
            <Picker.Item label="Over 1 hour" value="Over 1 hour" />
          </Picker>
        </>
      )}

      {/* Step 5: Workout Preference */}
      {step === 5 && (
        <>
          <Text style={styles.label}>Where do you prefer to work out?</Text>
          <View style={styles.toggleContainer}>
            <Button
              title="Gym"
              onPress={() => setWorkoutPreference("Gym")}
              color={workoutPreference === "Gym" ? "#D73895" : "#ccc"} // Pink when selected
            />
            <Button
              title="Home"
              onPress={() => setWorkoutPreference("Home")}
              color={workoutPreference === "Home" ? "#D73895" : "#ccc"} // Pink when selected
            />
          </View>
        </>
      )}

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <Button title="Back" onPress={handleBack} disabled={step === 1} />
        <Button
          title={step === 5 ? "Next" : "Continue"}
          onPress={handleNext}
          disabled={
            (step === 1 && !fitnessLevel) ||
            (step === 2 && !workoutType) ||
            (step === 3 && !workoutFrequency) ||
            (step === 4 && !workoutDuration)
          }
          color="#D73895" // Pink button
        />
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
    backgroundColor: "#FCE4EC", // Light pink background
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8E44AD", // Purple
    textAlign: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6C3483", // Dark purple
    marginBottom: 5,
  },
  picker: {
    width: "90%",
    backgroundColor: "#E1BEE7", // Soft purple
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
