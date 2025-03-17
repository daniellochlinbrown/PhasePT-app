import { useRouter } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";
import { logoutUser } from "@/utils/authStorage";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/login"); // Send user back to login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <Button title="Log Out" onPress={handleLogout} />
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
  },
});
