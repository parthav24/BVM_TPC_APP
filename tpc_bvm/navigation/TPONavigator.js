import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image } from 'react-native';
import TPOHomeScreen from '../screens/TPOScreens/TPOHomeScreen';
import TPOProfile from '../screens/TPOScreens/TPOProfile'; // Import TPO Profile screen

const Stack = createStackNavigator();

function TPONavigator({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="TPOHome">
      <Stack.Screen
        name="TPOHome"
        component={TPOHomeScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('TPOProfile')}>
              <Image source={require('../assets/profileIcon.png')} style={{ width: 25, height: 25, marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="TPOProfile" component={TPOProfile} />
    </Stack.Navigator>
  );
}

export default TPONavigator;
