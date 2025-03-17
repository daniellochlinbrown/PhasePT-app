import { useState } from "react";
import { View, Text, TextInput, Button, Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

export default function UserInfoScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [cycleRegularity, setCycleRegularity] = useState("");

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      router.push("/(onboarding)/importPeriodDates"); // Move to the next onboarding step
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Tell us about yourself</Text>

        {/* Step 1: Name */}
        {step === 1 && (
          <>
            <Text style={styles.label}>What's your name? (Optional)</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Your Name" 
              value={name} 
              onChangeText={setName} 
              returnKeyType="next"
              onSubmitEditing={handleNext} 
              placeholderTextColor="#B565A7"
            />
          </>
        )}

        {/* Step 2: Age Range */}
        {step === 2 && (
          <>
            <Text style={styles.label}>How old are you?</Text>
            <Picker selectedValue={ageRange} onValueChange={setAgeRange} style={styles.picker}>
              <Picker.Item label="Select Age Range" value="" />
              <Picker.Item label="Under 18" value="<18" />
              <Picker.Item label="18-24" value="18-24" />
              <Picker.Item label="25-34" value="25-34" />
              <Picker.Item label="35-44" value="35-44" />
              <Picker.Item label="45+" value="45+" />
            </Picker>
          </>
        )}

        {/* Step 3: Height & Weight */}
        {step === 3 && (
          <>
            <Text style={styles.label}>Enter your height and weight:</Text>
            <View style={styles.row}>
              <TextInput 
                style={[styles.input, styles.halfInput]} 
                placeholder="Height (cm)" 
                keyboardType="numeric" 
                value={height} 
                onChangeText={setHeight} 
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                placeholderTextColor="#B565A7"
              />
              <TextInput 
                style={[styles.input, styles.halfInput]} 
                placeholder="Weight (kg)" 
                keyboardType="numeric" 
                value={weight} 
                onChangeText={setWeight} 
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                placeholderTextColor="#B565A7"
              />
            </View>
          </>
        )}

        {/* Step 4: Fitness Level */}
        {step === 4 && (
          <>
            <Text style={styles.label}>What’s your current fitness level?</Text>
            <Picker selectedValue={fitnessLevel} onValueChange={setFitnessLevel} style={styles.picker}>
              <Picker.Item label="Select Fitness Level" value="" />
              <Picker.Item label="Beginner" value="Beginner" />
              <Picker.Item label="Intermediate" value="Intermediate" />
              <Picker.Item label="Advanced" value="Advanced" />
            </Picker>
          </>
        )}

        {/* Step 5: Primary Fitness Goal */}
        {step === 5 && (
          <>
            <Text style={styles.label}>What is your primary fitness goal?</Text>
            <Picker selectedValue={fitnessGoal} onValueChange={setFitnessGoal} style={styles.picker}>
              <Picker.Item label="Select Your Goal" value="" />
              <Picker.Item label="Build Muscle" value="Build Muscle" />
              <Picker.Item label="Lose Weight" value="Lose Weight" />
              <Picker.Item label="Improve Endurance" value="Improve Endurance" />
              <Picker.Item label="Stay Active" value="Stay Active" />
            </Picker>
          </>
        )}

        {/* Step 6: Cycle Regularity */}
        {step === 6 && (
          <>
            <Text style={styles.label}>How regular is your menstrual cycle?</Text>
            <Picker selectedValue={cycleRegularity} onValueChange={setCycleRegularity} style={styles.picker}>
              <Picker.Item label="Select an option" value="" />
              <Picker.Item label="Regular" value="Regular" />
              <Picker.Item label="Irregular" value="Irregular" />
              <Picker.Item label="Unsure" value="Unsure" />
            </Picker>
          </>
        )}

        {/* Navigation Buttons */}
        <View style={styles.buttonRow}>
          <Button title="Back" onPress={handleBack} disabled={step === 1} />
          <Button 
            title={step === 6 ? "Next" : "Continue"} 
            onPress={handleNext} 
            disabled={
              (step === 2 && !ageRange) || 
              (step === 4 && !fitnessLevel) || 
              (step === 5 && !fitnessGoal) || 
              (step === 6 && !cycleRegularity)
            } 
            color="#D73895"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D73895", // Pink border
    marginVertical: 10,
    backgroundColor: "white",
  },
  picker: {
    width: "90%",
    backgroundColor: "#E1BEE7", // Soft purple
    borderRadius: 8,
    marginVertical: 5,
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
