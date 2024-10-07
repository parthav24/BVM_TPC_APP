import React, { useState, useEffect } from "react";
import axios from "axios";
import connString from "../../components/connectionString";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DisplayStudent from '../../components/DisplayStudent';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

export default function TPCHomeScreen({navigation}) {
  const [userData, setUserData] = useState(null);
  // const [students, setStudents] = useState({
  //   approvedStudents: [{ "address": "Surat", "cpi": 8.4, "createdAt": "2024-09-29T08:56:25.000Z", "dept_id": 3, "diploma_cpi": 0, "dob": "2003-04-08", "email": "italiyadhruv09@gmail.com", "f_name": "Dhruv", "gender": "male", "hsc_percentage": 99.2, "id": "21CP029", "l_name": "Italiya", "m_name": "Narshibhai", "mobile": "9714189489", "no_active_backlog": 0, "no_dead_backlog": 0, "passout_year": 2025, "password": "$2b$10$N/BR7UJdDqifS/f4lunWzOEF7Jy/8QqJ7HzN7e/yQNMs6yTg0JigO", "role": "student", "sem1": 8.4, "sem2": 8.4, "sem3": 8.4, "sem4": 8.4, "sem5": 0, "sem6": 0, "sem7": 0, "sem8": 0, "ssc_percentage": 98.4, "uid": "21CP029" }],
  //   pendingStudents: [{ "address": "Surat", "cpi": 8.4, "createdAt": "2024-09-29T08:56:25.000Z", "dept_id": 3, "diploma_cpi": 0, "dob": "2003-04-08", "email": "italiyadhruv09@gmail.com", "f_name": "Dhruv", "gender": "male", "hsc_percentage": 99.2, "id": "21CP029", "l_name": "Italiya", "m_name": "Narshibhai", "mobile": "9714189489", "no_active_backlog": 0, "no_dead_backlog": 0, "passout_year": 2025, "password": "$2b$10$N/BR7UJdDqifS/f4lunWzOEF7Jy/8QqJ7HzN7e/yQNMs6yTg0JigO", "role": "student", "sem1": 8.4, "sem2": 8.4, "sem3": 8.4, "sem4": 8.4, "sem5": 0, "sem6": 0, "sem7": 0, "sem8": 0, "ssc_percentage": 98.4, "uid": "21CP029" }]
  // });
  const [students, setStudents] = useState({
    approvedStudents: [],
    pendingStudents: []
  });
  const [selectedTab, setSelectedTab] = useState('pending');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const approveStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, status: "approved" } : student
      )
    );
  };

  const rejectStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, status: "rejected" } : student
      )
    );
  };

  const handleViewClick = (uid) => {
    console.log(uid);

    if (selectedTab === 'pending') {

      setSelectedUser(students.pendingStudents.find((student) => student.uid == uid));
      console.log(selectedUser);

    }
    else {
      setSelectedUser(students.approvedStudents.find((student) => student.uid == uid));
    }
    setModalVisible(true);
  }

  useEffect(() => {
    const fetchApprovedCandidates = async () => {
      try {
        const response = await axios.get(`${connString}/tpc/get-approved-candidates`)
        console.log(response.data);
        setUserData(JSON.parse(await AsyncStorage.getItem('userData')))
        setStudents((prev) => ({ ...prev, approvedStudents: response.data.approved_students }))

      } catch (error) {
        console.error('Approved students fetch failed:', error.response ? error.response.data : error.message);
      }
    }
    const fetchPendingCandidates = async () => {
      try {
        const response = await axios.get(`${connString}/tpc/get-pending-candidates`)
        console.log(response.data);
        setUserData(JSON.parse(await AsyncStorage.getItem('userData')))
        setStudents((prev) => ({ ...prev, pendingStudents: response.data.pending_students }))
      } catch (error) {
        console.error('Pending Student fetch failed:', error.response ? error.response.data : error.message);
      }
    }
    fetchApprovedCandidates()
    fetchPendingCandidates();
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab('pending')}>
          <Text style={styles.tabButtonText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab('approved')}>
          <Text style={styles.tabButtonText}>Approved</Text>
        </TouchableOpacity>
      </View>
      {selectedTab == 'approved' && <FlatList
        data={students.approvedStudents}
        keyExtractor={(item, idx) => idx}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.studentText}>ID : </Text>
              <Text style={{fontWeight:"bold"}}>{item.uid} </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
            <Text style={styles.studentText}>Name : </Text>
            <Text style={{fontWeight:"bold"}}>{item.f_name} {item.l_name}</Text>
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
      />}
      {selectedTab == 'pending' && <FlatList
        data={students.pendingStudents}
        keyExtractor={(item, idx) => idx}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text style={styles.studentText}>{item.f_name} {item.l_name}</Text>
            <Text style={styles.studentText}>Status: Pending</Text>
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
      />}

      <DisplayStudent
        student={selectedUser}
        approveStudent={approveStudent}
        rejectStudent={rejectStudent}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedTab={selectedTab}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#841584',
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
});
