import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import GuestScreen from '../screens/GuestScreen';
import SignUpScreen from '../screens/SignupScreen';
import StudentNavigator from './StudentNavigator';
import TPCNavigator from './TPCNavigator';
import TPONavigator from './TPONavigator';
import PlacementStatistics from '../screens/PlacementStatistics';

const Stack = createStackNavigator();

function AppNavigator() {
  const userRole = "student" ;
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Guest" component={GuestScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Statistics" component={PlacementStatistics} />
      <Stack.Screen name="Student" component={StudentNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="TPC" component={TPCNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="TPO" component={TPONavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;