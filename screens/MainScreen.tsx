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
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../types";

export default function MainScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Root">) {
  const [auth, setAuth] = React.useState({
    username: "",
    password: "",
  });
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/classlinelogo.png")}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.textInput}
          value={auth.username}
          onChangeText={(text) => setAuth({ ...auth, username: text })}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          value={auth.password}
          onChangeText={(text) => setAuth({ ...auth, password: text })}
        />
        <TouchableOpacity onPress={() => navigation.replace("MyAcademies")}>
          <LinearGradient
            // Button Linear Gradient
            colors={["#2e6a89", "#56b389"]}
            start={[0, 1]}
            end={[1, 0]}
            style={styles.loginButton}
          >
            <Text
              style={{
                backgroundColor: "transparent",
                fontSize: 15,
                color: "#fff",
              }}
            >
              INICIAR SESIÓN
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  logoContainer: {},
  logo: {
    width: 200,
    height: 90,
  },
  loginContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    padding: 20,
    borderRadius: 6,
    borderWidth: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  loginButton: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    width: 250,
  },
});
