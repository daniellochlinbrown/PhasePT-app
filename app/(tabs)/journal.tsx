import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';

export default function JournalScreen() {
  const navigation = useNavigation();
  const [entries, setEntries] = useState([
    { id: '1', date: 'March 12, 2025', text: 'Felt strong today! Completed a full-body workout.' },
    { id: '2', date: 'March 10, 2025', text: 'Took a rest day and focused on hydration.' },
  ]);

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedText type="title" style={styles.header}>
        Journal
      </ThemedText>

      {/* Journal Entry List */}
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryItem}>
            <Text style={styles.entryDate}>{item.date}</Text>
            <Text style={styles.entryText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Add Journal Entry Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add new journal entry')}>
        <Text style={styles.addButtonText}>+ Add Entry</Text>
      </TouchableOpacity>
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
  entryItem: {
    width: '90%',
    backgroundColor: '#CFF0D6', // Light green theme for journal
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
  },
  entryDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  entryText: {
    fontSize: 16,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

