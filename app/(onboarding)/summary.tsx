import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { saveOnboardingStatus } from "@/utils/authStorage";

export default function OnboardingSummary() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    primaryGoal: "",
    workoutFrequency: "",
  });

  useEffect(() => {
    // TODO: Retrieve stored user input from state management or AsyncStorage
    setUserData({
      name: "Alissa", // Example data
      primaryGoal: "Build Muscle",
      workoutFrequency: "4-5 times per week",
    });
  }, []);

  const handleCompleteOnboarding = async () => {
    await saveOnboardingStatus();
    router.replace("/(tabs)/home"); // ✅ Move to the main app
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>You're All Set, {userData.name || "Athlete"}! 🎉</Text>
      
      {/* Brief Summary */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>
          🌟 Your main goal: <Text style={styles.highlight}>{userData.primaryGoal}</Text>
        </Text>
        <Text style={styles.summaryText}>
          🏋️‍♀️ Your workout plan: <Text style={styles.highlight}>{userData.workoutFrequency}</Text>
        </Text>
      </View>

      {/* Congratulations Message */}
      <Text style={styles.congrats}>
        Welcome to <Text style={styles.brand}>PhasePT</Text>! 🎉{"\n"}
        Let’s start <Text style={styles.bold}>hitting your goals</Text> through <Text style={styles.bold}>cycle-based training</Text>.{"\n"}
        Your journey to <Text style={styles.bold}>smarter workouts</Text> starts <Text style={styles.bold}>now</Text>!
      </Text>

      {/* "Start Training" Button */}
      <TouchableOpacity style={styles.startButton} onPress={handleCompleteOnboarding}>
        <Text style={styles.buttonText}>Start Training!</Text>
      </TouchableOpacity>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  summaryBox: {
    backgroundColor: "#E1BEE7", // Soft purple
    padding: 15,
    borderRadius: 10,
    width: "90%",
    marginVertical: 15,
  },
  summaryText: {
    fontSize: 18,
    color: "#4A235A", // Dark purple
    marginBottom: 5,
    textAlign: "center",
  },
  highlight: {
    fontWeight: "bold",
    color: "#D73895", // Pink
  },
  congrats: {
    fontSize: 18,
    color: "#6C3483", // Deep purple
    textAlign: "center",
    marginVertical: 20,
  },
  brand: {
    fontWeight: "bold",
    color: "#D73895", // Bright pink for brand emphasis
  },
  bold: {
    fontWeight: "bold",
  },
  startButton: {
    backgroundColor: "#D73895", // Pink button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
