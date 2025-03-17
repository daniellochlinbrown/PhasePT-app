import { useRouter } from "expo-router";
import { View, Text, TextInput, Button, ImageBackground, StyleSheet } from "react-native";
import { saveLoginStatus } from "@/utils/authStorage";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hardcoded test credentials
  const testCredentials = {
    email: "test@phasept.com",
    password: "password123",
  };

  const handleLogin = async () => {
    if (email === testCredentials.email && password === testCredentials.password) {
      await saveLoginStatus(); // Save login state in AsyncStorage
      router.replace("/(onboarding)/welcomePage"); // Navigate to onboarding after login
    } else {
      alert("Invalid credentials. Try using test@phasept.com / password123");
    }
  };

  return (
    <ImageBackground source={require("@/assets/images/welcome_bg.png")} style={styles.background}>
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#ccc"
        />

        <Button title="Log In" onPress={handleLogin} />
        <Text style={styles.testHint}>Use: test@phasept.com / password123</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)", // Dark overlay for better readability
  },
  container: {
    width: "85%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency for better contrast
    marginBottom: 10,
  },
  testHint: {
    marginTop: 15,
    fontSize: 14,
    color: "gray",
  },
});
