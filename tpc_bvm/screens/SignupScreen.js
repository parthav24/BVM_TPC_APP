import React, { useState, useMemo } from "react";
import axios from "axios";
import connString from "../components/connectionString";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import RadioGroup from "react-native-radio-buttons-group";

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

export default function SignUpScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    uid: "",
    dept_id: null,
    f_name: "",
    m_name: "",
    l_name: "",
    dob: "Select DOB",
    gender: "",
    email: "",
    mobile: "",
    address: "",
    sem1: null,
    sem2: null,
    sem3: null,
    sem4: null,
    sem5: null,
    sem6: null,
    sem7: null,
    sem8: null,
    diploma_cpi: null,
    passout_year: "",
    ssc_percentage: null,
    hsc_percentage: null,
    no_active_backlog: "",
    no_dead_backlog: "",
    password: "",
    confirmPassword: "",
  });

  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Male",
        value: "male",
      },
      {
        id: "2",
        label: "Female",
        value: "female",
      },
    ],
    []
  );
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dob = new Date(date).toISOString().split("T");
    handleChange("dob", dob[0]);
    hideDatePicker();
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
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
    const requiredFields = [
      "address",
      "confirmPassword",
      "dept_id",
      "dob",
      "email",
      "f_name",
      "gender",
      "l_name",
      "mobile",
      "no_active_backlog",
      "no_dead_backlog",
      "passout_year",
      "password",
      "sem1",
      "sem2",
      "sem3",
      "sem4",
      "ssc_percentage",
      "hsc_percentage",
      "uid",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Additional validations
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (
      formData.mobile &&
      (formData.mobile.length < 10 || formData.mobile.length > 15)
    ) {
      newErrors.mobile = "Mobile number must be between 10 and 15 digits";
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const percentageFields = ["ssc_percentage", "hsc_percentage"];
    percentageFields.forEach((field) => {
      if (formData[field] && (formData[field] < 0 || formData[field] > 100)) {
        newErrors[field] = "Percentage must be between 0 and 100";
      }
    });

    const semesterFields = ["sem1", "sem2", "sem3", "sem4"];

    semesterFields.forEach((field) => {
      if (formData[field] && (formData[field] < 0 || formData[field] > 10)) {
        newErrors[field] = "SPI must be between 0 and 10";
      }
    });

    // Ensure active and dead backlog counts are non-negative
    if (formData.no_active_backlog < 0) {
      newErrors.no_active_backlog = "Active backlogs cannot be negative";
    }
    if (formData.no_dead_backlog < 0) {
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
          `${connString}/auth/studentRegister`,
          convertedData
        );
        console.log("API Response:", response.data);

        // Handle success logic (e.g., navigate to a new screen or update the state)
        navigation.navigate("SignIn"); // Example navigation after successful signup
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
      }
    }
  };

  const convertFormDataTypes = (formData) => {
    return {
      address: formData.address,
      confirmPassword: formData.confirmPassword,
      dept_id: formData.dept_id !== "" ? Number(formData.dept_id) : null,
      diploma_cpi:
        formData.diploma_cpi !== "" ? Number(formData.diploma_cpi) : null,
      dob: formData.dob,
      email: formData.email,
      f_name: formData.f_name,
      gender: formData.gender,
      hsc_percentage:
        formData.hsc_percentage !== "" ? Number(formData.hsc_percentage) : null,
      l_name: formData.l_name,
      m_name: formData.m_name,
      mobile: formData.mobile,
      no_active_backlog:
        formData.no_active_backlog !== ""
          ? Number(formData.no_active_backlog)
          : 0,
      no_dead_backlog:
        formData.no_dead_backlog !== "" ? Number(formData.no_dead_backlog) : 0,
      passout_year: Number(formData.passout_year),
      password: formData.password,
      sem1: formData.sem1 !== "" ? Number(formData.sem1) : null,
      sem2: formData.sem2 !== "" ? Number(formData.sem2) : null,
      sem3: formData.sem3 !== "" ? Number(formData.sem3) : null,
      sem4: formData.sem4 !== "" ? Number(formData.sem4) : null,
      sem5: formData.sem5 !== "" ? Number(formData.sem5) : null,
      sem6: formData.sem6 !== "" ? Number(formData.sem6) : null,
      sem7: formData.sem7 !== "" ? Number(formData.sem7) : null,
      sem8: formData.sem8 !== "" ? Number(formData.sem8) : null,
      ssc_percentage:
        formData.ssc_percentage !== "" ? Number(formData.ssc_percentage) : null,
      hsc_percentage:
        formData.hsc_percentage !== "" ? Number(formData.hsc_percentage) : null,
      uid: formData.uid,
    };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enter Your Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Student ID (Ex. 21CP029)"
        value={formData.uid}
        onChangeText={(text) => handleChange("uid", text)}
      />
      {errors["uid"] && <Text style={styles.error}>{errors["uid"]}</Text>}

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
        onChange={(item) => handleChange("dept_id", item.value)}
      />
      {errors["dept_id"] && (
        <Text style={styles.error}>{errors["dept_id"]}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.f_name}
        onChangeText={(text) => handleChange("f_name", text)}
      />
      {errors["f_name"] && <Text style={styles.error}>{errors["f_name"]}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Middle Name"
        value={formData.m_name}
        onChangeText={(text) => handleChange("m_name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.l_name}
        onChangeText={(text) => handleChange("l_name", text)}
      />
      {errors["l_name"] && <Text style={styles.error}>{errors["l_name"]}</Text>}

      <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
        <Text style={styles.dateText}>{formData.dob}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {errors["dob"] && <Text style={styles.error}>{errors["dob"]}</Text>}

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Gender:</Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={handlePress}
          selectedId={selectedId}
          layout="row"
        />
      </View>
      {errors["gender"] && <Text style={styles.error}>{errors["gender"]}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      {errors["email"] && <Text style={styles.error}>{errors["email"]}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={formData.mobile}
        onChangeText={(text) => handleChange("mobile", text)}
      />
      {errors["mobile"] && <Text style={styles.error}>{errors["mobile"]}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(text) => handleChange("address", text)}
      />
      {errors["address"] && (
        <Text style={styles.error}>{errors["address"]}</Text>
      )}

      <View style={styles.spiInput}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Semester 1 SPI"
            keyboardType="numeric"
            value={formData.sem1}
            onChangeText={(text) => handleChange("sem1", text)}
          />
          {errors["sem1"] && <Text style={styles.error}>{errors["sem1"]}</Text>}
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Semester 2 SPI"
            keyboardType="numeric"
            value={formData.sem2}
            onChangeText={(text) => handleChange("sem2", text)}
          />
          {errors["sem2"] && <Text style={styles.error}>{errors["sem2"]}</Text>}
        </View>
      </View>

      <View style={styles.spiInput}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Semester 3 SPI"
            keyboardType="numeric"
            value={formData.sem3}
            onChangeText={(text) => handleChange("sem3", text)}
          />
          {errors["sem3"] && <Text style={styles.error}>{errors["sem3"]}</Text>}
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Semester 4 SPI"
            keyboardType="numeric"
            value={formData.sem4}
            onChangeText={(text) => handleChange("sem4", text)}
          />
          {errors["sem4"] && <Text style={styles.error}>{errors["sem4"]}</Text>}
        </View>
      </View>

      <View style={styles.spiInput}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Semester 5 SPI"
            keyboardType="numeric"
            value={formData.sem5}
            onChangeText={(text) => handleChange("sem5", text)}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Semester 6 SPI"
            keyboardType="numeric"
            value={formData.sem6}
            onChangeText={(text) => handleChange("sem6", text)}
          />
        </View>
      </View>

      <View style={styles.spiInput}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Semester 7 SPI"
            keyboardType="numeric"
            value={formData.sem7}
            onChangeText={(text) => handleChange("sem7", text)}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Semester 8 SPI"
            keyboardType="numeric"
            value={formData.sem8}
            onChangeText={(text) => handleChange("sem8", text)}
          />
        </View>
      </View>

      <View style={styles.spiInput}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Diploma CPI"
            keyboardType="numeric"
            value={formData.diploma_cpi}
            onChangeText={(text) => handleChange("diploma_cpi", text)}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Passout Year"
            keyboardType="numeric"
            value={formData.passout_year.toString()}
            onChangeText={(text) => handleChange("passout_year", text)}
          />
          {errors["passout_year"] && (
            <Text style={styles.error}>{errors["passout_year"]}</Text>
          )}
        </View>
      </View>

      <View style={styles.spiInput}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="SSC Percentage"
            keyboardType="numeric"
            value={formData.ssc_percentage}
            onChangeText={(text) => handleChange("ssc_percentage", text)}
          />
          {errors["ssc_percentage"] && (
            <Text style={styles.error}>{errors["ssc_percentage"]}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="HSC Percentage"
            keyboardType="numeric"
            value={formData.hsc_percentage}
            onChangeText={(text) => handleChange("hsc_percentage", text)}
          />
          {errors["hsc_percentage"] && (
            <Text style={styles.error}>{errors["hsc_percentage"]}</Text>
          )}
        </View>
      </View>

      <View style={styles.spiInput}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="No. of Active Backlogs"
            keyboardType="numeric"
            value={formData.no_active_backlog.toString()}
            onChangeText={(text) => handleChange("no_active_backlog", text)}
          />
          {errors["no_active_backlog"] && (
            <Text style={styles.error}>{errors["no_active_backlog"]}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="No. of Dead Backlogs"
            keyboardType="numeric"
            value={formData.no_dead_backlog.toString()}
            onChangeText={(text) => handleChange("no_dead_backlog", text)}
          />
          {errors["no_dead_backlog"] && (
            <Text style={styles.error}>{errors["no_dead_backlog"]}</Text>
          )}
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      {errors["password"] && (
        <Text style={styles.error}>{errors["password"]}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
      />
      {errors["confirmPassword"] && (
        <Text style={styles.error}>{errors["confirmPassword"]}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  spiInput: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  datePicker: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  dateText: {
    color: "black",
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 4,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioLabel: {
    marginRight: 10,
  },
});
