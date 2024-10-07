import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function StudentProfile() {
  // Mock data, replace with real data
  const studentDetails = {
    name: "John Doe",
    branch: "Computer Science Engineering",
    rollNumber: "CSE-12345",
    email: "johndoe@example.com",
    phone: "9876543210",
    appliedCompanies: 5,
    placedCompany: "Google",
    skills: ["JavaScript", "React Native", "Node.js"],
    internships: [
      { company: "XYZ Corp", duration: "3 months" },
      { company: "ABC Inc.", duration: "2 months" },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Student Profile</Text>
      <Text style={styles.label}>Name: <Text style={styles.value}>{studentDetails.name}</Text></Text>
      <Text style={styles.label}>Branch: <Text style={styles.value}>{studentDetails.branch}</Text></Text>
      <Text style={styles.label}>Roll Number: <Text style={styles.value}>{studentDetails.rollNumber}</Text></Text>
      <Text style={styles.label}>Email: <Text style={styles.value}>{studentDetails.email}</Text></Text>
      <Text style={styles.label}>Phone: <Text style={styles.value}>{studentDetails.phone}</Text></Text>
      <Text style={styles.label}>Applied Companies: <Text style={styles.value}>{studentDetails.appliedCompanies}</Text></Text>
      <Text style={styles.label}>Placed Company: <Text style={styles.value}>{studentDetails.placedCompany}</Text></Text>
      
      <Text style={styles.label}>Skills:</Text>
      <View style={styles.skillsContainer}>
        {studentDetails.skills.map((skill, index) => (
          <Text key={index} style={styles.skill}>{skill}</Text>
        ))}
      </View>

      <Text style={styles.label}>Internships:</Text>
      {studentDetails.internships.map((internship, index) => (
        <Text key={index} style={styles.internship}>
          {internship.company} - {internship.duration}
        </Text>
      ))}

      <Button title="Request Update" onPress={() => alert('Update requested!')} color="#007bff" />
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
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  skill: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  internship: {
    fontSize: 16,
    color: '#444',
  },
});
