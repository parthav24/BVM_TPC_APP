import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image } from 'react-native';
import TPCDashboard from '../screens/TPCScreens/TPCDashboard';
import TPCHomeScreen from '../screens/TPCScreens/TPCHomeScreen';
import TPCProfile from '../screens/TPCScreens/TPCProfile'; // Import TPC Profile screen

const Stack = createStackNavigator();

function TPCNavigator({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="TPCHome">
      <Stack.Screen
        name="TPCHome"
        component={TPCHomeScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('TPCProfile')}>
              <Image source={require('../assets/profileIcon.png')} style={{ width: 25, height: 25, marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="TPCProfile" component={TPCProfile} />
      <Stack.Screen name="Dashboard" component={TPCDashboard} />
    </Stack.Navigator>
  );
}

export default TPCNavigator;
