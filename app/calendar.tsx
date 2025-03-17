import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const navigation = useNavigation();

  const today = dayjs();
  const daysInMonth = today.daysInMonth();
  const month = today.format('MMMM');
  const year = today.format('YYYY');

  // Function to check if a day is part of the selected period range
  const isPeriodDay = (day: number) => {
    return selectedDate !== null && day >= selectedDate && day < selectedDate + 5;
  };

  return (
    <ThemedView style={styles.container}>
      {/* Month and Year Display */}
      <ThemedText type="title" style={styles.monthTitle}>
        {month} {year}
      </ThemedText>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayCircle,
              day === today.date() ? styles.todayCircle : null, // Highlight today
              isPeriodDay(day) ? styles.periodCircle : null, // Highlight period days
            ]}
            onPress={() => setSelectedDate(day)}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Confirm Button */}
      {/* {selectedDate !== null && (
        <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('NextScreen')}>
          <Text style={styles.buttonText}>Confirm Selection</Text>
        </TouchableOpacity>
      )} */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DCC7FF', // Light purple
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  todayCircle: {
    borderWidth: 2,
    borderColor: '#333', // Dotted circle effect for today
  },
  periodCircle: {
    backgroundColor: '#FFCCCC', // Light red for period days
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

