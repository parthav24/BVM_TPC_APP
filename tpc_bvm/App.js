import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { UserContextProvider } from './Contexts/UserContext';

export default function App() {
  return (
    <NavigationContainer>
      <UserContextProvider>
        <AppNavigator />
      </UserContextProvider>
    </NavigationContainer>
  );
}
