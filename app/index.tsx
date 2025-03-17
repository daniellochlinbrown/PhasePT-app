import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { checkLoginStatus, checkOnboardingStatus } from "@/utils/authStorage";

export default function IndexScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAppState = async () => {
      const isLoggedIn = await checkLoginStatus();
      const hasOnboarded = await checkOnboardingStatus();
      setLoading(false);

      if (isLoggedIn) {
        if (hasOnboarded) {
          router.replace("/(tabs)/home"); // ✅ Go to main app if onboarding is complete
        } else {
          router.replace("/(onboarding)/importPeriodDates"); // ✅ Go to onboarding if it's the first time
        }
      } else {
        router.replace("/login"); // ✅ Send to login screen
      }
    };

    checkAppState();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
