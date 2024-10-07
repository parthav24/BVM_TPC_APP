import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

export default function StudentHomeScreen() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  studentItem: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
  },
  studentText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
