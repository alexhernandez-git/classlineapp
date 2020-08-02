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
import API_URL from "../../constants/API_URL";
import moment from "moment";
import { useSelector } from "react-redux";
export default function PlaylistAcademyScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "Video">) {
  const Item = ({ item, navigation }: any) => {
    return (
      <TouchableOpacity style={styles.playlist} onPress={() => setId(item.id)}>
        <Image
          style={styles.imageTrack}
          source={
            item.video.picture
              ? { uri: API_URL + item.video.picture }
              : require("../../assets/images/no-foto.png")
          }
        />
        <View style={styles.info}>
          <View style={styles.infoText}>
            <Text style={styles.title}>{item.video.title}</Text>
            <Text style={styles.subtitle}>
              {moment(item.video.created).format("DD/MM/YYYY")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const [currentTrack, setCurrentTrack] = React.useState<any>(null);
  const [id, setId] = React.useState<number | null>(null);
  const playlistReducer = useSelector((state) => state.playlistReducer);
  React.useEffect(() => {
    if (playlistReducer.playlist && id) {
      const track = playlistReducer.playlist.tracks.find(
        (track) => id == track.id
      );
      setCurrentTrack(track);
    }
    if (playlistReducer.playlist && !id) {
      const track = playlistReducer.playlist.tracks[0];
      setCurrentTrack(track);
    }
  }, [playlistReducer.playlist, id]);
  const [orientationIsLandscape, setOrientationIsLandscape] = React.useState(
    false
  );
  const renderItem = ({ item }: any) => (
    <Item item={item} navigation={navigation} />
  );
  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  React.useEffect(() => {
    console.log(currentTrack);
  }, [currentTrack]);
  return (
    <View style={{ flex: 1 }}>
      {!playlistReducer.isLoading && playlistReducer.playlist ? (
        <>
          <Video
            source={{
              uri: currentTrack && API_URL + currentTrack.video.video,
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
            <Text style={styles.title}>{playlistReducer.playlist.name}</Text>
            <Text style={styles.subtitle}>
              {playlistReducer.playlist &&
                playlistReducer.playlist.tracks.length}{" "}
              Videos
            </Text>
          </View>
          <FlatList
            ItemSeparatorComponent={flatListItemSeparator}
            data={playlistReducer.playlist.tracks}
            renderItem={renderItem}
            style={{ flex: 1 }}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
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
