import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";
import axios from 'axios';
import connString from '../../components/connectionString';
import Toast from 'react-native-toast-message';

const AddTPCScreen = ({ navigation }) => {
  // State for form data
  const [formData, setFormData] = useState({
    uid: '',
    f_name: '',
    m_name: '',
    l_name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    dept_id: '',
    gender: '',
    passout_year: '',
  });

  const [errors, setErrors] = useState([]);

  const branches = [
    { label: "01-Civil Engineering", value: 1 },
    { label: "02-Civil Engineering", value: 2 },
    { label: "03-Computer Engineering", value: 3 },
    { label: "04-Electrical Engineering", value: 4 },
    { label: "05-Electronics Engineering", value: 5 },
    { label: "06-Electronics and Communication", value: 6 },
    { label: "07-Mechanical Engineering", value: 7 },
    { label: "08-Mechanical Engineering", value: 8 },
    { label: "09-Production Engineering", value: 9 },
    { label: "10-Information Technology", value: 10 },
  ];

  // Function to handle input changes
  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "uid",
      "f_name",
      "m_name",
      "l_name",
      "email",
      "mobile",
      "dept_id",
      "gender",
      "passout_year",
      "confirmPassword",
      "password",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Additional validations
    const uidPattern = /^\d{2}TPC\d{2}$/;
    if (!newErrors.uid && !uidPattern.test(formData.uid)) {
      newErrors.uid = "Please enter a valid UID";
    }

    const emailPattern = /^\d{2}tpc\d{2}@[^\s@]+\.[^\s@]+$/;
    if (!newErrors.email && !emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!newErrors.mobile && formData.mobile.length !== 10) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!newErrors.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    console.log(newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleRegisterTPC = async () => {

    if (validate()) {
      try {
        const convertedData = convertFormDataTypes(formData);
        convertedData.role = 'tpc';

        const response = await axios.post(
          `${connString}/tpo/tpcRegister`,
          convertedData
        );
        console.log("API Response:", response.data);

        // Handle success logic (e.g., navigate to a new screen or update the state)
        navigation.navigate("Home"); // Example navigation after successful signup
        Toast.show({
          type: "success",
          text1: "Registration Successfull!",
        });
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
      }
    }



    // try {
    //   const response = await fetch('https://your-backend-url/api/tpc/register', {
    //     method: 'POST',
    //     body: formToSubmit,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   if (response.ok) {
    //     Alert.alert('Success', 'TPC registered successfully');
    //   } else {
    //     Alert.alert('Error', 'Failed to register TPC');
    //   }
    // } catch (error) {
    //   Alert.alert('Error', 'Something went wrong. Please try again.');
    // }
  };
  const convertFormDataTypes = (formData) => {
    return {
      uid: formData.uid,
      f_name: formData.f_name,
      m_name: formData.m_name,
      l_name: formData.l_name,
      gender: formData.gender,
      email: formData.email,
      dept_id: Number(formData.dept_id),
      mobile: formData.mobile,
      passout_year: Number(formData.passout_year),
      password: formData.password,
    };
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Register TPC</Text>

      <TextInput
        placeholder="UID"
        value={formData.uid}
        onChangeText={(value) => handleInputChange('uid', value)}
        style={styles.input}
      />
      {errors["uid"] && <Text style={styles.error}>{errors["uid"]}</Text>}
      <TextInput
        placeholder="First Name"
        value={formData.f_name}
        onChangeText={(value) => handleInputChange('f_name', value)}
        style={styles.input}
      />
      {errors["f_name"] && <Text style={styles.error}>{errors["f_name"]}</Text>}
      <TextInput
        placeholder="Middle Name"
        value={formData.m_name}
        onChangeText={(value) => handleInputChange('m_name', value)}
        style={styles.input}
      />
      {errors["m_name"] && <Text style={styles.error}>{errors["m_name"]}</Text>}
      <TextInput
        placeholder="Last Name"
        value={formData.l_name}
        onChangeText={(value) => handleInputChange('l_name', value)}
        style={styles.input}
      />
      {errors["l_name"] && <Text style={styles.error}>{errors["l_name"]}</Text>}
      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        style={styles.input}
      />
      {errors["email"] && <Text style={styles.error}>{errors["email"]}</Text>}
      <TextInput
        placeholder="Mobile"
        value={formData.mobile}
        onChangeText={(value) => handleInputChange('mobile', value)}
        keyboardType='numeric'
        style={styles.input}
      />
      {errors["mobile"] && <Text style={styles.error}>{errors["mobile"]}</Text>}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={branches}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Branch"
        searchPlaceholder="Search..."
        value={formData.dept_id}
        onChange={(item) => handleInputChange("dept_id", item.value)}
      />
      {errors["dept_id"] && <Text style={styles.error}>{errors["dept_id"]}</Text>}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(itemValue) => handleInputChange('gender', itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>
      {errors["gender"] && <Text style={styles.error}>{errors["gender"]}</Text>}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.passout_year}
          onValueChange={(itemValue) => handleInputChange('passout_year', itemValue)}
        >
          <Picker.Item label="Select Passout Year" value='' />
          <Picker.Item label={new Date().getFullYear()} value={new Date().getFullYear()} />
          <Picker.Item label={new Date().getFullYear() + 1} value={new Date().getFullYear() + 1} />
        </Picker>
      </View>
      {errors["passout_year"] && <Text style={styles.error}>{errors["passout_year"]}</Text>}
      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => handleInputChange('password', value)}
        secureTextEntry={true}
        style={styles.input}
      />
      {errors["password"] && <Text style={styles.error}>{errors["password"]}</Text>}
      <TextInput
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => handleInputChange('confirmPassword', value)}
        secureTextEntry={true}
        style={styles.input}
      />
      {errors["confirmPassword"] && <Text style={styles.error}>{errors["confirmPassword"]}</Text>}
      <TouchableOpacity style={styles.register} onPress={handleRegisterTPC}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  pickerContainer: {
    borderWidth: 1, // Border width
    borderColor: 'gray', // Border color
    borderRadius: 5, // Rounded corners
    overflow: 'hidden', // Ensure picker stays inside border
    marginTop: 10,
  },
  register: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  registerText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddTPCScreen;
