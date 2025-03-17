import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

export default function UserGoalsScreen() {
  const router = useRouter();
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [secondaryGoal, setSecondaryGoal] = useState("");
  const [intensity, setIntensity] = useState("");
  const [motivation, setMotivation] = useState("");

  const handleNext = () => {
    router.push("/(onboarding)/summary"); // ✅ Move to final onboarding review
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Fitness Goals</Text>

      {/* Primary Goal */}
      <Text style={styles.label}>What is your main fitness goal?</Text>
      <Picker selectedValue={primaryGoal} onValueChange={setPrimaryGoal} style={styles.picker}>
        <Picker.Item label="Select a Goal" value="" />
        <Picker.Item label="Build Muscle" value="Build Muscle" />
        <Picker.Item label="Lose Weight" value="Lose Weight" />
        <Picker.Item label="Improve Endurance" value="Improve Endurance" />
        <Picker.Item label="Stay Active" value="Stay Active" />
      </Picker>

      {/* Secondary Goal (Optional) */}
      <Text style={styles.label}>Do you have a secondary goal?</Text>
      <Picker selectedValue={secondaryGoal} onValueChange={setSecondaryGoal} style={styles.picker}>
        <Picker.Item label="None" value="" />
        <Picker.Item label="Build Muscle" value="Build Muscle" />
        <Picker.Item label="Lose Weight" value="Lose Weight" />
        <Picker.Item label="Improve Endurance" value="Improve Endurance" />
        <Picker.Item label="Stay Active" value="Stay Active" />
      </Picker>

      {/* Workout Intensity */}
      <Text style={styles.label}>Preferred Workout Intensity</Text>
      <Picker selectedValue={intensity} onValueChange={setIntensity} style={styles.picker}>
        <Picker.Item label="Select Intensity" value="" />
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Moderate" value="Moderate" />
        <Picker.Item label="High" value="High" />
      </Picker>

      {/* Motivation */}
      <Text style={styles.label}>What motivates you to work out?</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your motivation here..."
        value={motivation}
        onChangeText={setMotivation}
        multiline
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <Button title="Back" onPress={() => router.back()} />
        <Button title="Next" onPress={handleNext} disabled={!primaryGoal || !intensity} />
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
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    minHeight: 50,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
});
