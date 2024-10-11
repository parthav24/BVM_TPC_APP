import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image } from 'react-native';
import TPCDashboard from '../screens/TPCScreens/TPCDashboard';
import TPCHomeScreen from '../screens/TPCScreens/TPCHomeScreen';
import TPCProfile from '../screens/TPCScreens/TPCProfile';
import EditStudentDetails from '../screens/TPCScreens/EditStudentDetails';
<<<<<<< HEAD
import StudentApplications from '../screens/TPCScreens/StudentApplications';
import OngoingDrivesScreen from '../screens/TPCScreens/OngoingDrivesScreen';
import CompanyStudentDetails from '../screens/TPCScreens/CompanyStudentDetails';
import AddCompanyDetails from '../screens/TPCScreens/AddCompanyDetails';
=======
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d

const Stack = createStackNavigator();

function TPCNavigator({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
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
<<<<<<< HEAD
      <Stack.Screen name="Student Applications" component={StudentApplications} />
      <Stack.Screen name="EditStudentDetails" component={EditStudentDetails} />
      <Stack.Screen name="OngoingDrivesScreen" component={OngoingDrivesScreen} />
      <Stack.Screen name="Company Student Details" component={CompanyStudentDetails} />
      <Stack.Screen name="Add Company Details" component={AddCompanyDetails} />
=======
      <Stack.Screen name="EditStudentDetails" component={EditStudentDetails} />
>>>>>>> 5177704c6700545acbb2e14170e3ed05b16f388d
    </Stack.Navigator>
  );
}

export default TPCNavigator;
