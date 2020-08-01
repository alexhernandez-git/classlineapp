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
import API_URL from "../constants/API_URL";
import { fetchProgram } from "../store/actions/program";

const Item = ({ program, navigation, dispatch }: any) => (
  <TouchableOpacity
    style={styles.academyContainer}
    onPress={() => {
      dispatch(fetchProgram(program));
      navigation.navigate("Academy", {
        screen: "Main",
        params: { programId: program.code },
      });
    }}
  >
    <View>
      <Image
        style={styles.image}
        source={
          program.picture
            ? { uri: program.picture }
            : require("../assets/images/no-foto.png")
        }
      />
      <View style={styles.info}>
        <Image
          style={styles.imageAvatar}
          source={
            program.instructor.profile.picture
              ? { uri: API_URL + program.instructor.profile.picture }
              : require("../assets/images/avatar.png")
          }
        />
        <View style={styles.infoText}>
          <Text style={styles.title}>{program.title}</Text>
          {program.instructor.profile.is_enterprise ? (
            <Text style={styles.subtitle}>
              {program.instructor.profile.company_name}
            </Text>
          ) : (
            <Text style={styles.subtitle}>
              {program.instructor.first_name} {program.instructor.last_name}
            </Text>
          )}
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
  console.log("====================================");
  console.log(programsReducer);
  console.log("====================================");
  const dispatch = useDispatch();
  const renderItem = ({ item, separators }: any) => (
    <Item program={item} navigation={navigation} dispatch={dispatch} />
  );
  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <View>
      {programsReducer.programs_search && (
        <FlatList
          ItemSeparatorComponent={flatListItemSeparator}
          data={programsReducer.programs_search.results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      {programsReducer.isLoadingSearch && <Text>Cargando...</Text>}
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
