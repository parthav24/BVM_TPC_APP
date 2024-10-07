import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TPOProfile() {
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TPO Profile</Text>
      <Text style={styles.label}>Name: <Text style={styles.value}>{tpoDetails.name}</Text></Text>
      <Text style={styles.label}>Total Companies Arrived: <Text style={styles.value}>{tpoDetails.totalCompanies}</Text></Text>
      <Text style={styles.label}>Total Students Placed: <Text style={styles.value}>{tpoDetails.totalStudentsPlaced}</Text></Text>
      
      <Text style={styles.label}>TPC Members:</Text>
      {tpoDetails.tpcMembers.map((member, index) => (
        <View key={index} style={styles.memberContainer}>
          <Text style={styles.memberName}>Name: {member.name}</Text>
          <Text>Branch: {member.branch}</Text>
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
