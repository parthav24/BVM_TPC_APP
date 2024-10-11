import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
<<<<<<< Updated upstream
import Toast from "react-native-toast-message";
import { CommonActions } from "@react-navigation/native";
=======
import { CommonActions } from '@react-navigation/native';
import Toast from "react-native-toast-message";
>>>>>>> Stashed changes
import { Ionicons } from "@expo/vector-icons";

export default function TPCProfile({ navigation }) {
  // Mock data, replace with real data
  const tpcDetails = {
    name: "Alice Smith",
    branch: "Electronics and Communication",
    currentTPO: "Mr. Sharma",
    members: [
      {
        name: "Bob Brown",
        branch: "CSE",
        email: "bob@example.com",
        phone: "1234567890",
      },
      {
        name: "Charlie White",
        branch: "Mechanical",
        email: "charlie@example.com",
        phone: "0987654321",
      },
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
<<<<<<< Updated upstream
        routes: [{ name: "Home" }],
=======
        routes: [{ name: "Home" }], // Redirect to the 'Home' screen or login screen
>>>>>>> Stashed changes
      })
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>TPC Profile</Text>
        <Text style={styles.label}>
          <Ionicons name="person-outline" size={18} color="#007bff" /> Name:{" "}
          <Text style={styles.value}>{tpcDetails.name}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="book-outline" size={18} color="#007bff" /> Branch:{" "}
          <Text style={styles.value}>{tpcDetails.branch}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="people-outline" size={18} color="#007bff" /> Current
          TPO: <Text style={styles.value}>{tpcDetails.currentTPO}</Text>
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>Members:</Text>
        {tpcDetails.members.map((member, index) => (
          <View key={index} style={styles.memberContainer}>
            <Text style={styles.memberName}>Name: {member.name}</Text>
            <Text>Branch: {member.branch}</Text>
            <Text>Email: {member.email}</Text>
            <Text>Phone: {member.phone}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Statistics")}
      >
        <Text style={styles.buttonText}>Placement Statistics</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Student Applications")}
      >
        <Text style={styles.buttonText}>View Application</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  memberContainer: {
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberName: {
    fontWeight: "bold",
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
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
