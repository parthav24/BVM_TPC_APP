// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import CheckBox from "react-native-check-box";

// const StudentTable = () => {
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const studentData = [
//     { srNo: "1", name: "John Doe" },
//     { srNo: "2", name: "Jane Smith" },
//     { srNo: "3", name: "Sam Wilson" },
//   ];

//   const handleCheckBoxChange = (studentId) => {
//     if (selectedStudents.includes(studentId)) {
//       setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
//     } else {
//       setSelectedStudents([...selectedStudents, studentId]);
//     }
//   };

//   const clearSelection = () => {
//     setSelectedStudents([]);
//   };

//   const confirmEndDrive = () => {
//     Alert.alert(
//       "Confirm",
//       "Are you sure you want to end the drive?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Yes", onPress: () => console.log("Drive Ended") },
//       ],
//       { cancelable: true }
//     );
//   };

//   const handleNextRound = () => {
//     const unselectedStudents = studentData
//       .filter((student) => !selectedStudents.includes(student.srNo))
//       .map((student) => student.srNo);

//     console.log("Selected Students:", selectedStudents);
//     console.log("Unselected Students:", unselectedStudents);

//     Alert.alert(
//       "Next Round",
//       `Selected Students: ${selectedStudents.join(", ")}\nUnselected Students: ${unselectedStudents.join(", ")}`
//     );
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.row}>
//       <View style={styles.cell}>
//         <Text style={styles.cellText}>{item.srNo}</Text>
//       </View>
//       <View style={styles.cell}>
//         <Text style={styles.cellText}>{item.name}</Text>
//       </View>
//       <View style={styles.cell}>
//         <CheckBox
//           isChecked={selectedStudents.includes(item.srNo)}
//           onClick={() => handleCheckBoxChange(item.srNo)}
//         />
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Student Selection</Text>
//       <View style={styles.table}>
//         <View style={styles.row}>
//           <View style={styles.headerCell}>
//             <Text style={styles.headerText}>Sr No.</Text>
//           </View>
//           <View style={styles.headerCell}>
//             <Text style={styles.headerText}>Student Name</Text>
//           </View>
//           <View style={styles.headerCell}>
//             <Text style={styles.headerText}>Action</Text>
//           </View>
//         </View>
//         <FlatList
//           data={studentData}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.srNo}
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleNextRound}>
//           <Text style={styles.buttonText}>Next Round</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={clearSelection}>
//           <Text style={styles.buttonText}>Clear</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={confirmEndDrive}>
//           <Text style={styles.buttonText}>End Drive</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 10,
//   },
//   title: {
//     fontSize: 24,
//     backgroundColor: "#841584",
//     padding: 10,
//     color: "#ffffff",
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   table: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   row: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//   },
//   headerCell: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 10,
//     backgroundColor: "#f0f0f0",
//     borderRightWidth: 1,
//     borderColor: "#ccc",
//   },
//   cell: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 15,
//     borderRightWidth: 1,
//     borderColor: "#ccc",
//   },
//   headerText: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   cellText: {
//     textAlign: "center",
//     fontSize: 14,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default StudentTable;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import CheckBox from "react-native-check-box";

const StudentSelection = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);

  const studentData = [
    { srNo: "1", name: "John Doe" },
    { srNo: "2", name: "Jane Smith" },
    { srNo: "3", name: "Sam Wilson" },
  ];

  const handleCheckBoxChange = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
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
        { text: "Yes", onPress: () => console.log("Drive Ended") },
      ],
      { cancelable: true }
    );
  };

  const handleNextRound = () => {
    const unselectedStudents = studentData
      .filter((student) => !selectedStudents.includes(student.srNo))
      .map((student) => student.srNo);

    console.log("Selected Students:", selectedStudents);
    console.log("Unselected Students:", unselectedStudents);

    Alert.alert(
      "Next Round",
      `Selected Students: ${selectedStudents.join(
        ", "
      )}\nUnselected Students: ${unselectedStudents.join(", ")}`
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.srNo}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.name}</Text>
      </View>
      <View style={styles.cell}>
        <CheckBox
          isChecked={selectedStudents.includes(item.srNo)}
          onClick={() => handleCheckBoxChange(item.srNo)}
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
            <Text style={styles.headerText}>Student Name</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Action</Text>
          </View>
        </View>
        <FlatList
          data={studentData}
          renderItem={renderItem}
          keyExtractor={(item) => item.srNo}
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
  const studentData = [
    { srNo: "1", name: "John Doe", round: "First Round" },
    { srNo: "2", name: "Jane Smith", round: "Second Round" },
    { srNo: "3", name: "Sam Wilson", round: "Final Round" },
  ];

  const renderProgressItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.srNo}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.name}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.round}</Text>
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
            <Text style={styles.headerText}>Student Name</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Round</Text>
          </View>
        </View>
        <FlatList
          data={studentData}
          renderItem={renderProgressItem}
          keyExtractor={(item) => item.srNo}
        />
      </View>
    </View>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState("Student Selection");

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={
            activeTab === "Student Selection" ? styles.activeTab : styles.tab
          }
          onPress={() => setActiveTab("Student Selection")}
        >
          <Text style={styles.tabText}>Student Selection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeTab === "Student Progress" ? styles.activeTab : styles.tab
          }
          onPress={() => setActiveTab("Student Progress")}
        >
          <Text style={styles.tabText}>Student Progress</Text>
        </TouchableOpacity>
      </View>

      {activeTab === "Student Selection" && <StudentSelection />}
      {activeTab === "Student Progress" && <StudentProgress />}
    </View>
  );
};

const styles = StyleSheet.create({
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
