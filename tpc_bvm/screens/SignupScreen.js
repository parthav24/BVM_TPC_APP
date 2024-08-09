import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView , TouchableOpacity} from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [formData, setFormData] = useState({
    studentId: '',
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    mobile: '',
    address: '',
    spi1: '',
    spi2: '',
    spi3: '',
    spi4: '',
    spi5: '',
    spi6: '',
    spi7: '',
    spi8: '',
    sscPercentage:'',
    hscPercentage:'',
    activeBacklogs: '',
    deadBacklogs: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSignUp = () => {
    // Add your sign-up logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enter Your Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Student ID"
        value={formData.studentId}
        onChangeText={(text) => handleChange('studentId', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(text) => handleChange('firstName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Middle Name"
        value={formData.middleName}
        onChangeText={(text) => handleChange('middleName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => handleChange('lastName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={formData.dob}
        onChangeText={(text) => handleChange('dob', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={formData.mobile}
        onChangeText={(text) => handleChange('mobile', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(text) => handleChange('address', text)}
      />
      <View style={styles.viewInput}>
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 1"}
          value={formData.spi1}
        onChangeText={(text) => handleChange('spi1', text)}
        />
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 2"}
          value={formData.spi1}
        onChangeText={(text) => handleChange('spi2', text)}
        />
      </View>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 3"}
          value={formData.spi3}
        onChangeText={(text) => handleChange('spi3', text)}
        />
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 4"}
          value={formData.spi4}
        onChangeText={(text) => handleChange('spi4', text)}
        />
      </View>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 5"}
          value={formData.spi5}
        onChangeText={(text) => handleChange('spi5', text)}
        />
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 6"}
          value={formData.spi6}
        onChangeText={(text) => handleChange('spi6', text)}
        />
      </View>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 7"}
          value={formData.spi7}
        onChangeText={(text) => handleChange('spi7', text)}
        />
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 8"}
          value={formData.spi8}
        onChangeText={(text) => handleChange('spi8', text)}
        />
      </View>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.resultInput}
          placeholder={"SSC Percentage"}
          value={formData.sscPercentage}
        onChangeText={(text) => handleChange('sscPercentage', text)}
        />
        <TextInput
          style={styles.resultInput}
          placeholder={"HSC Percentage"}
          value={formData.hscPercentage}
        onChangeText={(text) => handleChange('hscPercentage', text)}
        />
      </View>

      <View style={styles.viewInput}>
      <TextInput
        style={styles.resultInput}
        placeholder="No. of Active Backlogs"
        value={formData.activeBacklogs}
        onChangeText={(text) => handleChange('activeBacklogs', text)}
      />
      <TextInput
        style={styles.resultInput}
        placeholder="No. of Dead Backlogs"
        value={formData.deadBacklogs}
        onChangeText={(text) => handleChange('deadBacklogs', text)}
      />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword', text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sent Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1 ,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  resultInput: {
    width: '48%',
    padding: 10,
    borderWidth: 1 ,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  viewInput: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row' ,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
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
});
