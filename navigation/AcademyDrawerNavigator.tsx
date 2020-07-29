import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { AcademyNavigator, TabOneParamList, TabTwoParamList } from "../types";
import MainPageAcademyScreen from "../screens/Academy/MainPageAcademyScreen";
import Videos from "../screens/Academy/VideosAcademyScreen";
import Playlists from "../screens/Academy/PlaylistsAcademyScreen";
import Podcasts from "../screens/Academy/PodcastsAcademyScreen";
import Meetups from "../screens/Academy/MeetupsAcademyScreen";

export default function AcademyDrawerNavigator() {
  const colorScheme = useColorScheme();

  const Drawer = createDrawerNavigator<AcademyNavigator>();
  return (
    <Drawer.Navigator initialRouteName="Academy">
      <Drawer.Screen
        name="Main"
        component={MainPageAcademyScreen}
        options={{ title: "Inicio" }}
      />
      <Drawer.Screen
        name="Videos"
        component={Videos}
        options={{ title: "Videos" }}
      />
      <Drawer.Screen
        name="Playlists"
        component={Playlists}
        options={{ title: "Listas de reproducción" }}
      />
      <Drawer.Screen
        name="Podcasts"
        component={Podcasts}
        options={{ title: "Podcasts" }}
      />
      <Drawer.Screen
        name="Meetups"
        component={Meetups}
        options={{ title: "Meetups" }}
      />
    </Drawer.Navigator>
  );
}
