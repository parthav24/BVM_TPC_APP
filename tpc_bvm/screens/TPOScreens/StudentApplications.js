import React, { useState, useEffect } from "react";
import axios from "axios";
import connString from "../../components/connectionString";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DisplayStudent from "../../components/DisplayStudent";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

export default function StudentApplications({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [students, setStudents] = useState({
    approvedStudents: [],
    pendingStudents: [],
  });
  const [selectedTab, setSelectedTab] = useState("pending");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [departments, setDepartments] = useState([
    { "name": "All", id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { "name": "CE-1", id: [1] },
    { "name": "CE-2", id: [2] },
    { "name": "CP", id: [3] },
    { "name": "EE", id: [4] },
    { "name": "EL-1", id: [5] },
    { "name": "EC", id: [6] },
    { "name": "ME-1", id: [7] },
    { "name": "ME-2", id: [8] },
    { "name": "PE", id: [9] },
    { "name": "IT", id: [10] },
    { "name": "EL-2", id: [11] },]);
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0].id);

  const handleViewClick = (uid) => {
    if (selectedTab === "pending") {
      setSelectedUser(
        students.pendingStudents.find((student) => student.uid == uid)
      );
    } else {
      setSelectedUser(
        students.approvedStudents.find((student) => student.uid == uid)
      );
    }
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setUserData(JSON.parse(await AsyncStorage.getItem("userData")));

        // Fetch Approved Students
        const approvedResponse = await axios.get(
          `${connString}/tpo/get-approved-candidates`,
          {
            params: { departments: selectedDepartment }, // Pass selected department
          }
        );
        setStudents((prev) => ({
          ...prev,
          approvedStudents: approvedResponse.data.approved_students,
        }));

        // Fetch Pending Students
        console.log(selectedDepartment);

        const pendingResponse = await axios.get(
          `${connString}/tpo/get-pending-candidates`,
          {
            params: { departments: selectedDepartment }, // Pass selected department
          }
        );
        setStudents((prev) => ({
          ...prev,
          pendingStudents: pendingResponse.data.pending_students,
        }));
      } catch (error) {
        console.error(
          "Data fetch failed:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchCandidates();
  }, [selectedDepartment, modalVisible]);

  return (
    <View style={styles.container}>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "pending" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("pending")}
        >
          <Text style={styles.tabButtonText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "approved" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("approved")}
        >
          <Text style={styles.tabButtonText}>Approved</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickerContainer}>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedDepartment}

            onValueChange={(itemValue) => setSelectedDepartment(itemValue)}
          >
            {departments.map((dept, idx) => (
              <Picker.Item key={idx} label={dept.name} value={dept.id} />
            ))}
          </Picker>
        </View>
      </View>
      {/* Application List */}
      {selectedTab === "approved" &&
        (students.approvedStudents.length > 0 ? (
          <FlatList
            data={students.approvedStudents}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => (
              <View style={styles.studentItem}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.studentText}>ID : </Text>
                  <Text style={{ fontWeight: "bold" }}>{item.uid} </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.studentText}>Name : </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.f_name} {item.l_name}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.studentText}>Status: </Text>
                  <Text style={styles.approvedText}>Approved</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => handleViewClick(item.uid)}
                  >
                    <Text style={styles.buttonText}>View Application</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noData}>No Students Available</Text>
          </View>
        ))}
      {selectedTab === "pending" &&
        (students.pendingStudents.length > 0 ? (
          <FlatList
            data={students.pendingStudents}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => (
              <View style={styles.studentItem}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.studentText}>ID : </Text>
                  <Text style={{ fontWeight: "bold" }}>{item.uid} </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.studentText}>Name : </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.f_name} {item.l_name}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.studentText}>Status: </Text>
                  <Text
                    style={{
                      color: "#e1ad01",
                      fontWeight: "bold",
                    }}
                  >
                    Pending
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => handleViewClick(item.uid)}
                  >
                    <Text style={styles.buttonText}>View Application</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noData}>No Students Available</Text>
          </View>
        ))}

      {/* Modal for Viewing Student */}
      <DisplayStudent
        student={selectedUser}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedTab={selectedTab}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Same styles as your previous code
  pickerContainer: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'flex-end'
  },
  picker: {
    justifyContent: 'center',
    width: "30%",
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tabButton: {
    width: '49%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#841584',
  },
  activeTab: {
    backgroundColor: '#702963',
  },
  tabButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  approvedText: {
    color: "green",
    fontWeight: "bold"
  },
  pendingText: {
    color: "yellow",
    fontWeight: "bold"
  },
  noData: {
    color: 'gray',
    fontSize: 36
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  studentItem: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    marginVertical: 5,
    width: 300,

  },
  studentText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  viewButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noDataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

