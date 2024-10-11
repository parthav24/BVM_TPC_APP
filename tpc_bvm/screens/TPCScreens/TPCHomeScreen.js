import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

<<<<<<< HEAD
<<<<<<< Updated upstream
export default function TPCHomeScreen({navigation}) {
=======
export default function TPCHomeScreen({ navigation }) {
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
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
<<<<<<< HEAD
  }, [])
=======
const TPCHomeScreen = () => {
  const navigation = useNavigation();
>>>>>>> Stashed changes
=======
  }, [modalVisible])
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d

  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.optionsContainer}>
        {/* Student Applications */}
        <TouchableOpacity style={styles.option} onPress={() => handleNavigate('Student Applications')}>
          <Ionicons name="document-text-outline" size={40} color="#4A90E2" />
          <Text style={styles.optionText}>Student Applications</Text>
        </TouchableOpacity>

        {/* Add Company */}
        <TouchableOpacity style={styles.option} onPress={() => handleNavigate('Add Company Details')}>
          <Ionicons name="business-outline" size={40} color="#4A90E2" />
          <Text style={styles.optionText}>Add Company</Text>
        </TouchableOpacity>

        {/* Ongoing Drives */}
        <TouchableOpacity style={styles.option} onPress={() => handleNavigate('OngoingDrivesScreen')}>
          <Ionicons name="play-outline" size={40} color="#4A90E2" />
          <Text style={styles.optionText}>Ongoing Drives</Text>
        </TouchableOpacity>
      </View>
<<<<<<< Updated upstream
      {selectedTab == 'approved' && <FlatList
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
      />}
      {selectedTab == 'pending' && <FlatList
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
      />}
      <DisplayStudent
        student={selectedUser}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedTab={selectedTab}
        navigation={navigation}
      />
    </View>
=======
    </ScrollView>
>>>>>>> Stashed changes
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  option: {
    alignItems: 'center',
    width: '30%',
  },
  optionText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

export default TPCHomeScreen;
