import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';

const workouts = [
  { id: '1', name: 'Strength Training' },
  { id: '2', name: 'Cardio & Endurance' },
  { id: '3', name: 'Recovery & Mobility' },
  { id: '4', name: 'HIIT & Fat Burn' },
];

export default function WorkoutScreen() {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedText type="title" style={styles.header}>
        Workout Plan
      </ThemedText>

      {/* Workout List */}
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.workoutItem} onPress={() => console.log(`Selected: ${item.name}`)}>
            <Text style={styles.workoutText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  workoutItem: {
    width: '90%',
    backgroundColor: '#DCC7FF', // Light purple theme
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  workoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

