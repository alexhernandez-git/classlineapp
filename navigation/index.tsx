import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, Dimensions } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import MainScreen from "../screens/MainScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import MyAcademies from "../screens/MyAcademiesScreen";
import SearchAcademies from "../screens/SearchAcademiesScreen";
import SearchInAcademy from "../screens/Academy/SearchInAcademyScreen";
// import IndexAcademy from "../screens/Academy/IndexAcademy";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { View, Image, StyleSheet } from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import MainPageAcademyScreen from "../screens/Academy/MainPageAcademyScreen";
import { DrawerActions } from "@react-navigation/native";
import AcademyDrawerNavigator from "./AcademyDrawerNavigator";
import Video from "../screens/Academy/VideoAcademyScreen";
import Playlist from "../screens/Academy/PlaylistAcademyScreen copy";
import Podcast from "../screens/Academy/PodcastAcademyScreen";
import BottomTabNavigator from "./BottomTabNavigator";

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
      {/* <AcademyNavigator /> */}
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
        name="SearchAcademies"
        component={SearchAcademies}
        options={{
          title: "",
          animationEnabled: false,
          headerRight: () => (
            <View
              style={{
                marginRight: 15,
                width: Dimensions.get("window").width - 60,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                style={{
                  backgroundColor: "#f3f3f3",
                  flex: 1,
                  marginHorizontal: 20,
                  paddingHorizontal: 10,
                }}
                placeholder="Buscar..."
              />
              <Ionicons name="md-search" size={32} color="black" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MyAcademies"
        component={AcademyDrawerNavigator}
        options={({ navigation }) => ({
          title: "",
          headerTitleStyle: { alignSelf: "center" },

          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 20 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Ionicons name="md-menu" size={32} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ marginRight: 15 }}>
              <TouchableOpacity
                onPress={() => navigation.push("SearchInAcademy")}
              >
                <Ionicons name="md-search" size={32} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />

      <Stack.Screen
        name="SearchInAcademy"
        component={SearchInAcademy}
        options={{
          title: "",
          animationEnabled: false,
          headerRight: () => (
            <View
              style={{
                marginRight: 15,
                width: Dimensions.get("window").width - 60,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                style={{
                  backgroundColor: "#f3f3f3",
                  flex: 1,
                  marginHorizontal: 20,
                  paddingHorizontal: 10,
                }}
                placeholder="Buscar..."
              />
              <Ionicons name="md-search" size={32} color="black" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Video"
        component={Video}
        options={({ navigation }) => ({
          title: "",
          headerTitleStyle: { alignSelf: "center" },

          headerRight: () => (
            <View style={{ marginRight: 15 }}>
              <TouchableOpacity
                onPress={() => navigation.push("SearchInAcademy")}
              >
                <Ionicons name="md-search" size={32} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Playlist"
        component={Playlist}
        options={({ navigation }) => ({
          title: "",
          headerTitleStyle: { alignSelf: "center" },

          headerRight: () => (
            <View style={{ marginRight: 15 }}>
              <TouchableOpacity
                onPress={() => navigation.push("SearchInAcademy")}
              >
                <Ionicons name="md-search" size={32} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Podcast"
        component={Podcast}
        options={({ navigation }) => ({
          title: "",
          headerTitleStyle: { alignSelf: "center" },

          headerRight: () => (
            <View style={{ marginRight: 15 }}>
              <TouchableOpacity
                onPress={() => navigation.push("SearchInAcademy")}
              >
                <Ionicons name="md-search" size={32} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
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
