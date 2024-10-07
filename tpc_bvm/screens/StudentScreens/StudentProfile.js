import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { CommonActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function StudentProfile({ navigation }) {
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

  const handleLogout = () => {
    AsyncStorage.removeItem("userData");
    AsyncStorage.removeItem("authToken");
    Toast.show({
      type: "success",
      text1: "Logged out Successfully",
    });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.label}>
          <Ionicons name="person-outline" size={18} color="#007bff" /> Name:{" "}
          <Text style={styles.value}>{studentDetails.name}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="book-outline" size={18} color="#007bff" /> Branch:{" "}
          <Text style={styles.value}>{studentDetails.branch}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="id-card-outline" size={18} color="#007bff" /> Roll
          Number: <Text style={styles.value}>{studentDetails.rollNumber}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="mail-outline" size={18} color="#007bff" /> Email:{" "}
          <Text style={styles.value}>{studentDetails.email}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="call-outline" size={18} color="#007bff" /> Phone:{" "}
          <Text style={styles.value}>{studentDetails.phone}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="business-outline" size={18} color="#007bff" /> Applied
          Companies:{" "}
          <Text style={styles.value}>{studentDetails.appliedCompanies}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="checkmark-circle-outline" size={18} color="#007bff" />{" "}
          Placed Company:{" "}
          <Text style={styles.value}>{studentDetails.placedCompany}</Text>
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {studentDetails.skills.map((skill, index) => (
            <Text key={index} style={styles.skill}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>Internships</Text>
        {studentDetails.internships.map((internship, index) => (
          <Text key={index} style={styles.internship}>
            {internship.company} - {internship.duration}
          </Text>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Statistics")}
        >
          <Text style={styles.buttonText}>Placement Statistics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Update requested!")}
        >
          <Text style={styles.buttonText}>Request Update</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Resource Center</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
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
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007bff",
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: "#555",
  },
  value: {
    fontWeight: "bold",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  skill: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 14,
  },
  internship: {
    fontSize: 16,
    color: "#444",
    marginVertical: 2,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
