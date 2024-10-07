import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TPCProfile() {
  // Mock data, replace with real data
  const tpcDetails = {
    name: "Alice Smith",
    branch: "Electronics and Communication",
    currentTPO: "Mr. Sharma",
    members: [
      { name: "Bob Brown", branch: "CSE", email: "bob@example.com", phone: "1234567890" },
      { name: "Charlie White", branch: "Mechanical", email: "charlie@example.com", phone: "0987654321" },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TPC Profile</Text>
      <Text style={styles.label}>Name: <Text style={styles.value}>{tpcDetails.name}</Text></Text>
      <Text style={styles.label}>Branch: <Text style={styles.value}>{tpcDetails.branch}</Text></Text>
      <Text style={styles.label}>Current TPO: <Text style={styles.value}>{tpcDetails.currentTPO}</Text></Text>
      
      <Text style={styles.label}>Members:</Text>
      {tpcDetails.members.map((member, index) => (
        <View key={index} style={styles.memberContainer}>
          <Text style={styles.memberName}>Name: {member.name}</Text>
          <Text>Branch: {member.branch}</Text>
          <Text>Email: {member.email}</Text>
          <Text>Phone: {member.phone}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
    backgroundColor: '#fff',
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
});
