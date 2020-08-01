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
import { RootStackParamList } from "../../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import API_URL from "../../constants/API_URL";
import {
  fetchPlaylists,
  fetchPlaylistsIncrease,
} from "../../store/actions/playlists";
const Item = ({ item, navigation }: any) => {
  return (
    <TouchableOpacity
      style={styles.academyContainer}
      onPress={() => navigation.push("Playlist")}
    >
      <View>
        <Image
          style={styles.image}
          source={
            item.picture
              ? { uri: item.picture }
              : require("../../assets/images/no-foto.png")
          }
        />
        <View style={styles.info}>
          <View style={styles.infoText}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.tracks.length} Videos</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default function Playlists({
  navigation,
}: StackScreenProps<RootStackParamList, "MyAcademies">) {
  const dispatch = useDispatch();
  const authReducer = useSelector((state: any) => state.authReducer);

  const playlistsReducer = useSelector((state: any) => state.playlistsReducer);
  React.useEffect(() => {
    dispatch(fetchPlaylists());
  }, []);
  const [limit, setLimit] = React.useState(12);

  const handleLoadMore = () => {
    if (playlistsReducer.playlists.count > limit) {
      dispatch(fetchPlaylistsIncrease(limit + 12));
      setLimit(limit + 12);
    }
  };

  const renderItem = ({ item }: any) => (
    <Item item={item} navigation={navigation} />
  );
  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <View>
      {!playlistsReducer.isLoading && playlistsReducer.playlists ? (
        <FlatList
          ItemSeparatorComponent={flatListItemSeparator}
          data={playlistsReducer.playlists.results}
          onEndReached={handleLoadMore}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>CARGANDO...</Text>
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
