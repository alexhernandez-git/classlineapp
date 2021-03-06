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
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import API_URL from "../../constants/API_URL";
import {
  fetchPodcasts,
  fetchPodcastsIncrease,
} from "../../store/actions/podcasts";
import { fetchPodcast } from "../../store/actions/podcast";
const Item = ({ item, navigation, dispatch }: any) => {
  return (
    <TouchableOpacity
      style={styles.podcastContainer}
      onPress={() => {
        dispatch(fetchPodcast(item.id));
        navigation.push("Podcast");
      }}
    >
      <Image
        style={styles.imagePodcast}
        source={
          item.picture
            ? { uri: item.picture }
            : require("../../assets/images/no-foto.png")
        }
      />
      <View style={styles.info}>
        <View style={styles.infoText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>
            {moment(item.created).format("DD/MM/YYYY")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default function Podcasts({
  navigation,
}: StackScreenProps<RootStackParamList, "MyAcademies">) {
  const dispatch = useDispatch();
  const authReducer = useSelector((state: any) => state.authReducer);

  const podcastsReducer = useSelector((state: any) => state.podcastsReducer);
  React.useEffect(() => {
    dispatch(fetchPodcasts());
  }, []);
  const [limit, setLimit] = React.useState(12);

  const handleLoadMore = () => {
    if (podcastsReducer.podcasts.count > limit) {
      dispatch(fetchPodcastsIncrease(limit + 12));
      setLimit(limit + 12);
    }
  };

  const renderItem = ({ item }: any) => (
    <Item
      item={item}
      key={item.id}
      navigation={navigation}
      dispatch={dispatch}
    />
  );
  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <View>
      {!podcastsReducer.isLoading && podcastsReducer.podcasts ? (
        <FlatList
          ItemSeparatorComponent={flatListItemSeparator}
          data={podcastsReducer.podcasts.results}
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
  imagePodcast: {
    width: 80,
    height: 80,
  },
  info: {
    flexDirection: "row",
    padding: 10,
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
    marginVertical: 10,
    borderBottomColor: "#ccc",
  },
  podcastContainer: {
    flexDirection: "row",
  },
});
