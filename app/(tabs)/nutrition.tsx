import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';

const nutritionCategories = [
  { id: '1', name: 'Pre-Workout Nutrition' },
  { id: '2', name: 'Post-Workout Nutrition' },
  { id: '3', name: 'Hydration & Recovery' },
  { id: '4', name: 'Hormone-Supportive Foods' },
];

export default function NutritionScreen() {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedText type="title" style={styles.header}>
        Nutrition Guide
      </ThemedText>

      {/* Nutrition List */}
      <FlatList
        data={nutritionCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.nutritionItem} onPress={() => console.log(`Selected: ${item.name}`)}>
            <Text style={styles.nutritionText}>{item.name}</Text>
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
  nutritionItem: {
    width: '90%',
    backgroundColor: '#FFD7A3', // Light orange for nutrition theme
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  nutritionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

