import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Switch,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from 'expo-document-picker';

const AddCompanyDetails = () => {
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    role: false,
    resume: false,
    companyJD: null, // File upload placeholder
    deadline: new Date(),
    reqCPI: "",
    maxDeadBacklogs: "",
    maxActiveBacklogs: "",
    batchYear: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || companyDetails.deadline;
    setShowDatePicker(false);
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    try {
      // Document picker logic
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // All file types
      });

      if (result.type === "success") {
        // Set the file details in your state
        setCompanyDetails({ ...companyDetails, companyJD: result });
        console.log("File selected: ", result);
      }
    } catch (error) {
      console.error("Error picking document: ", error);
    }
  };

  const handleSubmit = () => {
    console.log(companyDetails); // You can handle the form submission here
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Company Name"
        value={companyDetails.companyName}
        onChangeText={(text) =>
          setCompanyDetails({ ...companyDetails, companyName: text })
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

      {/* Company JD (File Upload) */}
      <View style={styles.uploadContainer}>
        <Button title="Upload JD" onPress={handleFileUpload} />
        {companyDetails.companyJD && (
          <View>
            <Text style={styles.uploadedText}>
              JD: {companyDetails.companyJD.name}
            </Text>
            {/* Preview the file if it is an image */}
            {companyDetails.companyJD.mimeType?.startsWith("image/") && (
              <Image
                source={{ uri: companyDetails.companyJD.uri }}
                style={styles.imagePreview}
              />
            )}
            {/* If it's a PDF or another file type, you can render a different preview */}
            {companyDetails.companyJD.mimeType === "application/pdf" && (
              <Text style={styles.previewText}>
                Preview not available for PDF files.
              </Text>
            )}
          </View>
        )}
      </View>

      {/* Deadline (DateTime Picker) */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.buttonText}>Select Deadline</Text>
        </TouchableOpacity>
        <Text>{companyDetails.deadline.toDateString()}</Text>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={companyDetails.deadline}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Required CPI */}
      <TextInput
        placeholder="Required CPI"
        value={companyDetails.reqCPI}
        onChangeText={(text) =>
          setCompanyDetails({ ...companyDetails, reqCPI: text })
        }
        style={styles.input}
        keyboardType="numeric"
      />

      {/* Max Dead Backlogs */}
      <TextInput
        placeholder="Max Dead Backlogs"
        value={companyDetails.maxDeadBacklogs}
        onChangeText={(text) =>
          setCompanyDetails({ ...companyDetails, maxDeadBacklogs: text })
        }
        style={styles.input}
        keyboardType="numeric"
      />

      {/* Max Active Backlogs */}
      <TextInput
        placeholder="Max Active Backlogs"
        value={companyDetails.maxActiveBacklogs}
        onChangeText={(text) =>
          setCompanyDetails({ ...companyDetails, maxActiveBacklogs: text })
        }
        style={styles.input}
        keyboardType="numeric"
      />

      {/* Batch Year */}
      <TextInput
        placeholder="Batch Year"
        value={companyDetails.batchYear}
        onChangeText={(text) =>
          setCompanyDetails({ ...companyDetails, batchYear: text })
        }
        style={styles.input}
        keyboardType="numeric"
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
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
