import { CommonActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import connString from '../../components/connectionString';

export default function TPCProfile({ navigation }) {
  // Mock data, replace with real data
  const [tpcDetails, setTpcDetails] = useState(null);
  const [tpoDetails, setTpoDetails] = useState(null);
  const [tpcMembers, setTpcMembers] = useState(null);
  useEffect(() => {
    console.log(tpcDetails);
  }, [tpcMembers]);
  useEffect(() => {
    const fetchTpcData = async () => {
      try {
        const response = await axios.get(`${connString}/tpc/get-profile`);
        setTpcDetails(response.data.tpcData);
      } catch (err) {
        console.log("Error while fetching tpc profile", err.message);
      }
    }
    const fetchTpoData = async () => {
      try {
        const response = await axios.get(`${connString}/tpc/get-tpo-name`);
        setTpoDetails(response.data.tpoData);
      } catch (err) {
        console.log("Error while fetching tpo profile", err.message);
      }
    }
    const fetchTpcMembersData = async () => {
      try {
        console.log("Hello");
        const response = await axios.get(`${connString}/tpc/get-tpc-members`);
        console.log("Hello");
        console.log(response.data.tpcMembersData);

        setTpcMembers(response.data.tpcMembersData);
      } catch (err) {
        console.log("Error while fetching tpc members", err.message);
      }
    }
    fetchTpcData();
    fetchTpoData();
    fetchTpcMembersData();
  }, [])


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
        <Text style={styles.title}>TPC Profile</Text>
        <Text style={styles.label}>
          <Ionicons name="person-outline" size={18} color="#007bff" /> Name:{" "}
          <Text style={styles.value}>{tpcDetails?.f_name} {tpcDetails?.l_name}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="book-outline" size={18} color="#007bff" /> Branch:{" "}
          <Text style={styles.value}>{tpcDetails?.dept_name}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="call-outline" size={18} color="#007bff" /> Mobile:{" "}
          <Text style={styles.value}>{tpcDetails?.mobile}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="mail-outline" size={18} color="#007bff" /> Email:{" "}
          <Text style={styles.value}>{tpcDetails?.email}</Text>
        </Text>
        <Text style={styles.label}>
          <Ionicons name="people-outline" size={18} color="#007bff" /> Current
          TPO: <Text style={styles.value}>{tpoDetails?.f_name} {tpoDetails?.l_name}</Text>
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>Members:</Text>
        {tpcMembers?.map((member, index) => (
          <View key={index} style={styles.memberContainer}>
            <Text style={styles.memberName}>Name: {member.f_name} {member.l_name}</Text>
            <Text>Branch: {tpcDetails?.dept_name}</Text>
            <Text>Email: {member.email}</Text>
            <Text>Phone: {member.mobile}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  memberContainer: {
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberName: {
    fontWeight: "bold",
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
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
