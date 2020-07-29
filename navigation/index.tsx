import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import MainScreen from "../screens/MainScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import MyAcademies from "../screens/MyAcademies";

import { Ionicons } from "@expo/vector-icons";
import { View, Image, StyleSheet } from "react-native";
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyAcademies"
        component={MyAcademies}
        options={{
          title: "Mis Academias",
          headerTitleStyle: { alignSelf: "center" },
          headerLeft: () => (
            <View style={{}}>
              <Image
                style={styles.logo}
                source={require("../assets/images/classlinelogo.png")}
              />
            </View>
          ),

          headerRight: () => (
            <View style={{ marginRight: 15 }}>
              <Ionicons name="md-search" size={32} color="black" />
            </View>
          ),
        }}
      />
      {/* <Stack.Screen name="Root" component={BottomTabNavigator} /> */}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  logoContainer: {},
  logo: {
    width: 80,
    height: 30,
  },
});
