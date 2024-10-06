import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Button } from 'react-native';
import connString from '../../components/connectionString';
import ApplyModal from '../../components/ApplyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StudentDashboard() {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [appliedDrives, setAppliedDrives] = useState([]);
  const [userData, setUserData] = useState(null);
  const [application,setApplication] = useState({});
  const [placementDrives, setPlacementDrives] = useState({
    upcoming: [],
    ongoing: [],
    completed: [],
  });

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

  const handleDate = (date) => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Format the date
    const day = date.getDay();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = (date.getHours() % 12) || 12; // Convert to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    // Construct the final string
    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${connString}/user/get-companies`)
        console.log(response.data);
        const currentDate = new Date();

        const upcoming = [];
        const ongoing = [];
        const completed = [];

        response.data.forEach(company => {
          const deadline = new Date(company.deadline);
          const visitDate = company.visit_date ? new Date(company.visit_date) : null;
          const completeDate = company.complete_date ? new Date(company.complete_date) : null;

          // Check for completed companies
          if (completeDate) {
            completed.push(company);
          }
          // Check for upcoming companies
          else if (deadline > currentDate || (deadline < currentDate && (!visitDate || visitDate >= currentDate))) {
            upcoming.push(company);
          }
          // Check for ongoing companies
          else if (visitDate && visitDate < currentDate && !completeDate) {
            ongoing.push(company);
          }
        });

        setPlacementDrives({
          upcoming,
          ongoing,
          completed,
        });

        setUserData(JSON.parse(await AsyncStorage.getItem('userData')));
      } catch (error) {
        console.error('Company data fetch failed:', error.response ? error.response.data : error.message);
      }
    }
    fetchData()
  }, [])

  const isEligible = (item) => {
    // Check eligibility based on company requirements and user details
    if (!userData) return true;
    const meetsCPI = userData.cpi >= item.req_CPI;

    const meetsBacklogs = (item.max_active_backlogs === null || userData.no_active_backlog <= item.max_active_backlogs) &&
      (item.max_dead_backlogs === null || userData.no_dead_backlog <= item.max_dead_backlogs);

    return meetsCPI && meetsBacklogs;
  };

  const renderItem = ({ item }) => {
    const eligibility = isEligible(item);
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        {selectedTab === 'upcoming' && (
          <>
            <Text style={styles.itemSubText}>Deadline: {handleDate(new Date(item.deadline))}</Text>
            <Text style={styles.itemSubText}>Minimum CPI: {item.req_CPI}</Text>
            <Text style={styles.itemSubText}>Max Active Backlogs: {item.max_active_backlogs || "NA"}</Text>
            <Text style={styles.itemSubText}>Max Dead Backlogs: {item.max_dead_backlogs || 'NA'}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleApply(item)} disabled={!eligibility} >
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
            {!eligibility && userData && <Text style={styles.error}>
              You are not eligible to apply for this position.
            </Text>}
          </>
        )}
        {selectedTab === 'completed' && (
          <>
            <Text style={styles.itemSubText}>Start Date: {item.complete_date}</Text>
            <Text style={styles.itemSubText}>No. Placed Students: {item.no_of_students_placed}</Text>
          </>
        )}
      </View>
    )
  };

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
        keyExtractor={item => item.company_id}
        style={styles.list}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Resource Center</Text>
      </TouchableOpacity>
      <ApplyModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        selectedDrive={selectedDrive} 
      />
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
