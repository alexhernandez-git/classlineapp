import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { RootStackParamList } from "../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

const Item = ({ title, navigation }: any) => {
  return (
    <TouchableOpacity
      style={styles.academyContainer}
      onPress={() => navigation.navigate("Academy")}
    >
      <View>
        <Image
          style={styles.image}
          source={require("../assets/images/no-foto.png")}
        />
        <View style={styles.info}>
          <Image
            style={styles.imageAvatar}
            source={require("../assets/images/avatar.png")}
          />
          <View style={styles.infoText}>
            <Text style={styles.title}>Academia de Yoga</Text>
            <Text style={styles.subtitle}>Classline Academy</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const MyAcademies = ({
  navigation,
}: StackScreenProps<RootStackParamList, "MyAcademies">) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state: any) => state.authReducer);
  React.useEffect(() => {
    if (authReducer.isAuthenticated) navigation.navigate("MyAcademies");
  }, [authReducer.isAuthenticated]);
  navigation.setOptions({ title: "Mis Academias" });
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Academy",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Academy",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Academy",
    },
    {
      id: "58694a0f-3da1-471f-bd9634-145571e29d72",
      title: "Four Academy",
    },
    {
      id: "58694a0f-3da1-471f-bd94326-145571e29d72",
      title: "Five Academy",
    },
    {
      id: "58694a0f-3da1-471f-b43d96-145571e29d72",
      title: "Six Academy",
    },
  ];
  const renderItem = ({ item }: any) => (
    <Item title={item.title} navigation={navigation} />
  );
  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <FlatList
      ItemSeparatorComponent={flatListItemSeparator}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyAcademies;
const styles = StyleSheet.create({
  academyContainer: {
    width: Dimensions.get("window").width,
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width / 2,
  },
  info: {
    flexDirection: "row",
    padding: 10,
  },
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoText: {
    padding: 2,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: { fontSize: 12 },
  separator: {
    borderBottomWidth: 0.5,
    marginBottom: 20,
    borderBottomColor: "#ccc",
  },
});
