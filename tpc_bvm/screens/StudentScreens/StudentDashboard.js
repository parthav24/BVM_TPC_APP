import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import connString from '../../components/connectionString';
import ApplyModal from '../../components/ApplyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function StudentDashboard() {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [userData, setUserData] = useState(null);
  const [placementDrives, setPlacementDrives] = useState({
    upcoming: [],
    ongoing: [],
    completed: [],
  });

  const handleApply = (drive) => {
    setSelectedDrive(drive);
    setModalVisible(true);
  };

  const handleDate = (date) => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = (date.getHours() % 12) || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${connString}/user/get-companies`);
        const currentDate = new Date();

        const upcoming = [];
        const ongoing = [];
        const completed = [];

        response.data.forEach(company => {
          const deadline = new Date(company.deadline);
          const visitDate = company.visit_date ? new Date(company.visit_date) : null;
          const completeDate = company.complete_date ? new Date(company.complete_date) : null;

          if (completeDate) {
            completed.push(company);
          } else if (deadline > currentDate || (deadline < currentDate && (!visitDate || visitDate >= currentDate))) {
            upcoming.push(company);
          } else if (visitDate && visitDate < currentDate && !completeDate) {
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
    };
    fetchData();
  }, []);

  const isEligible = (item) => {
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
            <Text style={styles.itemSubText}>
              <Ionicons name="calendar-outline" size={16} color="#007bff" />
              {" "}Deadline: {handleDate(new Date(item.deadline))}
            </Text>
            <Text style={styles.itemSubText}>
              <Ionicons name="star-outline" size={16} color="#007bff" />
              {" "}Minimum CPI: {item.req_CPI}
            </Text>
            <Text style={styles.itemSubText}>
              <Ionicons name="checkmark-circle-outline" size={16} color="#007bff" />
              {" "}Max Active Backlogs: {item.max_active_backlogs || "NA"}
            </Text>
            <Text style={styles.itemSubText}>
              <Ionicons name="checkmark-circle-outline" size={16} color="#007bff" />
              {" "}Max Dead Backlogs: {item.max_dead_backlogs || 'NA'}
            </Text>
            <TouchableOpacity style={[styles.button, !eligibility && styles.disabledButton]} onPress={() => handleApply(item)} disabled={!eligibility}>
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
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Dashboard</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab('ongoing')}>
          <Text style={[styles.tabButtonText, selectedTab === 'ongoing' && styles.activeTab]}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab('upcoming')}>
          <Text style={[styles.tabButtonText, selectedTab === 'upcoming' && styles.activeTab]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab('completed')}>
          <Text style={[styles.tabButtonText, selectedTab === 'completed' && styles.activeTab]}>Completed</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={placementDrives[selectedTab]}
        renderItem={renderItem}
        keyExtractor={item => item.company_id.toString()}
        style={styles.list}
      />

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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeTab: {
    backgroundColor: '#702963',
    borderRadius: 7,
    padding:5
  },
  list: {
    marginBottom: 20,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSubText: {
    fontSize: 14,
    marginVertical: 3,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
