import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import connString from "../../components/connectionString";

export default function TPOProfile({ navigation }) {
  // Mock data, replace with real data
  const [tpoDetails, setTpoDetails] = useState(null);
  const [tpcMembers,setTpcMembers] = useState([]);
  // const tpoName = AsyncStorage.getItem("userData");
  useEffect(() => {
  const handleSetTpoDetails = async()=>{
    setTpoDetails(JSON.parse(await AsyncStorage.getItem('userData')));
  }
  handleSetTpoDetails();
  const fetchTpcDetails = async()=>{
    const data = await axios.get(`${connString}/tpo/get-tpc-members`);
    
    setTpcMembers(data.data.tpcMembersData)
  }
  fetchTpcDetails();
  }, [])

  const handleLogout = () => {
    AsyncStorage.removeItem("userData");
    AsyncStorage.removeItem("authToken");
    Toast.show({
      type: "success",
      text1: "Logged out Successfully",
    });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Main Home" }],
      })
    );
  };

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);

  const departments = [
    { id: 1, name: 'Civil Engineering-1' },
    { id: 2, name: 'Civil Engineering-2' },
    { id: 3, name: 'Computer Engineering' },
    { id: 4, name: 'Electrical Engineering' },
    { id: 5, name: 'Electronics Engineering' },
    { id: 6, name: 'Electronics and Communication' },
    { id: 7, name: 'Mechanical Engineering-1' },
    { id: 8, name: 'Mechanical Engineering-2' },
    { id: 9, name: 'Production Engineering' },
    { id: 10, name: 'Information Technology' },
  ];

  const handleDepartmentChange = (departmentId) => {
    setSelectedDepartment(departmentId);
    
    const members = tpcMembers?.filter((member) => member.dept_id === departmentId);
    setFilteredMembers(members);
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>TPO Profile</Text>
        <Text style={styles.label}>
          <Ionicons name="person-outline" size={18} color="#007bff" /> Name:{" "}
          <Text style={styles.value}>{tpoDetails?.f_name+" "+tpoDetails?.l_name}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="business-outline" size={18} color="#007bff" /> Total
          Companies Arrived:{"30"}
          {/* <Text style={styles.value}>{tpoDetails?.totalCompanies}</Text> */}
        </Text>
        <Text style={styles.label}>
          <Ionicons name="people-outline" size={18} color="#007bff" /> Total
          Students Placed:{"50"}
          {/* <Text style={styles.value}>{tpoDetails?.totalStudentsPlaced}</Text> */}
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>TPC Members</Text>

        {/* Dropdown for selecting department */}
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedDepartment}
            style={styles.picker}
            onValueChange={(itemValue) => handleDepartmentChange(itemValue)}
          >
            <Picker.Item label="Select Department" value="" />
            {departments.map((dept) => (
              <Picker.Item key={dept.id} label={dept.name} value={dept.id} />
            ))}
          </Picker>
        </View>

        {/* Display members */}
        <View style={styles.card}>
          {filteredMembers?.length > 0 ? (
            filteredMembers?.map((member) => (
              <View key={member.uid} style={styles.memberContainer}>
                <Text style={styles.memberName}>Name: {member.f_name} {member.l_name}</Text>
                <Text>Mobile: {member.mobile}</Text>
                <Text>Email: {member.email}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No members available for the selected department.</Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007bff",
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: "#555",
  },
  value: {
    fontWeight: "bold",
  },
  memberContainer: {
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberName: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  dropdownContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  memberContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  noDataText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
  },
});
