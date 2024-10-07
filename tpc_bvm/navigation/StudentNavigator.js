import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image } from 'react-native';
import StudentDashboard from '../screens/StudentScreens/StudentDashboard';
import StudentProfile from '../screens/StudentScreens/StudentProfile'; // Import Student Profile screen


const Stack = createStackNavigator();

function StudentNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen
                name="Dashboard"
                component={StudentDashboard}
                options={{
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('StudentProfile')}>
                            <Image source={require('../assets/profileIcon.png')} style={{ width: 25, height: 25, marginRight: 15 }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen name="StudentProfile" component={StudentProfile} />
        </Stack.Navigator>
    );
}

export default StudentNavigator;
