import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Switch,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from 'expo-document-picker';
import axios from "axios";
import MultiSelect from 'react-native-multiple-select';
import connString from "../../components/connectionString";

const AddCompanyDetails = () => {
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    role: false,
    resume: false,
    companyJD: null, // File upload placeholder
    deadline: new Date(),
    req_CPI: "",
    max_dead_backlogs: "",
    max_active_backlogs: "",
    batch_year: "",
    roles: []
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availableRoles, setAvailableRoles] = useState(null); // Store roles from API

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || companyDetails.deadline;
    setCompanyDetails({ ...companyDetails, deadline: currentDate })
    setShowDatePicker(false);
  };

  // Fetch roles from the backend when the "role" toggle is on
  useEffect(() => {
    if (companyDetails.role) {
      axios
        .get(`${connString}/tpc/get-roles`) // Fetch available roles
        .then((response) => {
          setAvailableRoles(response.data.data); // Set available roles
        })
        .catch((error) => {
          console.error("Error fetching roles:", error);
        });
    }
  }, [companyDetails.role]);

  // Function to handle file upload
  const handleFileUpload = async () => {
    try {
      // Document picker logic
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // All file types
      });

      if (result.canceled === false) {
        // Set the file details in your state
        setCompanyDetails({
          ...companyDetails, companyJD: {
            uri: result.assets[0].uri,
            name: result.assets[0].name,
            type: result.assets[0].mimeType,
          }
        });
        console.log("File selected: ", result);
      }
    } catch (error) {
      console.error("Error picking document: ", error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Create a FormData object to send the form data, including the file
      const formData = new FormData();

      // Append text fields to formData
      formData.append("name", companyDetails.name);
      formData.append("role", companyDetails.role);
      formData.append("resume", companyDetails.resume);
      formData.append("roles", JSON.stringify(companyDetails.roles));
      formData.append("deadline", companyDetails.deadline.toISOString()); // Convert date to string format
      formData.append("req_CPI", companyDetails.req_CPI);
      formData.append("max_dead_backlogs", companyDetails.max_dead_backlogs);
      formData.append("max_active_backlogs", companyDetails.max_active_backlogs);
      formData.append("batch_year", Number(companyDetails.batch_year));

      // Append the file to formData (check if companyJD is not null)
      if (companyDetails.companyJD) {
        formData.append("company_JD", {
          uri: companyDetails.companyJD.uri,
          name: companyDetails.companyJD.name,
          type: "application/pdf", // Explicitly specify the MIME type
        });
      }

      // Use axios to post the form data
      const response = await axios.post(`${connString}/tpc/add-company`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Multipart form data is required for file upload
        },
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Company details submitted successfully!', [
          { text: 'OK' },
        ]);
        setCompanyDetails({
          name: "",
          role: false,
          resume: false,
          companyJD: null, // File upload placeholder
          deadline: new Date(),
          req_CPI: "",
          max_dead_backlogs: "",
          max_active_backlogs: "",
          batch_year: "",
          roles: []
        })
      } else {
        throw new Error('Failed to submit company details');
      }

    } catch (error) {
      console.error('Error submitting company details:', error);
      Alert.alert('Error', 'Failed to submit company details.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          placeholder="Company Name"
          value={companyDetails.name}
          onChangeText={(text) =>
            setCompanyDetails({ ...companyDetails, name: text.trim() })
          }
          style={styles.input}
        />

        {/* Role Switch */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Role</Text>
          <Switch
            value={companyDetails.role}
            onValueChange={(newValue) =>
              setCompanyDetails({ ...companyDetails, role: newValue })
            }
          />
        </View>

        {/* Resume Switch */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Resume</Text>
          <Switch
            value={companyDetails.resume}
            onValueChange={(newValue) =>
              setCompanyDetails({ ...companyDetails, resume: newValue })
            }
          />
        </View>

        {/* Show Role Selection when role is enabled */}
        {companyDetails.role && (
          <View>
            <Text style={styles.label}>Select Roles</Text>
            <MultiSelect
              items={availableRoles?.map((role, i) => ({
                id: role.role_id,
                name: role.role_name,
              }))}
              uniqueKey="id"
              onSelectedItemsChange={(roles) =>
                setCompanyDetails({ ...companyDetails, roles })
              }
              selectedItems={companyDetails.roles}
              selectText="Pick Roles"
              searchInputPlaceholderText="Search Roles..."
              submitButtonText="Submit"
              tagRemoveIconColor="#4A90E2"
              tagBorderColor="#4A90E2"
              tagTextColor="#4A90E2"
              selectedItemTextColor="#4A90E2"
              selectedItemIconColor="#4A90E2"
              itemTextColor="#000"
              displayKey="name"
              submitButtonColor="#4A90E2"
              styleInputGroup={styles.multiSelectInputGroup}
            />
          </View>
        )}

        {/* Company JD (File Upload) */}
        <View style={styles.uploadContainer}>
          <Button title="Upload Job Description" onPress={handleFileUpload} />
          {companyDetails?.companyJD && (
            <View>
              <Text style={styles.uploadedText}>
                JD: {companyDetails.companyJD?.name}
              </Text>
              <Text style={styles.previewText}>
                Preview not available for PDF files.
              </Text>
            </View>
          )}
        </View>

        {/* Deadline (DateTime Picker) */}
        <View style={styles.inputContainer}>
          <Text>Select Deadline : {companyDetails.deadline.toDateString()}</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.buttonText}>Select Deadline</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={companyDetails.deadline}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
        {/* Required CPI */}
        <TextInput
          placeholder="Required CPI"
          value={companyDetails.req_CPI}
          onChangeText={(text) =>
            setCompanyDetails({ ...companyDetails, req_CPI: text })
          }
          style={styles.input}
          keyboardType="numeric"
        />

        {/* Max Dead Backlogs */}
        <TextInput
          placeholder="Max Dead Backlogs"
          value={companyDetails.max_dead_backlogs}
          onChangeText={(text) =>
            setCompanyDetails({ ...companyDetails, max_dead_backlogs: text })
          }
          style={styles.input}
          keyboardType="numeric"
        />

        {/* Max Active Backlogs */}
        <TextInput
          placeholder="Max Active Backlogs"
          value={companyDetails.max_active_backlogs}
          onChangeText={(text) =>
            setCompanyDetails({ ...companyDetails, max_active_backlogs: text })
          }
          style={styles.input}
          keyboardType="numeric"
        />

        {/* Batch Year */}
        <TextInput
          placeholder="Batch Year"
          value={companyDetails.batch_year}
          onChangeText={(text) =>
            setCompanyDetails({ ...companyDetails, batch_year: text })
          }
          style={styles.input}
          keyboardType="numeric"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  uploadContainer: {
    marginBottom: 20,
  },
  uploadedText: {
    marginTop: 10,
    fontSize: 14,
    color: "green",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
  },
  previewText: {
    marginTop: 10,
    fontSize: 14,
    color: "orange",
  },
  dateButton: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddCompanyDetails;
