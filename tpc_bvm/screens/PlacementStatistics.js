import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

const departmentData = {
  CSE: {
    placed: 35,
    unplaced: 20,
    highestPackage: 9,
    lowestPackage: 4,
    averagePackage: 5,
    companiesVisited: ['SocialPilot', 'PortPro', 'Odoo'],
    studentsPlaced: {
      SocialPilot: ['Rahul'],
      PortPro: ['Dhruv'],
      Odoo: ['Parthav', 'Mustufa'],
    },
  },
  ECE: {
    placed: 6,
    unplaced: 30,
    highestPackage: 6,
    lowestPackage: 3,
    averagePackage: 4,
    companiesVisited: ['Scaledge', 'Einfochips'],
    studentsPlaced: {
      Scaledge: ['Om'],
      Einfochips: ['Priyansh'],
    },
  },
  ME: {
    placed: 20,
    unplaced: 30,
    highestPackage: 8,
    lowestPackage: 5,
    averagePackage: 6,
    companiesVisited: ['MG', 'Adani', 'Linde'],
    studentsPlaced: {
      MG: ['Ruturaj'],
      Adani: ['Mihir'],
      Linde: ['Karan'],
    },
  },
  IT: {
    placed: 35,
    unplaced: 15,
    highestPackage: 7,
    lowestPackage: 4,
    averagePackage: 5,
    companiesVisited: ['Roima', 'Twitter', 'LinkedIn'],
    studentsPlaced: {
      Roima: ['Darshan', 'Brijesh'],
      Motadata: ['Shaunak', 'Maitri'],
      Azilen: ['Shyama'],
    },
  },
};

// Calculate overall placement statistics
const calculateOverallStatistics = (data) => {
  let totalPlaced = 0;
  let totalUnplaced = 0;
  let totalHighestPackage = 0;
  let totalLowestPackage = Infinity;
  let totalAveragePackage = 0;
  let totalCompaniesVisited = 0;

  Object.values(data).forEach(department => {
    totalPlaced += department.placed;
    totalUnplaced += department.unplaced;
    totalHighestPackage = Math.max(totalHighestPackage, department.highestPackage);
    totalLowestPackage = Math.min(totalLowestPackage, department.lowestPackage);
    totalAveragePackage += department.averagePackage;
    totalCompaniesVisited += department.companiesVisited.length;
  });

  totalAveragePackage /= Object.keys(data).length;

  return {
    totalPlaced,
    totalUnplaced,
    totalHighestPackage,
    totalLowestPackage,
    totalAveragePackage,
    totalCompaniesVisited,
  };
};

const overallStatistics = calculateOverallStatistics(departmentData);

export default function PlacementStatistics() {
  const [selectedDepartment, setSelectedDepartment] = useState('CSE');
  const [showDetails, setShowDetails] = useState(false);

  const data = {
    labels: ['Placed', 'Unplaced'],
    datasets: [
      {
        data: [overallStatistics.totalPlaced, overallStatistics.totalUnplaced],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    barPercentage: 0.5,
  };

  const currentDepartmentData = departmentData[selectedDepartment];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Placement Statistics</Text>

      <Text style={styles.chartTitle}>Overall Placements</Text>
      <PieChart
        data={data.datasets[0].data.map((value, index) => ({
          name: data.labels[index],
          population: value,
          color: index === 0 ? 'green' : 'orange',
          legendFontColor: '#000',
          legendFontSize: 15,
        }))}
        width={350}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
      <View style={styles.overallStatsContainer}>
        <Text style={styles.overallStatText}>Total Students: {overallStatistics.totalPlaced + overallStatistics.totalUnplaced}</Text>
        <Text style={styles.overallStatText}>Placed: {overallStatistics.totalPlaced}</Text>
        <Text style={styles.overallStatText}>Unplaced: {overallStatistics.totalUnplaced}</Text>
        <Text style={styles.overallStatText}>Highest Package: {overallStatistics.totalHighestPackage} LPA</Text>
        <Text style={styles.overallStatText}>Lowest Package: {overallStatistics.totalLowestPackage} LPA</Text>
        <Text style={styles.overallStatText}>Average Package: {overallStatistics.totalAveragePackage.toFixed(2)} LPA</Text>
        <Text style={styles.overallStatText}>Companies Visited: {overallStatistics.totalCompaniesVisited}</Text>
      </View>

      <Text style={styles.chartTitle}>Select Department:</Text>
      <Picker
        selectedValue={selectedDepartment}
        onValueChange={(itemValue) => {
          setSelectedDepartment(itemValue);
          setShowDetails(false);
        }}
        style={styles.picker}
      >
        {Object.keys(departmentData).map((department) => (
          <Picker.Item label={department} value={department} key={department} />
        ))}
      </Picker>

      <Button title="Show Details" onPress={() => setShowDetails(!showDetails)} />

      {showDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Total Students: {currentDepartmentData.placed + currentDepartmentData.unplaced}</Text>
          <Text style={styles.detailText}>Placed Students: {currentDepartmentData.placed}</Text>
          <Text style={styles.detailText}>Unplaced Students: {currentDepartmentData.unplaced}</Text>
          <Text style={styles.detailText}>Highest Package: {currentDepartmentData.highestPackage} LPA</Text>
          <Text style={styles.detailText}>Lowest Package: {currentDepartmentData.lowestPackage} LPA</Text>
          <Text style={styles.detailText}>Average Package: {currentDepartmentData.averagePackage} LPA</Text>
          <Text style={styles.detailText}>Companies Visited: {currentDepartmentData.companiesVisited.length}</Text>
          
          <Text style={styles.detailText}>Company Names:</Text>
          {currentDepartmentData.companiesVisited.map((company) => (
            <View key={company} style={styles.companyContainer}>
              <Text style={styles.companyText}>{company}</Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => alert(`Students placed in ${company}: ${currentDepartmentData.studentsPlaced[company].join(', ')}`)}
              >
                <Text style={styles.viewButtonText}>View Students</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  overallStatsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  overallStatText: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  companyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  companyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: '#6200EE',
    borderRadius: 5,
    padding: 5,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
