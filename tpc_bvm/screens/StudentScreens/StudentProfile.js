import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import connString from "../../components/connectionString";

export default function StudentProfile({ navigation }) {
  const [studentDetails, setStudentDetails] = useState({});

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${connString}/user/get-profile`);
        console.log(response.data.studentData);
        setStudentDetails(response.data.studentData);
      } catch (err) {

      }
    }
    fetchStudentData();
  }, [])

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleToggle = async () => {
    setExpanded(!expanded);

    if (!expanded) {
      // Make API call only when expanding the section
      setLoading(true);
      try {
        const response = await axios.get(`${connString}/user/get-all-application`); // Replace with your API endpoint
        setData(response.data.allApplications);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.label}>
          <Ionicons name="person-outline" size={18} color="#007bff" /> Name:{" "}
          <Text style={styles.value}>{studentDetails.f_name} {studentDetails.l_name}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="book-outline" size={18} color="#007bff" /> Branch:{" "}
          <Text style={styles.value}>{studentDetails.dept_name}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="id-card-outline" size={18} color="#007bff" /> Roll
          Number: <Text style={styles.value}>{studentDetails.uid}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="mail-outline" size={18} color="#007bff" /> Email:{" "}
          <Text style={styles.value}>{studentDetails.email}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="call-outline" size={18} color="#007bff" /> Phone:{" "}
          <Text style={styles.value}>{studentDetails.mobile}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="calendar-outline" size={18} color="#007bff" /> Birth Date:{" "}
          <Text style={styles.value}>{studentDetails.dob}</Text>
        </Text>
        {/* <Text style={styles.label}>
          <Ionicons name="checkmark-circle-outline" size={18} color="#007bff" />{" "}
          Placed Company:{" "}
          <Text style={styles.value}>{data?.find((application)=>application.status=='accepted')}</Text>
        </Text> */}
      </View>
      <View style={styles.card}>
        <TouchableOpacity onPress={handleToggle} style={styles.appliedCompaniesHeader}>
          <Text style={styles.headerText}>Appied Companies</Text>
          <Ionicons style={styles.headerTxt} name="chevron-down" size={25} color='#007bff' />
        </TouchableOpacity>

        {expanded && (
          <View style={styles.content}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View>
                {data ? (
                  data.map((item, index) => (
                    <View key={index} style={styles.item}>
                      <Text style={styles.itemText}>Name: {item.name}</Text>
                      <Text style={styles.itemText}>Round Reached: {item.round_reached}</Text>
                      <Text style={styles.itemText}>Applied On: {handleDate(new Date(item.createdAt))}</Text>

                      {/* Conditionally display the status */}
                      {item.status === 'accepted' && (
                        <View style={styles.statusMainContainer}>
                          <Text style={styles.itemText}>Status : </Text>
                          <View style={styles.statusContainer}>
                            <Text style={styles.statusText}>Accepted</Text>
                          </View>
                        </View>
                      )}
                    </View>
                  ))
                ) : (
                  <Text style={styles.noDataText}>No data available</Text>
                )}
              </View>
            )}
          </View>
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.subTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {studentDetails.skills?.map((skill, index) => (
            <Text key={index} style={styles.skill}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>Internships</Text>
        {studentDetails.internships?.map((internship, index) => (
          <Text key={index} style={styles.internship}>
            {internship.company} - {internship.duration}
          </Text>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Statistics")}
        >
          <Text style={styles.buttonText}>Placement Statistics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Update requested!")}
        >
          <Text style={styles.buttonText}>Request Update</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Resource Center</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  appliedCompaniesHeader:{
    flexDirection:'row',
    alignItems:'center', 
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
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  skill: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 14,
  },
  internship: {
    fontSize: 16,
    color: "#444",
    marginVertical: 2,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
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
    width: "100%"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 18,
    color: '#007bff',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  item: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  statusMainContainer: {
    flexDirection: 'row'
  },
  statusContainer: {
    marginTop: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#27ae60',
    borderRadius: 5,
  },
  statusText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 10,
  },
});
