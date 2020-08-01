import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchMyPrograms } from "../store/actions/programs";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
const SearchAcademiesBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (search != "") {
      const timeoutId = setTimeout(
        () => dispatch(fetchSearchMyPrograms(search)),
        500
      );
      return () => clearTimeout(timeoutId);
    }
  }, [search]);

  return (
    <View
      style={{
        marginRight: 15,
        width: Dimensions.get("window").width - 60,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TextInput
        autoFocus={true}
        style={{
          backgroundColor: "#f3f3f3",
          flex: 1,
          marginHorizontal: 20,
          paddingHorizontal: 10,
        }}
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Buscar..."
      />
      <Ionicons name="md-search" size={32} color="black" />
    </View>
  );
};

export default SearchAcademiesBar;

const styles = StyleSheet.create({});
