import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function PlacementStatistics() {
  const data = {
    labels: ['CP', 'IT', 'EE', 'ME'],
    datasets: [
      {
        data: [30, 40, 15, 25],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    barPercentage: 0.5,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Placement Statistics</Text>

      <Text style={styles.chartTitle}>Branch-wise Placement</Text>
      <BarChart
        data={data}
        width={300}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>Overall Statistics</Text>
      <View style={styles.statContainer}>
        <Text style={styles.statText}>Total Students Placed: 110</Text>
        <Text style={styles.statText}>Highest Package: 25 LPA</Text>
        <Text style={styles.statText}>Average Package: 15 LPA</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    textAlign: 'center',
  },
  chart: {
    marginVertical: 10,
  },
  statContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  statText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
