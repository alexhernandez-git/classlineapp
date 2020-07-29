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
    </Drawer.Navigator>
  );
}
