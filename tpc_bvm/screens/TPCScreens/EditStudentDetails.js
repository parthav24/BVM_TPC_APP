<<<<<<< HEAD
import React, { useState, useMemo } from "react";
=======
import React, { useState, useMemo, useEffect } from "react";
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
import axios from "axios";
import connString from "../../components/connectionString";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
<<<<<<< HEAD

import { Dropdown } from "react-native-element-dropdown";
import RadioGroup from "react-native-radio-buttons-group";
=======
import Toast from "react-native-toast-message";
import { Dropdown } from "react-native-element-dropdown";
import RadioGroup from "react-native-radio-buttons-group";
import { useRoute } from "@react-navigation/native";
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d

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

export default function EditStudentDetails({ navigation }) {
<<<<<<< HEAD
  const [selectedId, setSelectedId] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    uid: "21CP037",
    dept_id: 3,
    f_name: "John",
    m_name: "A.",
    l_name: "Doe",
    email: "john.doe@example.com",
    mobile: "1234567890",
    address: "123 Main St, Anytown",
    dob: "2000-01-01",
    gender: "male",
    sem1: 8.0,
    sem2: 7.5,
    sem3: 8.2,
    sem4: 8.5,
    sem5: 7.8,
    sem6: 7.9,
    sem7: 8.1,
    sem8: 8.3,
    cpi: 8.0,
    diploma_cpi: "NA",
    hsc_percentage: 93.0,
    ssc_percentage: 85.0,
    passout_year: 2024,
    no_active_backlog: 0,
    no_dead_backlog: 0,
  });
