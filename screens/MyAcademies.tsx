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
const Item = ({ title, separators }: any) => (
  <TouchableOpacity style={styles.academyContainer}>
    <View>
      <Image
        style={styles.image}
        source={require("../assets/images/no-foto.png")}
      />
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
);
export default function MyAcademies({
  navigation,
}: StackScreenProps<RootStackParamList, "MyAcademies">) {
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
  const renderItem = ({ item, separators }: any) => <Item title={item.title} />;
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
}

const styles = StyleSheet.create({
  academyContainer: {
    width: Dimensions.get("window").width,
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width / 2,
  },
  separator: {
    borderBottomWidth: 0.5,
    marginVertical: 20,
    borderBottomColor: "#ccc",
  },
});
