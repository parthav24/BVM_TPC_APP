import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TPOHomeScreen from '../screens/TPOScreens/TPOHomeScreen'; 

const Stack = createStackNavigator();

function TPONavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="TPOHome" component={TPOHomeScreen} options={{ title: 'TPO Home' }} />
      {/* You can add more screens related to TPO functionalities here */}
    </Stack.Navigator>
  );
}

export default TPONavigator;
