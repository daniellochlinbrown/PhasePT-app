import AsyncStorage from '@react-native-async-storage/async-storage';

// Save login status
export const saveLoginStatus = async () => {
  try {
    await AsyncStorage.setItem('isLoggedIn', 'true');
  } catch (error) {
    console.error('Error saving login status:', error);
  }
};

// Check login status
export const checkLoginStatus = async () => {
  try {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

export const saveOnboardingStatus = async () => {
  try {
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
  } catch (error) {
    console.error('Error saving onboarding status:', error);
  }
};

// Check if onboarding has been completed
export const checkOnboardingStatus = async () => {
  try {
    const status = await AsyncStorage.getItem('hasCompletedOnboarding');
    return status === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('isLoggedIn');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
