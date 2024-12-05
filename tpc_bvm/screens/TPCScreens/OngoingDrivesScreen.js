import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import connString from "../../components/connectionString";

const OngoingDrivesScreen = () => {
  const navigation = useNavigation();
  const [placementDrives, setPlacementDrives] = useState({
    upcoming: [],
    ongoing: [],
    completed: [],
  });
  useEffect(()=>{
    // console.log(placementDrives.ongoing);
    // console.log(placementDrives.completed);
    
  },[placementDrives])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${connString}/user/get-companies`);
        const currentDate = new Date();

        const upcoming = [];
        const ongoing = [];
        const completed = [];

        response.data.forEach((company) => {
          const deadline = new Date(company.deadline);
          const visitDate = company.visit_date
            ? new Date(company.visit_date)
            : null;
          const completeDate = company.complete_date
            ? new Date(company.complete_date)
            : null;

          if (completeDate) {
            completed.push(company);
          } else if (
            deadline > currentDate ||
            (deadline < currentDate && (!visitDate || visitDate >= currentDate))
          ) {
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
      } catch (error) {
        console.error(
          "Company data fetch failed:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchData();
  }, []);

  const handleCompanySelect = (company) => {
    let flag = 0;
    for(i=0;i<placementDrives.ongoing.length;i++){
      if(placementDrives.ongoing[i].name===company.name) flag=1;
    }
    
    navigation.navigate("Company Student Details", { company,flag});
  };

  const renderOngoingDrives = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCompanySelect(item)}
      style={styles.companyContainer}
    >
      <Text style={styles.companyText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Ongoing Drives</Text>
        <FlatList
          data={placementDrives?.ongoing}
          renderItem={renderOngoingDrives}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.drivesList}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Completed Drives</Text>
        <FlatList
          data={placementDrives?.completed}
          renderItem={renderOngoingDrives}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.drivesList}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  companyContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: "#000",
    borderWidth: 1,
  },
  companyText: {
    color:'#000',
    fontSize: 18,
  },
  drivesList: {
    paddingBottom: 30,
  },
});

export default OngoingDrivesScreen;
