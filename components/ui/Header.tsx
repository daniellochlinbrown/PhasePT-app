import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Use router instead of navigation

export default function Header() {
  const router = useRouter(); // Correct way to navigate in expo-router

  return (
    <View style={styles.header}>
      {/* Left: Calendar Button */}
      <TouchableOpacity onPress={() => router.push('/calendar')} style={[styles.iconButton, styles.leftButton]}>
        <Ionicons name="calendar-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Center: Notifications, Search, More (Shifted Right) */}
      <View style={styles.centerIcons}>
        <TouchableOpacity onPress={() => console.log('Notifications')} style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Search')} style={styles.iconButton}>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('More')} style={styles.iconButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Right: Profile Button */}
      <TouchableOpacity onPress={() => router.push('/profile')} style={styles.iconButton}>
        <Ionicons name="person-circle-outline" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  leftButton: {
    flex: 1, // Pushes the center icons to the right
  },
  centerIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Moves icons to the right
    flex: 2, // Gives this section more space
  },
  iconButton: {
    padding: 10,
  },
});
