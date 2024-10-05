import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import connString from '../components/connectionString';
import { Picker } from '@react-native-picker/picker';

export default function SignInScreen({ navigation }) {
  const [role, setRole] = useState('Select Role');
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // Add your sign-in logic here
    try {
      const response = await axios.post(`${connString}/auth/login`, {
        uid,
        password,
        role
      });

      const token = response.data.token; // Adjust based on your API response structure
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));

      // Optionally, set the default Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      navigation.navigate('Student', { screen: 'Dashboard' });
      // Navigate to the main screen or perform other actions
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View
        style={styles.pickerView}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="Select your role" value="" />
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="TPC" value="tpc" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="UserId"
        value={uid}
        onChangeText={(text) => setUid(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Student', { screen: 'Dashboard' })}>
        <Text style={styles.buttonText}>Student Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Statistics')}>
        <Text style={styles.buttonText}>Placement Statistics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Admin')}>
        <Text style={styles.buttonText}>TPC Dashboard </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 25,
  },
  pickerView: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    marginBottom: 20,
    padding: 2
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpText: {
    color: '#007bff',
    fontSize: 16,
  },
});
