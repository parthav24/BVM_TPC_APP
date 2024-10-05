// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>Profile Screen</Text>
      {/* Add profile details here */}
      <Text style={styles.infoText}>Name: Dhruv Italiya</Text>
      <Text style={styles.infoText}>Email: dhruv@example.com</Text>
      <Text style={styles.infoText}>Branch: CP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
