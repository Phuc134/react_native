import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./src/screens/LoginPage";
import HomePage from "./src/screens/HomePage";
import VideoCallPage from "./src/screens/VideoCallPage";
const Stack = createNativeStackNavigator();
export default function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <NavigationContainer>
      {login ? (
        <Stack.Navigator
          initialRouteName="HomePage"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            initialParams={{ setLogin, setUser, user }}
          />
          <Stack.Screen name="VideoCallPage" component={VideoCallPage} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="LoginPage"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            initialParams={{ setLogin, setUser }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});