import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TPCDashboard from '../screens/TPCScreens/TPCDashboard';
import TPCHomeScreen from '../screens/TPCScreens/TPCHomeScreen';

const Stack = createStackNavigator();

function TPCNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="TPCHome" component={TPCHomeScreen} />
      <Stack.Screen name="Dashboard" component={TPCDashboard}/>
    </Stack.Navigator>
  );
}

export default TPCNavigator;
