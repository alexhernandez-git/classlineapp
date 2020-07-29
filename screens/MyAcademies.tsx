import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { RootStackParamList } from "../types";

export default function MyAcademies({
  navigation,
}: StackScreenProps<RootStackParamList, "MyAcademies">) {
  return (
    <View style={styles.container}>
      <Text>My academies</Text>
    </View>
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
