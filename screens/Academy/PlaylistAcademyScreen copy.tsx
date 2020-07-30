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

export default function PlaylistAcademyScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Video">) {
  const Item = ({ item, navigation }: any) => {
    return (
      <TouchableOpacity style={styles.playlist} onPress={() => setId(item.id)}>
        <Image
          style={styles.imageTrack}
          source={require("../../assets/images/no-foto.png")}
        />
        <View style={styles.info}>
          <View style={styles.infoText}>
            <Text style={styles.title}>MainNavigator</Text>
            <Text style={styles.subtitle}>09/04/2018</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const [playlist, setPlaylist] = React.useState([
    {
      id: 0,
      pos: 0,
      title: "English CC",
      language: "en",
      video: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    },
    {
      id: 1,
      pos: 1,
      title: "Spanish Subtitles",
      language: "es",
      video: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
    {
      id: 2,
      pos: 2,
      title: "Spanish Subtitles",
      language: "es",
      video: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
    {
      id: 3,
      pos: 3,
      title: "Spanish Subtitles",
      language: "es",
      video: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
  ]);
  const [currentTrack, setCurrentTrack] = React.useState<any>(null);
  const [id, setId] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (playlist && id) {
      const track = playlist.find((track) => id == track.id);
      setCurrentTrack(track);
    }
    if (playlist && !id) {
      const track = playlist[0];
      setCurrentTrack(track);
    }
  }, [playlist, id]);
  const [orientationIsLandscape, setOrientationIsLandscape] = React.useState(
    false
  );
  const renderItem = ({ item }: any) => (
    <Item item={item} navigation={navigation} />
  );
  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <Video
        source={{
          uri: currentTrack && currentTrack.video,
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
      <View style={styles.infoPlaylist}>
        <Text style={styles.title}>Video de Yoga</Text>
        <Text style={styles.subtitle}>
          {playlist && playlist.length} Videos
        </Text>
      </View>
      <FlatList
        ItemSeparatorComponent={flatListItemSeparator}
        data={playlist}
        renderItem={renderItem}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
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
  infoPlaylist: {
    padding: 10,
    backgroundColor: "#ccc",
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
  imageTrack: {
    width: 80,
    height: 80,
  },
  infoText: {
    justifyContent: "space-between",
  },
  playlist: {
    flexDirection: "row",
  },
});
