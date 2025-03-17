import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { checkLoginStatus, checkOnboardingStatus } from '@/utils/authStorage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await checkLoginStatus();
      const onboarded = await checkOnboardingStatus();
      setIsLoggedIn(loggedIn);
      setHasOnboarded(onboarded);
      SplashScreen.hideAsync();
    };
    checkAuth();
  }, []);

  if (!loaded || isLoggedIn === null || hasOnboarded === null) {
    return null; // Prevent rendering until fonts, login state, and onboarding state are loaded
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          hasOnboarded ? (
            <Stack.Screen name="(tabs)" options={{ title: "Home" }} /> // Show main app if onboarded
          ) : (
            <Stack.Screen name="(onboarding)/welcomePage" options={{ title: "Welcome" }} />
          )
        ) : (
          <Stack.Screen name="login" options={{ title: "Login" }} />
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
