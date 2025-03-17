import { SetStateAction, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function UserInfoScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [cycleRegularity, setCycleRegularity] = useState("");

  const handleNext = () => {
    // Store user info in state or AsyncStorage (if needed)
    router.push("/(onboarding)/user-fitness"); // Move to period tracking step
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell us about yourself</Text>

      {/* Name (optional) */}
      <TextInput 
        style={styles.input} 
        placeholder="Your Name (Optional)" 
        value={name} 
        onChangeText={setName} 
      />

      {/* Age Range */}
      <Picker selectedValue={ageRange} onValueChange={(itemValue: SetStateAction<string>) => setAgeRange(itemValue)} style={styles.picker}>
        <Picker.Item label="Select Age Range" value="" />
        <Picker.Item label="Under 18" value="<18" />
        <Picker.Item label="18-24" value="18-24" />
        <Picker.Item label="25-34" value="25-34" />
        <Picker.Item label="35-44" value="35-44" />
        <Picker.Item label="45+" value="45+" />
      </Picker>

      {/* Height & Weight */}
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Height (cm)" keyboardType="numeric" value={height} onChangeText={setHeight} />
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Weight (kg)" keyboardType="numeric" value={weight} onChangeText={setWeight} />
      </View>

      {/* Fitness Level */}
      <Picker selectedValue={fitnessLevel} onValueChange={(itemValue: SetStateAction<string>) => setFitnessLevel(itemValue)} style={styles.picker}>
        <Picker.Item label="Select Fitness Level" value="" />
        <Picker.Item label="Beginner" value="Beginner" />
        <Picker.Item label="Intermediate" value="Intermediate" />
        <Picker.Item label="Advanced" value="Advanced" />
      </Picker>

      {/* Primary Fitness Goal */}
      <Picker selectedValue={fitnessGoal} onValueChange={(itemValue: SetStateAction<string>) => setFitnessGoal(itemValue)} style={styles.picker}>
        <Picker.Item label="Select Your Goal" value="" />
        <Picker.Item label="Build Muscle" value="Build Muscle" />
        <Picker.Item label="Lose Weight" value="Lose Weight" />
        <Picker.Item label="Improve Endurance" value="Improve Endurance" />
        <Picker.Item label="Stay Active" value="Stay Active" />
      </Picker>

      {/* Cycle Regularity */}
      <Picker selectedValue={cycleRegularity} onValueChange={(itemValue: SetStateAction<string>) => setCycleRegularity(itemValue)} style={styles.picker}>
        <Picker.Item label="How Regular is Your Cycle?" value="" />
        <Picker.Item label="Regular" value="Regular" />
        <Picker.Item label="Irregular" value="Irregular" />
        <Picker.Item label="Unsure" value="Unsure" />
      </Picker>

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <Button title="Back" onPress={() => router.back()} />
        <Button title="Next" onPress={handleNext} disabled={!ageRange || !fitnessLevel || !fitnessGoal || !cycleRegularity} />
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
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
  },
  picker: {
    width: "90%",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "45%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
});
