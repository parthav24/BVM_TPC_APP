import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Button } from 'react-native';
import connString from '../../components/connectionString';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sample data
const placementDrives = {
  ongoing: [
    { id: '1', company: 'Google' },
    { id: '2', company: 'Amazon' },
    // Add more ongoing drives here...
  ],
  upcoming: [
    { id: '1', company: 'Microsoft', date: '2024-08-25', eligibility: 'All Branches', formLink: 'http://example.com/form1', formEndDate: '2024-08-24' },
    { id: '2', company: 'Apple', date: '2024-09-01', eligibility: 'CS, IT', formLink: 'http://example.com/form2', formEndDate: '2024-08-30' },
    // Add more upcoming drives here...
  ],
  completed: [
    { id: '1', company: 'IBM', startDate: '2024-07-10', endDate: '2024-07-12' },
    { id: '2', company: 'Intel', startDate: '2024-07-15', endDate: '2024-07-18' },
    // Add more completed drives here...
  ],
};

export default function StudentDashboard() {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [appliedDrives, setAppliedDrives] = useState([]);
  const [userData, setUserData] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);

  const handleApply = (drive) => {
    setSelectedDrive(drive);
    setModalVisible(true);
  };

  const handleApplySubmit = () => {
    if (selectedDrive) {
      setAppliedDrives([...appliedDrives, selectedDrive.id]);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${connString}/user/get-companies`)
        console.log(response.data);
        setUserData(JSON.parse(await AsyncStorage.getItem('userData')));
      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
      }
    }
    fetchData()
  }, [])

  const isEligible = () => {
    // Check eligibility based on company requirements and user details
    const meetsCPI = user.cpi >= company.req_CPI;
    const meetsBacklogs = (company.max_active_backlogs === null || user.no_active_backlog <= company.max_active_backlogs) &&
      (company.max_dead_backlogs === null || user.no_dead_backlog <= company.max_dead_backlogs);

    return meetsCPI && meetsBacklogs;
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.company}</Text>
      {selectedTab === 'upcoming' && (
        <>
          <Text style={styles.itemSubText}>Date: {item.date}</Text>
          <Text style={styles.itemSubText}>Eligibility: {item.eligibility}</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleApply(item)} >
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
          <Text style={styles.error}>
            You are not eligible to apply for this position.
          </Text>
        </>
      )}
      {selectedTab === 'completed' && (
        <>
          <Text style={styles.itemSubText}>Start Date: {item.startDate}</Text>
          <Text style={styles.itemSubText}>End Date: {item.endDate}</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Dashboard</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab('ongoing')}>
          <Text style={styles.tabButtonText}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab('upcoming')}>
          <Text style={styles.tabButtonText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab('completed')}>
          <Text style={styles.tabButtonText}>Completed</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={placementDrives[selectedTab]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Resource Center</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Apply for {selectedDrive?.company}</Text>
            <Text style={styles.modalText}>Form Link: <Text style={styles.link}>{selectedDrive?.formLink}</Text></Text>
            <Text style={styles.modalText}>Form End Date: {selectedDrive?.formEndDate}</Text>
            <Button title="Submit Application" onPress={handleApplySubmit} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  list: {
    marginBottom: 20,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
