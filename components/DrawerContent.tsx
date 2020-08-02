import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
export function DrawerContent(props) {
  const paperTheme = useTheme();
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  const authReducer = useSelector((state) => state.authReducer);
  return (
    <LinearGradient
      colors={["#2e6a89", "#56b389"]}
      start={[0, 1]}
      end={[1, 0]}
      style={{ flex: 1 }}
    >
      <DrawerContentScrollView {...props}>
        {programReducer.program && (
          <View style={styles.programTitleView}>
            <Text style={styles.programTitle}>
              {programReducer.program.title}
            </Text>
          </View>
        )}
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row" }}>
              {authReducer.user.profile && (
                <Avatar.Image
                  source={
                    authReducer.user.profile.picture
                      ? {
                          uri: authReducer.user.profile.picture,
                        }
                      : require("../assets/images/avatar.png")
                  }
                  size={50}
                />
              )}
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>
                  {authReducer.user.first_name} {authReducer.user.last_name}
                </Title>
                {/* <Caption style={styles.caption}>@j_doe</Caption> */}
              </View>
            </View>

            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View> */}
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Inicio"
              labelStyle={{ color: "#ffffff" }}
              onPress={() => {
                props.navigation.navigate("Main");
              }}
            />
            <DrawerItem
              label="Videos"
              labelStyle={{ color: "#ffffff" }}
              onPress={() => {
                props.navigation.navigate("Videos");
              }}
            />
            <DrawerItem
              label="Listas de reproducción"
              labelStyle={{ color: "#ffffff" }}
              onPress={() => {
                props.navigation.navigate("Playlists");
              }}
            />
            <DrawerItem
              label="Podcasts"
              labelStyle={{ color: "#ffffff" }}
              onPress={() => {
                props.navigation.navigate("Podcasts");
              }}
            />
            <DrawerItem
              label="Videoconferencias"
              labelStyle={{ color: "#ffffff" }}
              onPress={() => {
                props.navigation.navigate("Meetups");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Mis Academias"
          labelStyle={{ color: "#ffffff" }}
          onPress={() => {
            props.navigation.navigate("MyAcademies");
          }}
        />
      </Drawer.Section>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  programTitleView: {
    marginBottom: 20,
    backgroundColor: "#212529",
  },
  programTitle: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    color: "#fff",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
    color: "#fff",
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
