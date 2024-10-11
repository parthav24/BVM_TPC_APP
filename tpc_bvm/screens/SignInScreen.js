import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import connString from "../components/connectionString";
import { Picker } from "@react-native-picker/picker";

export default function SignInScreen({ navigation }) {
  const [role, setRole] = useState("Select Role");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // For frontend validation errors

  const handleSignIn = async () => {
    const validationErrors = {};

    // Frontend Validation
    if (!role || role === "Select Role") {
      validationErrors.role = "Please select a role";
    }
    if (!uid) {
      validationErrors.uid = "User ID is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password =
        "Password should be at least 6 characters long";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Display validation errors
      return;
    }

    try {
      // Reset errors
      setErrors({});
      console.log(errors);

      const response = await axios.post(`${connString}/auth/login`, {
        uid,
        password,
        role,
      });

      const token = response.data.token; // Adjust based on your API response structure
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(response.data.user)
      );
      // Optionally, set the default Authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Navigate based on role or screen (adjust as per your app)
      if (role === "student") {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Student' }],
        });
        navigation.navigate("Student", { screen: "Dashboard" });
      } else if (role === "tpc") {
        navigation.reset({
          index: 0,
          routes: [{ name: 'TPC' }],
        });
        navigation.navigate("TPC", { screen: "Home" });
      } else if (role === "tpo") {
        navigation.reset({
          index: 0,
          routes: [{ name: 'TPO' }],
        });
        navigation.navigate("TPO", { screen: "Home" });
      }
    } catch (error) {
      // Backend error handling
      if (error.response && error.response.data) {
        // Display backend validation errors or incorrect credentials
        Alert.alert(
          "Login Error",
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        console.error("Login failed:", error.message);
        Alert.alert("Error", "An error occurred. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {/* Picker for Role */}
      <View style={styles.pickerView}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select your role" value="" />
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="TPC" value="tpc" />
          <Picker.Item label="TPO" value="tpo" />
        </Picker>
        {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}
      </View>

      {/* User ID Input */}
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={uid}
        onChangeText={(text) => setUid(text)}
      />
      {errors.uid && <Text style={styles.errorText}>{errors.uid}</Text>}

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {/* Sign-In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Sign-Up Link */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#007bff",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 25,
  },
  pickerView: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    marginBottom: 10,
    padding: 2,
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpText: {
    color: "#007bff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    marginLeft:15
  },
});
