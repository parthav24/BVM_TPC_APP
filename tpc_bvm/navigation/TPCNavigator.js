import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TPCDashboard from '../screens/TPCScreens/TPCDashboard';

const Stack = createStackNavigator();

function TPCNavigator() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Admin" component={TPCDashboard} />
      </Stack.Navigator>
  );
}

export default TPCNavigator;
