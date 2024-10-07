import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import NotificationButton from "./screens/StudentScreens/NotificationButton";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      {/* <Profile /> */}
      <NotificationButton />
    </NavigationContainer>
  );
}
