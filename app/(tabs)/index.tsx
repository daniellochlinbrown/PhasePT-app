import { ImageBackground, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/ui/Header';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Full-Screen Background */}
      <ImageBackground
        source={require('@/assets/images/logo.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay to Ensure Text Renders Correctly */}
        <View style={styles.overlay}>
          {/* App Name (Testing with <Text> instead of <ThemedText>) */}
          <Text style={styles.title}>
            PhasePT
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Train Smarter with Your Cycle
          </Text>

          {/* Get Started Button */}
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Calendar')} 
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white', // Ensures no white flash
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center', // Ensures correct positioning
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', // Center everything inside
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
    includeFontPadding: false, // Prevents text cut-off
    textAlignVertical: 'center', // Ensures proper alignment
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    marginBottom: 30,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
