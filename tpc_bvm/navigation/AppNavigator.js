import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import GuestScreen from '../screens/GuestScreen';
import SignUpScreen from '../screens/SignUpScreen';
import StudentDashboard from '../screens/StudentDashboard';
import PlacementStatistics from '../screens/PlacementStatistics';
import AdminDashboard from '../screens/AdminDashboard';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Guest" component={GuestScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Dashboard" component={StudentDashboard} />
        <Stack.Screen name="Statistics" component={PlacementStatistics} />
        <Stack.Screen name="Admin" component={AdminDashboard} />
      </Stack.Navigator>
  );
}

export default AppNavigator;
