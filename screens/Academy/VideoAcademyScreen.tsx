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
export default function VideoAcademyScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Video">) {
  const [videos, setVideos] = React.useState([
    {
      id: 0,
      title: "English CC",
    },
    {
      id: 1,
      title: "Spanish Subtitles",
    },
    {
      id: 2,
      title: "Spanish Subtitles",
    },
    {
      id: 3,
      title: "Spanish Subtitles",
    },
    {
      id: 4,
      title: "Spanish Subtitles",
    },
    {
      id: 5,
      title: "Spanish Subtitles",
    },
  ]);
  const Item = ({ item, navigation }: any) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.videoContainer}
          onPress={() => navigation.navigate("Video", { videoId: item.id })}
        >
          <Image
            style={styles.imageVideo}
            source={require("../../assets/images/no-foto.png")}
          />
          <View style={styles.infoText}>
            <Text style={styles.titleVideo}>Video de yoga</Text>
            <Text style={styles.subtitleVideo}>09/04/2018</Text>
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
  const flatListItemSeparator = () => {};
  return (
    <ScrollView style={{ flex: 1 }}>
      <Video
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
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
        <Text style={styles.title}>Video de Yoga</Text>
        <Text style={styles.subtitle}>26/05/2017</Text>
      </View>
      {videos.map((video) => renderItem(video))}
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
