import React, { useState, useMemo } from "react";
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
    passout_year: new Date().getFullYear(),
    ssc_percentage: null,
    hsc_percentage: null,
    no_active_backlog: 0,
    no_dead_backlog: 0,
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
    const dob = new Date(date).toISOString().split('T');
    handleChange("dob", dob[0]);
    console.warn("A date has been picked: ", dob[0]);
    hideDatePicker();
  };

  const handleChange = (name, value) => {
    console.log(typeof value);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePress = (id) => {
    setSelectedId(id);
    const selectedButton = radioButtons.find(button => button.id === id);
    if (selectedButton) {
      handleChange('gender', selectedButton.value); // Call handleChange with gender
    }
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      'address', 'confirmPassword', 'dept_id', 'dob', 'email', 'f_name', 'gender',
      'l_name', 'mobile', 'no_active_backlog', 'no_dead_backlog', 'passout_year',
      'password', 'sem3', 'sem4', 'ssc_percentage', 'uid'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSignUp = async () => {
    // Add your sign-up logic here
    if (validate()) {
      try {
        console.log("Hii");

        const { data } = await axios.post(`${connString}/auth/studentRegister`, formData);
        console.log("sir ");
        const dataWithSrNo = data.placement_data.map((student, idx) => ({
          ...student,
          srNo: idx + 1
        }))

        setStudentData(dataWithSrNo);
        setLoading(false);
        setLoading(false);
      } catch (err) {
        // setErrors('Failed to fetch data');
        setLoading(false);
      }
    }
    console.log(formData);
  };

  const convertFormDataTypes = (formData) => {
    return {
      address: formData.address, // Assuming address is a string
      confirmPassword: formData.confirmPassword, // Assuming this is also a string
      dept_id: formData.dept_id !== "" ? Number(formData.dept_id) : null, // Convert to number or null
      diploma_cpi: formData.diploma_cpi !== "" ? Number(formData.diploma_cpi) : null, // Convert to number or null
      dob: formData.dob, // Assuming dob is a string
      email: formData.email, // Assuming email is a string
      f_name: formData.f_name, // Assuming first name is a string
      gender: formData.gender, // Assuming gender is a string
      hsc_percentage: formData.hsc_percentage !== "" ? Number(formData.hsc_percentage) : null, // Convert to number or null
      l_name: formData.l_name, // Assuming last name is a string
      m_name: formData.m_name, // Assuming middle name is a string
      mobile: formData.mobile, // Assuming mobile is a string
      no_active_backlog: formData.no_active_backlog !== "" ? Number(formData.no_active_backlog) : 0, // Convert to number
      no_dead_backlog: formData.no_dead_backlog !== "" ? Number(formData.no_dead_backlog) : 0, // Convert to number
      passout_year: Number(formData.passout_year), // Convert to number
      password: formData.password, // Assuming password is a string
      sem1: formData.sem1 !== "" ? Number(formData.sem1) : null, // Convert to number or null
      sem2: formData.sem2 !== "" ? Number(formData.sem2) : null, // Convert to number or null
      sem3: formData.sem3 !== "" ? Number(formData.sem3) : null, // Convert to number or null
      sem4: formData.sem4 !== "" ? Number(formData.sem4) : null, // Convert to number or null
      sem5: formData.sem5 !== "" ? Number(formData.sem5) : null, // Convert to number or null
      sem6: formData.sem6 !== "" ? Number(formData.sem6) : null, // Convert to number or null
      sem7: formData.sem7 !== "" ? Number(formData.sem7) : null, // Convert to number or null
      sem8: formData.sem8 !== "" ? Number(formData.sem8) : null, // Convert to number or null
      ssc_percentage: formData.ssc_percentage !== "" ? Number(formData.ssc_percentage) : null, // Convert to number or null
      uid: formData.uid // Assuming UID is a string
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
      {errors['uid'] && <Text style={styles.error}>{errors['uid']}</Text>}

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
      {errors['dept_id'] && <Text style={styles.error}>{errors['dept_id']}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      {errors['email'] && <Text style={styles.error}>{errors['email']}</Text>}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.f_name}
        onChangeText={(text) => handleChange("f_name", text)}
      />
      {errors['f_name'] && <Text style={styles.error}>{errors['f_name']}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Middle Name"
        value={formData.m_name}
        onChangeText={(text) => handleChange("m_name", text)}
      />
      {errors['m_name'] && <Text style={styles.error}>{errors['m_name']}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.l_name}
        onChangeText={(text) => handleChange("l_name", text)}
      />
      {errors['l_name'] && <Text style={styles.error}>{errors['l_name']}</Text>}
      <RadioGroup
        radioButtons={radioButtons}
        onPress={handlePress}
        selectedId={selectedId}
        layout="row"
      />
      {errors['gender'] && <Text style={styles.error}>{errors['gender']}</Text>}

      <TouchableOpacity
        style={styles.input}
        placeholder="Date of Birth"
        onPress={showDatePicker}
      >
        <Text>{formData.dob}</Text>
      </TouchableOpacity>
      {errors['dob'] && <Text style={styles.error}>{errors['dob']}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={formData.mobile}
        onChangeText={(text) => handleChange("mobile", text)}
        />
        {errors['dob'] && <Text style={styles.error}>{errors['dob']}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(text) => handleChange("address", text)}
        />
        {errors['dob'] && <Text style={styles.error}>{errors['dob']}</Text>}
      <View style={styles.viewInput}>
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 1"}
          value={formData.sem1}
          onChangeText={(text) => handleChange("sem1", text)}
          />
          {errors['dob'] && <Text style={styles.error}>{errors['dob']}</Text>}
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 2"}
          value={formData.sem2}
          onChangeText={(text) => handleChange("sem2", text)}
        />
      </View>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 3"}
          value={formData.sem3}
          onChangeText={(text) => handleChange("sem3", text)}
        />
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 4"}
          value={formData.sem4}
          onChangeText={(text) => handleChange("sem4", text)}
        />
      </View>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 5"}
          value={formData.sem5}
          onChangeText={(text) => handleChange("sem5", text)}
        />
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 6"}
          value={formData.sem6}
          onChangeText={(text) => handleChange("sem6", text)}
        />
      </View>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 7"}
          value={formData.sem7}
          onChangeText={(text) => handleChange("sem7", text)}
        />
        <TextInput
          style={styles.resultInput}
          placeholder={"SPI Sem 8"}
          value={formData.sem8}
          onChangeText={(text) => handleChange("sem8", text)}
        />
      </View>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.resultInput}
          placeholder={"Diploma CPI"}
          value={formData.diploma_cpi}
          onChangeText={(text) => handleChange("diploma_cpi", text)}
        />
        <TextInput
          style={styles.resultInput}
          placeholder={"Passout Year"}
          value={formData.passout_year}
          onChangeText={(text) => handleChange("passout_year", text)}
        />
      </View>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.resultInput}
          placeholder={"SSC Percentage"}
          value={formData.ssc_percentage}
          onChangeText={(text) => handleChange("ssc_percentage", text)}
        />
        <TextInput
          style={styles.resultInput}
          placeholder={"HSC Percentage"}
          value={formData.hsc_percentage}
          onChangeText={(text) => handleChange("hsc_percentage", text)}
        />
      </View>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.resultInput}
          placeholder="No. of Active Backlogs"
          value={formData.no_active_backlog}
          onChangeText={(text) => handleChange("no_active_backlog", text)}
        />
        <TextInput
          style={styles.resultInput}
          placeholder="No. of Dead Backlogs"
          value={formData.no_dead_backlog}
          onChangeText={(text) => handleChange("no_dead_backlog", text)}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 5,
  },
  resultInput: {
    width: "48%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  viewInput: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 5,
  },
  rowTextStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  dropdown: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
  }
});
