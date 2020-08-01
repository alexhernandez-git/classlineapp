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
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideos } from "../../store/actions/videos";
import moment from "moment";
import API_URL from "../../constants/API_URL";
export default function VideoAcademyScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "Video">) {
  const { video } = route.params;
  const dispatch = useDispatch();

  const videosReducer = useSelector((state: any) => state.videosReducer);
  React.useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  const Item = ({ item, navigation }: any) => {
    return (
      <View>
        {console.log("item", item)}
        <TouchableOpacity
          style={styles.videoContainer}
          onPress={() => navigation.navigate("Video", { video: item })}
        >
          <Image
            style={styles.imageVideo}
            source={require("../../assets/images/no-foto.png")}
          />
          <View style={styles.infoText}>
            <Text style={styles.titleVideo}>{item.title}</Text>
            <Text style={styles.subtitleVideo}>
              {moment(item.created).format("DD/MM/YYYY")}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
  };

  const [orientationIsLandscape, setOrientationIsLandscape] = React.useState(
    false
  );
  const renderItem = (item: any) => (
    <Item item={item} key={item.id} navigation={navigation} />
  );
  React.useEffect(() => {
    console.log(video.video);
  }, [video]);
  return (
    <ScrollView style={{ flex: 1 }}>
      {console.log("videovideo", video.video)}
      <Video
        source={{ uri: video.video }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        useNativeControls
        shouldPlay
        isLooping
        style={styles.video}
        onFullscreenUpdate={async () => {
          await ScreenOrientation.lockAsync(
            orientationIsLandscape
              ? ScreenOrientation.OrientationLock.PORTRAIT
              : ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
          );
          setOrientationIsLandscape(!orientationIsLandscape);
        }}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.subtitle}>
          {moment(video.created).format("DD/MM/YYYY")}
        </Text>
      </View>

      {videosReducer.isLoading && <Text>CARGANDO...</Text>}
      {videosReducer.videos &&
        videosReducer.videos.results.map((video) => renderItem(video))}
      {/* <FlatList
        ItemSeparatorComponent={flatListItemSeparator}
        data={videos}
        renderItem={renderItem}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  academyContainer: {
    width: Dimensions.get("window").width,
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width / (16 / 9),
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width / (16 / 9),
  },
  info: {
    padding: 10,
  },
  infoText: {
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: { fontSize: 12 },
  videoContainer: {
    flexDirection: "row",
  },
  imageVideo: {
    width: 80,
    height: 80,
  },
  separator: {
    borderBottomWidth: 0.5,
    marginVertical: 10,
    borderBottomColor: "#ccc",
  },
  titleVideo: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitleVideo: { fontSize: 12 },
});
