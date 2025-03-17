import { useRouter } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
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
      router.replace("/onboarding"); // Navigate to onboarding after login
    } else {
      alert("Invalid credentials. Try using test@phasept.com / password123");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput 
        placeholder="Email" 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Password" 
        style={styles.input} 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <Button title="Log In" onPress={handleLogin} />
      <Text style={styles.testHint}>Use: test@phasept.com / password123</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
  },
  testHint: {
    marginTop: 15,
    fontSize: 14,
    color: "gray",
  },
});
