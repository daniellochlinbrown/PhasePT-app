import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

export default function UserGoalsScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [secondaryGoal, setSecondaryGoal] = useState("");
  const [intensity, setIntensity] = useState("");
  const [motivation, setMotivation] = useState("");

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      router.push("/(onboarding)/summary"); // Move to final onboarding review
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back(); // Go back to the previous onboarding screen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Fitness Goals</Text>

      {/* Step 1: Primary Goal */}
      {step === 1 && (
        <>
          <Text style={styles.label}>What is your main fitness goal?</Text>
          <Picker selectedValue={primaryGoal} onValueChange={setPrimaryGoal} style={styles.picker}>
            <Picker.Item label="Select a Goal" value="" />
            <Picker.Item label="Build Muscle" value="Build Muscle" />
            <Picker.Item label="Lose Weight" value="Lose Weight" />
            <Picker.Item label="Improve Endurance" value="Improve Endurance" />
            <Picker.Item label="Stay Active" value="Stay Active" />
          </Picker>
        </>
      )}

      {/* Step 2: Secondary Goal */}
      {step === 2 && (
        <>
          <Text style={styles.label}>Do you have a secondary goal?</Text>
          <Picker selectedValue={secondaryGoal} onValueChange={setSecondaryGoal} style={styles.picker}>
            <Picker.Item label="None" value="" />
            <Picker.Item label="Build Muscle" value="Build Muscle" />
            <Picker.Item label="Lose Weight" value="Lose Weight" />
            <Picker.Item label="Improve Endurance" value="Improve Endurance" />
            <Picker.Item label="Stay Active" value="Stay Active" />
          </Picker>
        </>
      )}

      {/* Step 3: Workout Intensity */}
      {step === 3 && (
        <>
          <Text style={styles.label}>Preferred Workout Intensity</Text>
          <Picker selectedValue={intensity} onValueChange={setIntensity} style={styles.picker}>
            <Picker.Item label="Select Intensity" value="" />
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Moderate" value="Moderate" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </>
      )}

      {/* Step 4: Motivation */}
      {step === 4 && (
        <>
          <Text style={styles.label}>What motivates you to work out?</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your motivation here..."
            value={motivation}
            onChangeText={setMotivation}
            multiline
            placeholderTextColor="#B565A7"
          />
        </>
      )}

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <Button title="Back" onPress={handleBack} disabled={step === 1} />
        <Button
          title={step === 4 ? "Next" : "Continue"}
          onPress={handleNext}
          disabled={
            (step === 1 && !primaryGoal) ||
            (step === 3 && !intensity)
          }
          color="#D73895" // Pink button for consistency
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
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D73895", // Pink border
    marginVertical: 10,
    backgroundColor: "white",
    minHeight: 50,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
});
