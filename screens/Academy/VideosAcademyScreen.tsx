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
import { fetchVideos, fetchVideosIncrease } from "../../store/actions/videos";
import moment from "moment";
import API_URL from "../../constants/API_URL";
import { fetchVideo } from "../../store/actions/video";

const Item = (props: any) => {
  const { navigation, item, dispatch } = props;

  return (
    <TouchableOpacity
      style={styles.academyContainer}
      onPress={() => {
        dispatch(fetchVideo(item.id));
        navigation.push("Video");
      }}
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
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>
              {moment(item.created).format("DD/MM/YYYY")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default function Videos({
  navigation,
}: StackScreenProps<RootStackParamList, "MyAcademies">) {
  const dispatch = useDispatch();
  const authReducer = useSelector((state: any) => state.authReducer);

  const videosReducer = useSelector((state: any) => state.videosReducer);
  React.useEffect(() => {
    dispatch(fetchVideos());
  }, []);
  const [limit, setLimit] = React.useState(12);

  const handleLoadMore = () => {
    if (videosReducer.videos.count > limit) {
      dispatch(fetchVideosIncrease(limit + 12));
      setLimit(limit + 12);
    }
  };

  const renderItem = ({ item }: any) => (
    <Item item={item} navigation={navigation} dispatch={dispatch} />
  );
  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <View>
      {!videosReducer.isLoading && videosReducer.videos ? (
        <FlatList
          ItemSeparatorComponent={flatListItemSeparator}
          data={videosReducer.videos.results}
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
    height: Dimensions.get("window").width / (16 / 9),
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
