import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const CompanyDetailsScreen = () => {
  // Static company and student data
  const company = { companyName: "Company A" };

  const students = [
    { id: "1", name: "Student A", status: "Round 1" },
    { id: "2", name: "Student B", status: "Round 1" },
    { id: "3", name: "Student C", status: "Round 1" },
    // Add more students here
  ];

  const handleNextRound = (student) => {
    // Logic to move student to the next round
    console.log(`${student.name} moved to next round`);
  };

  const handleReject = (student) => {
    // Logic to reject the student
    console.log(`${student.name} rejected`);
  };

  const renderStudents = ({ item }) => (
    <View style={styles.studentContainer}>
      <Text style={styles.studentName}>{item.name}</Text>
      <Text style={styles.studentStatus}>Current Status: {item.status}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleNextRound(item)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next Round</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleReject(item)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{company.companyName} - Ongoing Drive</Text>
      <FlatList
        data={students}
        renderItem={renderStudents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.studentsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  studentContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  studentStatus: {
    fontSize: 16,
    color: "#666",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CompanyDetailsScreen;
