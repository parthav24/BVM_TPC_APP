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

export default function StudentApplications({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [students, setStudents] = useState({
    approvedStudents: [],
    pendingStudents: []
  });
  const [selectedTab, setSelectedTab] = useState('pending');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleViewClick = (uid) => {
    if (selectedTab === 'pending') {
      setSelectedUser(students.pendingStudents.find((student) => student.uid == uid));
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
        setUserData(JSON.parse(await AsyncStorage.getItem('userData')))
        setStudents((prev) => ({ ...prev, approvedStudents: response.data.approved_students }))
      } catch (error) {
        console.error('Approved students fetch failed:', error.response ? error.response.data : error.message);
      }
    }
    const fetchPendingCandidates = async () => {
      try {
        const response = await axios.get(`${connString}/tpc/get-pending-candidates`)
        setUserData(JSON.parse(await AsyncStorage.getItem('userData')))
        setStudents((prev) => ({ ...prev, pendingStudents: response.data.pending_students }))
      } catch (error) {
        console.error('Pending Student fetch failed:', error.response ? error.response.data : error.message);
      }
    }
    fetchApprovedCandidates()
    fetchPendingCandidates();
  }, [modalVisible])


  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, selectedTab === 'pending' && styles.activeTab]} onPress={() => setSelectedTab('pending')}>
          <Text style={styles.tabButtonText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, selectedTab === 'approved' && styles.activeTab]} onPress={() => setSelectedTab('approved')}>
          <Text style={styles.tabButtonText}>Approved</Text>
        </TouchableOpacity>
      </View>
      {selectedTab == 'approved' && (
        students.approvedStudents.length > 0 ? <FlatList
        data={students.approvedStudents}
        keyExtractor={(item, idx) => idx}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.studentText}>ID : </Text>
              <Text style={{ fontWeight: "bold" }}>{item.uid} </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.studentText}>Name : </Text>
              <Text style={{ fontWeight: "bold" }}>{item.f_name} {item.l_name}</Text>
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
      />:
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.noData}>No Students Available</Text>
      </View>)}
      {selectedTab === 'pending' && (
        students.pendingStudents.length > 0 ? <FlatList
          data={students.pendingStudents}
          keyExtractor={(item, idx) => idx}
          renderItem={({ item }) => (
            <View style={styles.studentItem}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.studentText}>ID : </Text>
                <Text style={{ fontWeight: "bold" }}>{item.uid} </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.studentText}>Name : </Text>
                <Text style={{ fontWeight: "bold" }}>{item.f_name} {item.l_name}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.studentText}>Status: </Text>
                <Text style={{
                  color: "#e1ad01",
                  fontWeight: "bold"
                }}>Pending</Text>
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
        /> :
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.noData}>No Students Available</Text>
          </View>)}

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
});