=======
  const route = useRoute();
  const [selectedId, setSelectedId] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState();
  useEffect(() => {
    const { student } = route.params;
    console.log(student);
    setFormData(student)
  }, [])
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d

  const radioButtons = useMemo(
    () => [
      { id: "1", label: "Male", value: "male" },
      { id: "2", label: "Female", value: "female" },
    ],
    []
  );

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    handleChange("dob", new Date(date).toISOString().split("T")[0]);
    hideDatePicker();
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePress = (id) => {
    setSelectedId(id);
    const selectedButton = radioButtons.find((button) => button.id === id);
    if (selectedButton) {
      handleChange("gender", selectedButton.value);
    }
  };

  const validate = () => {
    const newErrors = {};
    // Removed required fields validation for edit page

    // Additional validations (optional, based on your requirements)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
<<<<<<< HEAD
    if (formData.email && !emailPattern.test(formData.email)) {
=======
    if (formData?.email && !emailPattern.test(formData?.email)) {
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
      newErrors.email = "Please enter a valid email address";
    }

    if (
<<<<<<< HEAD
      formData.mobile &&
      (formData.mobile.length < 10 || formData.mobile.length > 15)
=======
      formData?.mobile &&
      (formData?.mobile.length < 10 || formData?.mobile.length > 15)
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
    ) {
      newErrors.mobile = "Mobile number must be between 10 and 15 digits";
    }

    const percentageFields = ["ssc_percentage", "hsc_percentage"];
    percentageFields.forEach((field) => {
<<<<<<< HEAD
      if (formData[field] && (formData[field] < 0 || formData[field] > 100)) {
=======
      if (formData?.[field] && (formData?.[field] < 0 || formData?.[field] > 100)) {
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        newErrors[field] = "Percentage must be between 0 and 100";
      }
    });

    const semesterFields = ["sem1", "sem2", "sem3", "sem4"];
    semesterFields.forEach((field) => {
<<<<<<< HEAD
      if (formData[field] && (formData[field] < 0 || formData[field] > 10)) {
=======
      if (formData?.[field] && (formData?.[field] < 0 || formData?.[field] > 10)) {
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        newErrors[field] = "SPI must be between 0 and 10";
      }
    });

<<<<<<< HEAD
    if (formData.no_active_backlog < 0) {
      newErrors.no_active_backlog = "Active backlogs cannot be negative";
    }
    if (formData.no_dead_backlog < 0) {
=======
    if (formData?.no_active_backlog < 0) {
      newErrors.no_active_backlog = "Active backlogs cannot be negative";
    }
    if (formData?.no_dead_backlog < 0) {
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
      newErrors.no_dead_backlog = "Dead backlogs cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (validate()) {
      try {
        const convertedData = convertFormDataTypes(formData);

        const response = await axios.post(
<<<<<<< HEAD
          `${connString}/auth/studentRegister`,
          convertedData
        );
        console.log("API Response:", response.data);
        navigation.navigate("SignIn");
=======
          `${connString}/tpc/edit-candidate-details`,
          convertedData
        );
        Toast.show({
          type: "success",
          text1: `Details updated successfully!`,
        });
        console.log("API Response:", response.data);
        navigation.navigate("TPC", { screen: "TPCHome" });

>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        alert("An error occurred. Please try again."); // Notify the user of an error
      }
    }
  };

  const convertFormDataTypes = (formData) => {
    return {
<<<<<<< HEAD
      address: formData.address,
      dept_id: formData.dept_id ? Number(formData.dept_id) : null,
      diploma_cpi: formData.diploma_cpi ? Number(formData.diploma_cpi) : null,
      dob: formData.dob,
      email: formData.email,
      f_name: formData.f_name,
      gender: formData.gender,
      hsc_percentage: formData.hsc_percentage
        ? Number(formData.hsc_percentage)
        : null,
      l_name: formData.l_name,
      m_name: formData.m_name,
      mobile: formData.mobile,
      no_active_backlog: formData.no_active_backlog || 0,
      no_dead_backlog: formData.no_dead_backlog || 0,
      passout_year: Number(formData.passout_year),
      sem1: formData.sem1 ? Number(formData.sem1) : null,
      sem2: formData.sem2 ? Number(formData.sem2) : null,
      sem3: formData.sem3 ? Number(formData.sem3) : null,
      sem4: formData.sem4 ? Number(formData.sem4) : null,
      sem5: formData.sem5 ? Number(formData.sem5) : null,
      sem6: formData.sem6 ? Number(formData.sem6) : null,
      sem7: formData.sem7 ? Number(formData.sem7) : null,
      sem8: formData.sem8 ? Number(formData.sem8) : null,
      ssc_percentage: formData.ssc_percentage
        ? Number(formData.ssc_percentage)
=======
      uid: formData?.uid,
      address: formData?.address,
      dept_id: formData?.dept_id ? Number(formData?.dept_id) : null,
      diploma_cpi: formData?.diploma_cpi ? Number(formData?.diploma_cpi) : null,
      dob: formData?.dob,
      email: formData?.email,
      f_name: formData?.f_name,
      gender: formData?.gender,
      hsc_percentage: formData?.hsc_percentage
        ? Number(formData?.hsc_percentage)
        : null,
      l_name: formData?.l_name,
      m_name: formData?.m_name,
      mobile: formData?.mobile,
      no_active_backlog: formData?.no_active_backlog || 0,
      no_dead_backlog: formData?.no_dead_backlog || 0,
      passout_year: Number(formData?.passout_year),
      sem1: formData?.sem1 ? Number(formData?.sem1) : null,
      sem2: formData?.sem2 ? Number(formData?.sem2) : null,
      sem3: formData?.sem3 ? Number(formData?.sem3) : null,
      sem4: formData?.sem4 ? Number(formData?.sem4) : null,
      sem5: formData?.sem5 ? Number(formData?.sem5) : null,
      sem6: formData?.sem6 ? Number(formData?.sem6) : null,
      sem7: formData?.sem7 ? Number(formData?.sem7) : null,
      sem8: formData?.sem8 ? Number(formData?.sem8) : null,
      ssc_percentage: formData?.ssc_percentage
        ? Number(formData?.ssc_percentage)
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        : null,
    };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enter Your Details</Text>

      <Text style={styles.label}>Student ID (Ex. 21CP037)</Text>
      <TextInput
        style={styles.input}
<<<<<<< HEAD
        value={formData.uid}
=======
        value={formData?.uid}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        onChangeText={(value) => handleChange("uid", value)}
        editable={false} // Assuming Student ID should not be editable
      />

      <Text style={styles.label}>Select Department</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={branches}
        labelField="label"
        valueField="value"
        placeholder="Select Department"
<<<<<<< HEAD
        value={formData.dept_id}
=======
        value={formData?.dept_id}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        onChange={(item) => handleChange("dept_id", item.value)}
      />

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
<<<<<<< HEAD
        value={formData.f_name}
=======
        value={formData?.f_name}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        onChangeText={(value) => handleChange("f_name", value)}
      />

      <Text style={styles.label}>Middle Name</Text>
      <TextInput
        style={styles.input}
<<<<<<< HEAD
        value={formData.m_name}
=======
        value={formData?.m_name}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        onChangeText={(value) => handleChange("m_name", value)}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
<<<<<<< HEAD
        value={formData.l_name}
=======
        value={formData?.l_name}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        onChangeText={(value) => handleChange("l_name", value)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
<<<<<<< HEAD
        value={formData.email}
=======
        value={formData?.email}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        onChangeText={(value) => handleChange("email", value)}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        style={styles.input}
<<<<<<< HEAD
        value={formData.mobile}
=======
        value={formData?.mobile}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        onChangeText={(value) => handleChange("mobile", value)}
      />
      {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
<<<<<<< HEAD
        value={formData.address}
=======
        value={formData?.address}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        onChangeText={(value) => handleChange("address", value)}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
<<<<<<< HEAD
        <Text>{formData.dob}</Text>
=======
        <Text>{formData?.dob}</Text>
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={styles.label}>Gender</Text>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={handlePress}
        selectedId={selectedId}
        layout="row"
      />

      <View style={styles.spiContainer}>
        <View style={styles.spiGroup}>
          <Text style={styles.label}>Sem 1</Text>
          <TextInput
            style={styles.spiInput}
<<<<<<< HEAD
            value={formData.sem1?.toString()}
=======
            value={formData?.sem1?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
            onChangeText={(value) => handleChange("sem1", value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.spiGroup}>
          <Text style={styles.label}>Sem 2</Text>
          <TextInput
            style={styles.spiInput}
<<<<<<< HEAD
            value={formData.sem2?.toString()}
=======
            value={formData?.sem2?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
            onChangeText={(value) => handleChange("sem2", value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.spiGroup}>
          <Text style={styles.label}>Sem 3</Text>
          <TextInput
            style={styles.spiInput}
<<<<<<< HEAD
            value={formData.sem3?.toString()}
=======
            value={formData?.sem3?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
            onChangeText={(value) => handleChange("sem3", value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.spiGroup}>
          <Text style={styles.label}>Sem 4</Text>
          <TextInput
            style={styles.spiInput}
<<<<<<< HEAD
            value={formData.sem4?.toString()}
=======
            value={formData?.sem4?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
            onChangeText={(value) => handleChange("sem4", value)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.spiContainer}>
        <View style={styles.spiGroup}>
          <Text style={styles.label}>Sem 5</Text>
          <TextInput
            style={styles.spiInput}
<<<<<<< HEAD
            value={formData.sem5?.toString()}
=======
            value={formData?.sem5?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
            onChangeText={(value) => handleChange("sem5", value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.spiGroup}>
          <Text style={styles.label}>Sem 6</Text>
          <TextInput
            style={styles.spiInput}
<<<<<<< HEAD
            value={formData.sem6?.toString()}
=======
            value={formData?.sem6?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
            onChangeText={(value) => handleChange("sem6", value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.spiGroup}>
          <Text style={styles.label}>Sem 7</Text>
          <TextInput
            style={styles.spiInput}
<<<<<<< HEAD
            value={formData.sem7?.toString()}
=======
            value={formData?.sem7?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
            onChangeText={(value) => handleChange("sem7", value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.spiGroup}>
          <Text style={styles.label}>Sem 8</Text>
          <TextInput
            style={styles.spiInput}
<<<<<<< HEAD
            value={formData.sem8?.toString()}
=======
            value={formData?.sem8?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
            onChangeText={(value) => handleChange("sem8", value)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.spiContainer}>
        <View style={styles.spiGroup}>
          <Text style={styles.label}>Overall  CPI</Text>
          <TextInput
            style={styles.input}
<<<<<<< HEAD
            value={formData.cpi?.toString()}
=======
            value={formData?.cpi?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
            onChangeText={(value) => handleChange("cpi", value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.spiGroup}>
          <Text style={styles.label}>Diploma CPI</Text>
          <TextInput
            style={styles.input}
<<<<<<< HEAD
            value={formData.diploma_cpi}
=======
            value={formData?.diploma_cpi}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
            onChangeText={(value) => handleChange("diploma_cpi", value)}
          />
        </View>
        <View style={styles.spiGroup}>
          <Text style={styles.label}>HSC Percentage</Text>
          <TextInput
            style={styles.input}
<<<<<<< HEAD
            value={formData.hsc_percentage?.toString()}
=======
            value={formData?.hsc_percentage?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
            onChangeText={(value) => handleChange("hsc_percentage", value)}
            keyboardType="numeric"
          />
          {errors.hsc_percentage && (
            <Text style={styles.error}>{errors.hsc_percentage}</Text>
          )}
        </View>
        <View style={styles.spiGroup}>
          <Text style={styles.label}>SSC Percentage</Text>
          <TextInput
            style={styles.input}
<<<<<<< HEAD
            value={formData.ssc_percentage?.toString()}
=======
            value={formData?.ssc_percentage?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
            onChangeText={(value) => handleChange("ssc_percentage", value)}
            keyboardType="numeric"
          />
          {errors.ssc_percentage && (
            <Text style={styles.error}>{errors.ssc_percentage}</Text>
          )}
        </View>
      </View>
      <Text style={styles.label}>Passout Year</Text>
      <TextInput
        style={styles.input}
<<<<<<< HEAD
        value={formData.passout_year?.toString()}
=======
        value={formData?.passout_year?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        onChangeText={(value) => handleChange("passout_year", value)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Number of Active Backlogs</Text>
      <TextInput
        style={styles.input}
<<<<<<< HEAD
        value={formData.no_active_backlog?.toString()}
=======
        value={formData?.no_active_backlog?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        onChangeText={(value) => handleChange("no_active_backlog", value)}
        keyboardType="numeric"
      />
      {errors.no_active_backlog && (
        <Text style={styles.error}>{errors.no_active_backlog}</Text>
      )}

      <Text style={styles.label}>Number of Dead Backlogs</Text>
      <TextInput
        style={styles.input}
<<<<<<< HEAD
        value={formData.no_dead_backlog?.toString()}
=======
        value={formData?.no_dead_backlog?.toString()}
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        onChangeText={(value) => handleChange("no_dead_backlog", value)}
        keyboardType="numeric"
      />
      {errors.no_dead_backlog && (
        <Text style={styles.error}>{errors.no_dead_backlog}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Update Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  datePicker: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  spiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  spiGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  spiInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
