import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TPCHomeScreen({ navigation }) {
  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.optionsContainer}>
        {/* Student Applications */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleNavigate("Student Applications")}
        >
          <Ionicons name="document-text-outline" size={40} color="#4A90E2" />
          <Text style={styles.optionText}>Student Applications</Text>
        </TouchableOpacity>

        {/* Add Company */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleNavigate("Add Company Details")}
        >
          <Ionicons name="business-outline" size={40} color="#4A90E2" />
          <Text style={styles.optionText}>Add Company</Text>
        </TouchableOpacity>

        {/* Ongoing Drives */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleNavigate("OngoingDrivesScreen")}
        >
          <Ionicons name="play-outline" size={40} color="#4A90E2" />
          <Text style={styles.optionText}>Ongoing Drives</Text>
        </TouchableOpacity>

        {/* Add TPCs */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleNavigate("Register TPC")}
        >
          <Ionicons name="person-add-outline" size={40} color="#4A90E2" />
          <Text style={styles.optionText}>Add TPC</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handleNavigate("Add Department")}
        >
          <Ionicons name="school-outline" size={40} color="#4A90E2" />
          <Text style={styles.optionText}>Add Department</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  option: {
    alignItems: "center",
    width: "30%",
    marginBottom: 25,
  },
  optionText: {
    marginTop: 5,
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
});
