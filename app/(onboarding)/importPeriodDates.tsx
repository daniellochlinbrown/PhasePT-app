import { useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import dayjs from "dayjs";

const generateDays = (selectedMonth: dayjs.Dayjs) => {
  const days = [];
  const today = dayjs();
  const isCurrentMonth = selectedMonth.isSame(today, "month");

  const monthEnd = isCurrentMonth ? today.date() : selectedMonth.daysInMonth();

  for (let day = 1; day <= monthEnd; day++) {
    days.push(selectedMonth.date(day).format("YYYY-MM-DD"));
  }

  return days;
};

export default function ImportPeriodDates() {
  const router = useRouter();
  const today = dayjs();
  const [selectedMonth, setSelectedMonth] = useState(dayjs().startOf("month"));
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [autoFilledDates, setAutoFilledDates] = useState<string[]>([]);
  const days = generateDays(selectedMonth);
  const [monthsSelected, setMonthsSelected] = useState(new Set());

  const toggleDate = (dateString: string) => {
    const isSelected = selectedDates.includes(dateString);
    const isAutoFilled = autoFilledDates.includes(dateString);
    const month = dayjs(dateString).format("YYYY-MM");

    if (isSelected) {
      if (isAutoFilled) {
        setSelectedDates(selectedDates.filter(date => date !== dateString));
        setAutoFilledDates(autoFilledDates.filter(date => date !== dateString));
      } else {
        setSelectedDates(selectedDates.filter(date => date !== dateString));
      }
      return;
    }

    const withinLast10Days = selectedDates.some(date => {
      return dayjs(dateString).diff(dayjs(date), "day") > 0 &&
             dayjs(dateString).diff(dayjs(date), "day") <= 10;
    });

    if (withinLast10Days) {
      setSelectedDates([...selectedDates, dateString]);
      setMonthsSelected(new Set([...monthsSelected, month]));
      return;
    }

    const newSelectedDates = [...selectedDates, dateString];
    const newAutoFilledDates: string[] = [];

    for (let i = 1; i <= 4; i++) {
      const nextDay = dayjs(dateString).add(i, "day").format("YYYY-MM-DD");

      if (days.includes(nextDay) && !selectedDates.includes(nextDay)) {
        newSelectedDates.push(nextDay);
        newAutoFilledDates.push(nextDay);
      }
    }

    setSelectedDates(newSelectedDates);
    setAutoFilledDates([...autoFilledDates, ...newAutoFilledDates]);
    setMonthsSelected(new Set([...monthsSelected, month]));
  };

  const handleNext = () => {
    if (monthsSelected.size < 3) {
      Alert.alert("More Data Required", "Please enter at least 3 months of period data before continuing.");
      return;
    }
    router.push("/(onboarding)/user-fitness"); // ✅ Navigate to the next step
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Your Period</Text>
      <Text style={styles.subtitle}>Select the first day of your last three periods.</Text>

      {/* Month Navigation */}
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={() => setSelectedMonth(selectedMonth.subtract(1, "month"))} style={styles.navButton}>
          <Text style={styles.navButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{selectedMonth.format("MMMM YYYY")}</Text>
        <TouchableOpacity
          onPress={() => !selectedMonth.isSame(today, "month") && setSelectedMonth(selectedMonth.add(1, "month"))}
          style={[styles.navButton, selectedMonth.isSame(today, "month") && styles.disabledButton]}
          disabled={selectedMonth.isSame(today, "month")}
        >
          <Text style={styles.navButtonText}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendar}>
        {days.map((dateString) => {
          const isSelected = selectedDates.includes(dateString);
          const isAutoFilled = autoFilledDates.includes(dateString);
          const isToday = dateString === today.format("YYYY-MM-DD");

          return (
            <TouchableOpacity
              key={dateString}
              style={[
                styles.dayCircle,
                isSelected && styles.selectedDay,
                isAutoFilled && styles.autoFilledDay,
                isToday && styles.currentDay,
              ]}
              onPress={() => toggleDate(dateString)}
            >
              <Text style={styles.dayText}>{dayjs(dateString).format("D")}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Import Data Button */}
      <TouchableOpacity style={styles.importButton} onPress={() => console.log("Import JSON Data")}>
        <Text style={styles.importButtonText}>Import Data</Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FCE4EC", // Light pink background
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8E44AD", // Purple
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6C3483", // Deep purple
    textAlign: "center",
    marginBottom: 15,
  },
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
  navButton: {
    padding: 10,
  },
  disabledButton: {
    opacity: 0.3,
  },
  navButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D73895",
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A235A",
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },
  dayCircle: {
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#E1BEE7", // Soft purple
  },
  selectedDay: {
    backgroundColor: "#D73895", // Darker pink for selected days
  },
  autoFilledDay: {
    backgroundColor: "#F06292", // Lighter pink for autofilled days
  },
  currentDay: {
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "dashed",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  importButton: {
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#D73895",
    borderRadius: 10,
  },
  importButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#8E44AD",
    borderRadius: 10,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
