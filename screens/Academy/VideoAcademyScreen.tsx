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
import { fetchVideo } from "../../store/actions/video";
export default function VideoAcademyScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "Video">) {
  const dispatch = useDispatch();
  const videoReducer = useSelector((state) => state.videoReducer);
  const videosReducer = useSelector((state: any) => state.videosReducer);
  React.useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  const Item = ({ item, navigation }: any) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.videoContainer}
          onPress={() => {
            dispatch(fetchVideo(item.id));
            navigation.navigate("Video");
          }}
        >
          <Image
            style={styles.imageVideo}
            source={
              item.picture
                ? { uri: item.picture }
                : require("../../assets/images/no-foto.png")
            }
          />
          <View style={styles.infoText}>
            <Text style={styles.titleVideo}>{item.title}</Text>
            <Text style={styles.subtitleVideo}>
              {moment(item.created).format("DD/MM/YYYY")}
            </Text>
          </View>
        </TouchableOpacity>
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
    console.log(videoReducer.video);
  }, [videoReducer.video]);
  return (
    <ScrollView style={{ flex: 1 }}>
      {!videoReducer.isLoading && videoReducer.video ? (
        <>
          {console.log("videovideo", videoReducer.video.video)}
          <Video
            source={{ uri: videoReducer.video.video }}
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
            <Text style={styles.title}>{videoReducer.video.title}</Text>
            <Text style={styles.subtitle}>
              {moment(videoReducer.video.created).format("DD/MM/YYYY")}
            </Text>
          </View>

          {videosReducer.isLoading && <Text>CARGANDO...</Text>}
          {videosReducer.videos &&
            videosReducer.videos.results.map(
              (video) => video.id !== videoReducer.video.id && renderItem(video)
            )}
          {/* <FlatList
        ItemSeparatorComponent={flatListItemSeparator}
        data={videos}
        renderItem={renderItem}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id.toString()}
      /> */}
        </>
      ) : (
        <Text>CARGANDO...</Text>
      )}
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
  itemContainer: {
    marginBottom: 10,
  },
  separator: {
    borderBottomWidth: 0.5,
    marginBottom: 10,
    borderBottomColor: "#ccc",
  },
  titleVideo: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitleVideo: { fontSize: 12 },
});
