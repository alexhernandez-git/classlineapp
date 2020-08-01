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
import { fetchMyPrograms } from "../store/actions/programs";
import { useSelector, useDispatch } from "react-redux";

const Item = ({ title, separators }: any) => (
  <TouchableOpacity style={styles.academyContainer}>
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
export default function SearchAcademies({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "MyAcademies">) {
  const programsReducer = useSelector((state: any) => state.programsReducer);

  const renderItem = ({ item, separators }: any) => <Item title={item.title} />;
  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <View>
      {!programsReducer.isLoading && programsReducer.programs ? (
        <FlatList
          ItemSeparatorComponent={flatListItemSeparator}
          data={programsReducer.programs.results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
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
