import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StudentDashboard from '../screens/StudentScreens/StudentDashboard';

const Stack = createStackNavigator();

function StudentNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Dashboard" component={StudentDashboard} />
        </Stack.Navigator>
    );
}

export default StudentNavigator;
