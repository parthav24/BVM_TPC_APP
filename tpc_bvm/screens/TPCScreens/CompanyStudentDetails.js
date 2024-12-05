import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import CheckBox from "react-native-check-box";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import connString from "../../components/connectionString";

const StudentSelection = () => {
  const route = useRoute();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [unSelectedStudents, setUnSelectedStudents] = useState([]);
  const { company } = route.params;
  const [studentData, setStudentData] = useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get(`${connString}/tpc/get-last-round-candidates`,
        {
          params: {
            company_id: company.company_id,
          }
        }
      );
      console.log(response.data);
      setStudentData(response.data);
      const studentIds = response.data.map((item) => item.uid);
      setUnSelectedStudents(studentIds);
      setSelectedStudents([]);
    }
    catch (error) {
      console.error(
        "Student selection fetch failed:",
        error.response ? error.response.data : error.message
      );
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  const handleCheckBoxChange = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setUnSelectedStudents([...unSelectedStudents, studentId]);
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
      setUnSelectedStudents(unSelectedStudents.filter((id) => id !== studentId));
    }
  };

  const clearSelection = () => {
    setSelectedStudents([]);
  };

  const confirmEndDrive = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to end the drive?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const moveToNextRound = studentData
                .filter((student) => selectedStudents.includes(student.uid))
                .map((student) => student.application_id);

              const rejectForCurrentRound = studentData
                .filter((student) => unSelectedStudents.includes(student.uid))
                .map((student) => student.application_id);
              if (moveToNextRound.length > 0) {
                const response = await axios.put(`${connString}/tpc/complete-drive`,
                  {
                    moveToNextRound,
                    rejectForCurrentRound
                  });
                fetchData();
                console.log("Drive ended successfully:", response.data);
                // Handle success (e.g., navigate, update state, etc.)
              }
              else {
                Alert.alert("Error", "Select atleast 1 student");
              }

            } catch (error) {
              console.error("Error ending the drive:", error);
              // Handle error (e.g., show an error message)
            }
          }
        },
      ],
      { cancelable: true }
    );

  };

  const handleNextRound = async () => {
    const moveToNextRound = studentData
      .filter((student) => selectedStudents.includes(student.uid))
      .map((student) => student.application_id);

    const rejectForCurrentRound = studentData
      .filter((student) => unSelectedStudents.includes(student.uid))
      .map((student) => student.application_id);


    try {
      if (moveToNextRound.length > 0) {
        Alert.alert(
          "Next Round",
          `Selected Students: ${selectedStudents.join(
            ", "
          )}\nUnselected Students: ${unSelectedStudents.join(", ")}`
        );

        const response = await axios.put(`${connString}/tpc/move-next-round`,
          {
            moveToNextRound,
            rejectForCurrentRound
          }
        );
        fetchData();
      }
      else {
        Alert.alert("Error", "Select atleast 1 student");
      }
    }
    catch (error) {
      console.error(
        "Student selection fetch failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{index + 1}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.uid}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.f_name} {item.l_name}</Text>
      </View>
      <View style={styles.cell}>
        <CheckBox
          isChecked={selectedStudents.includes(item.uid)}
          onClick={() => handleCheckBoxChange(item.uid)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Selection</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Sr No.</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Student Id</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Student Name</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Action</Text>
          </View>
        </View>
        <FlatList
          data={studentData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextRound}>
          <Text style={styles.buttonText}>Next Round</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.endButton} onPress={confirmEndDrive}>
          <Text style={styles.buttonText}>End Drive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const StudentProgress = () => {
  const [studentData, setStudentData] = useState([])
  const route = useRoute();
  const { company } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${connString}/tpc/get-all-round-candidates`,
          {
            params: {
              company_id: company.company_id,
            }
          }
        );
        console.log(response.data);
        setStudentData(response.data);

      }
      catch (error) {
        console.error(
          "Student selection fetch failed:",
          error.response ? error.response.data : error.message
        );
      }
    }
    fetchData();
  }, [])


  const renderProgressItem = ({ item, index }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{index + 1}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.uid}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.f_name} {item.l_name}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.round_reached}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Progress</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Sr No.</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Student ID</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Student Name</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Round</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Status</Text>
          </View>
        </View>
        <FlatList
          data={studentData}
          renderItem={renderProgressItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

const App = () => {
  const route = useRoute();
  const { flag, company } = route.params;
  const [activeTab, setActiveTab] = useState('Student Progress');

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {flag == 1 && <TouchableOpacity
          style={
            activeTab === "Student Selection" ? styles.activeTab : styles.tab
          }
          onPress={() => setActiveTab("Student Selection")}
        >
          <Text style={styles.tabText}>Student Selection</Text>
        </TouchableOpacity>}
        <TouchableOpacity
          style={
            activeTab === "Student Progress" ? styles.activeTab : styles.tab
          }
          onPress={() => setActiveTab("Student Progress")}
        >
          <Text style={styles.tabText}>Student Progress</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.company_name}>{company.name}</Text>
      </TouchableOpacity>
      {flag === 1 && activeTab === "Student Selection" && <StudentSelection />}
      {activeTab === "Student Progress" && <StudentProgress />}
    </View>
  );
};

const styles = StyleSheet.create({
  company_name: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontSize: 24,
    backgroundColor: "#841584",
    padding: 10,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cellText: {
    textAlign: "center",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: "#bf0a30",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  endButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  nextButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#847184",
    borderRadius: 5,
  },
  activeTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#841584",
    borderRadius: 5,
  },
  tabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
