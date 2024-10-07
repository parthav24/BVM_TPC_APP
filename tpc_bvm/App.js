import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { UserContextProvider } from './Contexts/UserContext';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NavigationContainer>
      <UserContextProvider>
        <AppNavigator />
        <Toast ref={Toast.setRef} />
      </UserContextProvider>
    </NavigationContainer>
  );
}
