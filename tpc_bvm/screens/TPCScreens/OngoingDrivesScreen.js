import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OngoingDrivesScreen = () => {
  const navigation = useNavigation();

  const ongoingDrives = [
    { id: '1', companyName: 'Company A', students: [/* list of students */] },
    { id: '2', companyName: 'Company B', students: [/* list of students */] },
    // Add more companies here
  ];

  const handleCompanySelect = (company) => {
    navigation.navigate('Company Student Details', { company });
  };

  const renderOngoingDrives = ({ item }) => (
    <TouchableOpacity onPress={() => handleCompanySelect(item)} style={styles.companyContainer}>
      <Text style={styles.companyText}>{item.companyName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ongoing Drives</Text>
      <FlatList
        data={ongoingDrives}
        renderItem={renderOngoingDrives}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.drivesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  companyContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  companyText: {
    fontSize: 18,
  },
  drivesList: {
    paddingBottom: 30,
  },
});

export default OngoingDrivesScreen;
