import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image } from 'react-native';
import TPOHomeScreen from '../screens/TPOScreens/TPOHomeScreen';
import TPOProfile from '../screens/TPOScreens/TPOProfile'; // Import TPO Profile screen
import EditStudentDetails from '../screens/TPCScreens/EditStudentDetails';
import StudentApplications from '../screens/TPOScreens/StudentApplications';
import OngoingDrivesScreen from '../screens/TPCScreens/OngoingDrivesScreen';
import CompanyStudentDetails from '../screens/TPCScreens/CompanyStudentDetails';
import AddCompanyDetails from '../screens/TPCScreens/AddCompanyDetails';
import AddPlacement from '../screens/TPCScreens/AddPlacementData';
import AddTPCScreen from '../screens/TPOScreens/AddTPCScreen';
import AddDepartment from '../screens/TPOScreens/AddDepartment';

const Stack = createStackNavigator();

function TPONavigator({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
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
      <Stack.Screen name="Student Applications" component={StudentApplications} />
      <Stack.Screen name="EditStudentDetails" component={EditStudentDetails} />
      <Stack.Screen name="OngoingDrivesScreen" component={OngoingDrivesScreen} />
      <Stack.Screen name="Company Student Details" component={CompanyStudentDetails} />
      <Stack.Screen name="Add Company Details" component={AddCompanyDetails} />
      <Stack.Screen name="Add Placement Data" component={AddPlacement} />
      <Stack.Screen name="Register TPC" component={AddTPCScreen} />
      <Stack.Screen name="Add Department" component={AddDepartment} />

    </Stack.Navigator>
  );
}

export default TPONavigator;
