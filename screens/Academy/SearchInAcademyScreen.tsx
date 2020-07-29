import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  Image,
  Dimensions,
} from "react-native";
import { RootStackParamList } from "../../types";
import { TouchableOpacity } from "react-native-gesture-handler";
const Item = ({ title, separators, navigation }: any) => (
  <TouchableOpacity style={styles.academyContainer}>
    <Image
      style={styles.image}
      source={require("../../assets/images/no-foto.png")}
    />
    <View style={styles.info}>
      <View style={styles.infoText}>
        <Text style={styles.title}>MainNavigator</Text>
        <Text style={styles.subtitle}>09/04/2018</Text>
      </View>
    </View>
  </TouchableOpacity>
);
export default function SearchInAcademies({
  navigation,
}: StackScreenProps<RootStackParamList, "MyAcademies">) {
  const DATA = [
    {
      title: "Videos",
      data: [
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
      ],
    },
    {
      title: "Listas de reproducción",
      data: [
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
      ],
    },
    {
      title: "Podcasts",
      data: [
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
      ],
    },
  ];
  const renderItem = ({ item, separators }: any) => (
    <Item title={item.title} navigation={navigation} />
  );
  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <SectionList
      sections={DATA}
      style={styles.list}
      keyExtractor={(item, index) => item.id + index}
      renderItem={({ item }) => <Item title={item} />}
      ItemSeparatorComponent={flatListItemSeparator}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.titleSection}>{title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
  },
  academyContainer: {
    flexDirection: "row",
  },
  image: {
    width: 75,
    height: 75,
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
  titleSection: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 10,
    paddingBottom: 10,
    marginHorizontal: 10,
    textAlign: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    color: "#20232a",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: { fontSize: 12 },
  separator: {
    borderBottomWidth: 0.5,
    marginVertical: 10,
    borderBottomColor: "#ccc",
  },
});
