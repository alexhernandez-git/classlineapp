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
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { login } from "../store/actions/auth";
export default function MainScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Root">) {
  const dispatch = useDispatch();
  const authReducer = useSelector((state: any) => state.authReducer);
  React.useEffect(() => {
    if (authReducer.isAuthenticated) navigation.navigate("MyAcademies");
  }, [authReducer.isAuthenticated]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/classlinelogo.png")}
        />
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => await dispatch(login(values))}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Login</Text>
            {authReducer.error && authReducer.error.data.detail && (
              <Text style={styles.error}>{authReducer.error.data.detail}</Text>
            )}
            {authReducer.error &&
              authReducer.error.data.non_field_errors &&
              authReducer.error.data.non_field_errors.map(
                (error: any, index: number) => (
                  <Text style={styles.error} key={index}>
                    {error}
                  </Text>
                )
              )}
            <TextInput
              placeholder={"Usuario o email"}
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />

            {authReducer.error &&
              authReducer.error.data.email &&
              authReducer.error.data.email.map((error: any, index: number) => (
                <Text style={styles.error} key={index}>
                  {error}
                </Text>
              ))}
            <TextInput
              placeholder={"Contraseña"}
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {authReducer.error &&
              authReducer.error.data.password &&
              authReducer.error.data.password.map(
                (error: any, index: number) => (
                  <Text style={styles.error} key={index}>
                    {error}
                  </Text>
                )
              )}
            <TouchableOpacity onPress={handleSubmit}>
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
        )}
      </Formik>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d2d2d",
  },
  textInput: {
    height: 40,
    width: 250,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 6,
    marginTop: 15,
  },
  loginButton: {
    marginTop: 15,
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    width: 250,
  },
  error: {
    color: "red",
  },
});
