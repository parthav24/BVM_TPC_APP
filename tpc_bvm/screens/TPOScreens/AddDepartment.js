import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import connString from "../../components/connectionString.js"; 

const AddDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [deptId, setDeptId] = useState(null); // For editing department

  // Fetch all departments on component mount
  useEffect(() => {
    getDepartments();
  }, []);

  // Fetch departments from the backend
  const getDepartments = async () => {
    try {
      const response = await axios.get(`${connString}/tpo/get-departments`);
      setDepartments(response.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  // Add a new department
  const addDepartment = async () => {
    if (newDepartment.trim()) {
      try {
        await axios.post(`${connString}/tpo/add-department`, {
          dept_name: newDepartment,
        });
        getDepartments(); // Refresh the list
        setNewDepartment("");
        setModalVisible(false);
      } catch (err) {
        console.error("Error adding department:", err);
      }
    }
  };

  // Edit an existing department
  const editDepartment = async () => {
    try {
      await axios.put(`${connString}/tpo/update-department/${deptId}`, {
        dept_name: newDepartment,
      });
      getDepartments(); // Refresh the list
      setNewDepartment("");
      setDeptId(null);
      setEditingDepartment(null);
      setModalVisible(false);
    } catch (err) {
      console.error("Error editing department:", err);
    }
  };

  // Delete a department
  const deleteDepartment = async (dept_id) => {
    try {
      await axios.delete(`${connString}/tpo/delete-department/${Number(dept_id)}`);
      getDepartments(); // Refresh the list
    } catch (err) {
      console.error("Error deleting department:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Departments</Text>

      <FlatList
        data={departments}
        keyExtractor={(item) => item.dept_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.departmentItem}>
            <Text style={styles.departmentText}>{item.dept_name}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setEditingDepartment(item.dept_name);
                  setNewDepartment(item.dept_name);
                  setDeptId(item.dept_id);
                }}
              >
                <Ionicons name="create-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteDepartment(item.dept_id)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
          setEditingDepartment(null);
          setNewDepartment("");
        }}
      >
        <Ionicons name="add-circle-outline" size={40} color="green" />
        <Text style={styles.addButtonText}>Add Department</Text>
      </TouchableOpacity>

      {/* Modal for Adding/Editing Department */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {editingDepartment !== null ? "Edit Department" : "Add Department"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Department Name"
            value={newDepartment}
            onChangeText={setNewDepartment}
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={editingDepartment !== null ? editDepartment : addDepartment}
          >
            <Text style={styles.modalButtonText}>
              {editingDepartment !== null ? "Save Changes" : "Add Department"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  departmentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f5f5f5",
    marginVertical: 8,
    borderRadius: 5,
  },
  departmentText: {
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 18,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});

export default AddDepartment;
