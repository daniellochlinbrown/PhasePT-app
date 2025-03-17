import { useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { saveOnboardingStatus } from "../../utils/authStorage";
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

export default function OnboardingScreen() {
  const router = useRouter();
  const today = dayjs();
  const [selectedMonth, setSelectedMonth] = useState(dayjs().startOf("month"));
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [autoFilledDates, setAutoFilledDates] = useState<string[]>([]);
  const days = generateDays(selectedMonth);

  const toggleDate = (dateString: string) => {
    const isSelected = selectedDates.includes(dateString);
    const isAutoFilled = autoFilledDates.includes(dateString);

    if (isSelected) {
      // If the selected date is an auto-filled date, remove only that date
      if (isAutoFilled) {
        setSelectedDates(selectedDates.filter(date => date !== dateString));
        setAutoFilledDates(autoFilledDates.filter(date => date !== dateString));
      } else {
        // If manually selected, just remove the date
        setSelectedDates(selectedDates.filter(date => date !== dateString));
      }
      return;
    }

    // Check if the selected date is within the last 10 days of an existing period
    const withinLast10Days = selectedDates.some(date => {
      return dayjs(dateString).diff(dayjs(date), "day") > 0 &&
             dayjs(dateString).diff(dayjs(date), "day") <= 10;
    });

    if (withinLast10Days) {
      // If within the last 10 days, just add the single date (no autofill)
      setSelectedDates([...selectedDates, dateString]);
      return;
    }

    // Select the date & autofill the next 4 days (if within range)
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
  };

  const handleCompleteOnboarding = async () => {
    await saveOnboardingStatus();
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.importButton} onPress={() => console.log("Import JSON Data")}>
        <Text style={styles.importButtonText}>Import Data</Text>
      </TouchableOpacity>

      <Button title="Continue" onPress={handleCompleteOnboarding} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
  },
  monthText: {
    fontSize: 24,
    fontWeight: "bold",
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
    backgroundColor: "#ddd",
  },
  selectedDay: {
    backgroundColor: "lightcoral",
  },
  autoFilledDay: {
    backgroundColor: "salmon",
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },
  importButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
