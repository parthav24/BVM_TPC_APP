import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

export default function TPOProfile({ navigation }) {
  // Mock data, replace with real data
  const tpoDetails = {
    name: "Mr. Sharma",
    totalCompanies: 20,
    totalStudentsPlaced: 100,
    tpcMembers: [
      { name: "Alice Smith", branch: "ECE" },
      { name: "Bob Brown", branch: "CSE" },
    ],
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('userData');
    AsyncStorage.removeItem('authToken');
    Toast.show({
      type: 'success',
      text1: 'Logged out Successfully',
    });
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>TPO Profile</Text>
        <Text style={styles.label}>
          <Ionicons name="person-outline" size={18} color="#007bff" />
          {" "}Name: <Text style={styles.value}>{tpoDetails.name}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="business-outline" size={18} color="#007bff" />
          {" "}Total Companies Arrived: <Text style={styles.value}>{tpoDetails.totalCompanies}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="people-outline" size={18} color="#007bff" />
          {" "}Total Students Placed: <Text style={styles.value}>{tpoDetails.totalStudentsPlaced}</Text>
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>TPC Members:</Text>
        {tpoDetails.tpcMembers.map((member, index) => (
          <View key={index} style={styles.memberContainer}>
            <Text style={styles.memberName}>Name: {member.name}</Text>
            <Text>Branch: {member.branch}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  value: {
    fontWeight: 'bold',
  },
  memberContainer: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberName: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    width: "100%"
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
