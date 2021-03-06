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
import {
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import MainPageAcademyScreen from "../screens/Academy/MainPageAcademyScreen";
import { DrawerActions } from "@react-navigation/native";
import AcademyDrawerNavigator from "./AcademyDrawerNavigator";
import Video from "../screens/Academy/VideoAcademyScreen";
import Playlist from "../screens/Academy/PlaylistAcademyScreen copy";
import Podcast from "../screens/Academy/PodcastAcademyScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";
import { fetchMyPrograms } from "../store/actions/programs";
import SearchAcademiesBar from "../components/SearchAcademiesBar";
import SearchInAcademyBar from "../components/SearchInAcademyBar";
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
  const dispatch = useDispatch();
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
          animationEnabled: false,

          // headerRight: () => <SearchAcademiesBar />,
        }}
      />
      <Stack.Screen
        name="MyAcademies"
        component={MyAcademies}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Image
              style={{ width: 120, height: 39, alignSelf: "center" }}
              source={require("../assets/images/classlinelogo.png")}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 20 }}
              onPress={() => {
                dispatch(logout());
                navigation.replace("Root");
              }}
            >
              <SimpleLineIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ marginRight: 15 }}>
              {/* <TouchableOpacity
                onPress={() => navigation.push("SearchAcademies")}
              >
                <Ionicons name="md-search" size={32} color="black" />
              </TouchableOpacity> */}
            </View>
          ),
        })}
      />

      <Stack.Screen
        name="Academy"
        component={AcademyDrawerNavigator}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Image
              style={{ width: 120, height: 39, alignSelf: "center" }}
              source={require("../assets/images/classlinelogo.png")}
            />
          ),
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
          headerRight: () => <SearchInAcademyBar />,
        }}
      />
      <Stack.Screen
        name="Video"
        component={Video}
        options={({ navigation }) => ({
          headerTitle: () => (
            <TouchableWithoutFeedback
              onPress={() => navigation.push("Academy")}
            >
              <Image
                style={{ width: 120, height: 39, alignSelf: "center" }}
                source={require("../assets/images/classlinelogo.png")}
              />
            </TouchableWithoutFeedback>
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
        name="Playlist"
        component={Playlist}
        options={({ navigation }) => ({
          headerTitle: () => (
            <TouchableWithoutFeedback
              onPress={() => navigation.push("Academy")}
            >
              <Image
                style={{ width: 120, height: 39, alignSelf: "center" }}
                source={require("../assets/images/classlinelogo.png")}
              />
            </TouchableWithoutFeedback>
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
        name="Podcast"
        component={Podcast}
        options={({ navigation }) => ({
          headerTitle: () => (
            <TouchableWithoutFeedback
              onPress={() => navigation.push("Academy")}
            >
              <Image
                style={{ width: 120, height: 39, alignSelf: "center" }}
                source={require("../assets/images/classlinelogo.png")}
              />
            </TouchableWithoutFeedback>
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
