import React, { useEffect, useState } from "react";
import connString from "../components/connectionString";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";

export default function GuestScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        console.log("Hii");
        const { data } = await axios.get(
          `${connString}/guest/get-placement-data`
        );
        console.log("sir ");
=======
        const { data } = await axios.get(`${connString}/guest/get-placement-data`);
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
        const dataWithSrNo = data.placement_data.map((student, idx) => ({
          ...student,
          srNo: idx + 1,
        }));

        setStudentData(dataWithSrNo);
        setLoading(false);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
<<<<<<< HEAD
    console.log("hello");
=======
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
  }, []);

  const handleOfferLetterClick = () => {
    setSelectedImage(require("../assets/tpc_logo.png"));
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.srNo}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.f_name + " " + item.l_name}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.dept_name}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.company_name}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.package + " LPA"}</Text>
      </View>
      {/* <TouchableOpacity onPress={handleOfferLetterClick} style={styles.cell}>
        <Text style={[styles.cellText, { color: 'blue' }]}>{item.offerLetter}</Text>
      </TouchableOpacity> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Placement Information</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Sr No.</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Student</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Branch</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Placed In</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Package</Text>
          </View>
          {/* <View style={styles.headerCell}>
            <Text style={styles.headerText}>Offer Letter</Text>
          </View> */}
        </View>
        <FlatList
          data={studentData}
          renderItem={renderItem}
          keyExtractor={(item) => item.srNo}
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={selectedImage} style={styles.modalImage} />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Statistics")}
      >
        <Text style={styles.buttonText}>Placement Statistics</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    justifyContent: "",
    alignItems: "",
    paddingVertical: 15,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  headerText: {
    fontWeight: "bold",
  },
  cellText: {
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 400,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#841584",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
