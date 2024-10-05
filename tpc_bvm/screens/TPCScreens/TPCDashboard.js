import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default function AdminDashboard() {
  const manageStudents = () => {
    // Navigation logic to Manage Students page
  };

  const manageCompanies = () => {
    // Navigation logic to Manage Companies page
  };

  const viewReports = () => {
    // Navigation logic to Placement Reports page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin/TPC Dashboard</Text>

      <TouchableOpacity style={styles.button} onPress={manageStudents}>
        <Text style={styles.buttonText}>Manage Students</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={manageCompanies}>
        <Text style={styles.buttonText}>Manage Companies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={viewReports}>
        <Text style={styles.buttonText}>View Placement Reports</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#841584',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
