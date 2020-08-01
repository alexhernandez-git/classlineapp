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
import {
  fetchMyPrograms,
  fetchMyProgramsLimit,
} from "../store/actions/programs";
import API_URL from "../constants/API_URL";

const Item = ({ program, navigation }: any) => {
  return (
    <TouchableOpacity
      style={styles.academyContainer}
      onPress={() =>
        navigation.navigate("Academy", {
          screen: "Main",
          params: { programId: program.code },
        })
      }
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
};
const MyAcademies = ({
  navigation,
}: StackScreenProps<RootStackParamList, "MyAcademies">) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state: any) => state.authReducer);

  const programsReducer = useSelector((state: any) => state.programsReducer);
  React.useEffect(() => {
    dispatch(fetchMyPrograms());
  }, []);
  React.useEffect(() => {
    if (!authReducer.isLoading && !authReducer.isAuthenticated)
      navigation.navigate("Root");
  }, [authReducer.isLoading]);
  const [limit, setLimit] = React.useState(12);
  const handleLoadMore = () => {
    if (programsReducer.programs.count > limit) {
      dispatch(fetchMyProgramsLimit(limit + 12));
      setLimit(limit + 12);
    }
  };
  navigation.setOptions({ title: "Mis Academias" });

  const renderItem = ({ item }: any) => (
    <Item program={item} navigation={navigation} />
  );
  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <View>
      {!programsReducer.isLoading && programsReducer.programs ? (
        <FlatList
          ItemSeparatorComponent={flatListItemSeparator}
          data={programsReducer.programs.results}
          onEndReached={handleLoadMore}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
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
