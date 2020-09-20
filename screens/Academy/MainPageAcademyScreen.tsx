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
import { YellowBox } from "react-native";
import { useSelector, useDispatch } from "react-redux";
YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
]);
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { fetchPopularVideos } from "../../store/actions/popularVideos";
import { fetchPopularPlaylists } from "../../store/actions/popularPlaylists";
import { fetchPopularPodcasts } from "../../store/actions/popularPodcasts";
import API_URL from "../../constants/API_URL";
import moment from "moment";
import { fetchVideo } from "../../store/actions/video";
import { fetchPlaylist } from "../../store/actions/playlist";
import { fetchPodcast } from "../../store/actions/podcast";
const Video = ({ item, navigation, dispatch }: any) => {
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
const Playlist = ({ item, navigation, dispatch }: any) => (
  <TouchableOpacity
    style={styles.academyContainer}
    onPress={() => {
      dispatch(fetchPlaylist(item.id));
      navigation.push("Playlist");
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
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.tracks.length} Videos</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
const Podcast = ({ item, navigation, dispatch }: any) => (
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
export default function MainPageAcademyScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "MyAcademies">) {
  const dispatch = useDispatch();
  const programReducer = useSelector((state: any) => state.programReducer);
  const popularVideosReducer = useSelector(
    (state: any) => state.popularVideosReducer
  );
  const popularPlaylistsReducer = useSelector(
    (state: any) => state.popularPlaylistsReducer
  );
  const popularPodcastsReducer = useSelector(
    (state: any) => state.popularPodcastsReducer
  );

  React.useEffect(() => {
    if (programReducer.program.code) {
      dispatch(fetchPopularVideos(programReducer.program.code));
    }
    if (programReducer.program.code) {
      dispatch(fetchPopularPlaylists(programReducer.program.code));
    }
    if (programReducer.program.code) {
      dispatch(fetchPopularPodcasts(programReducer.program.code));
    }
  }, [programReducer.program.code]);

  const renderVideo = ({ item }: any) => (
    <Video
      item={item}
      key={item.id}
      navigation={navigation}
      dispatch={dispatch}
    />
  );
  const renderPlaylist = ({ item }: any) => (
    <Playlist
      item={item}
      key={item.id}
      navigation={navigation}
      dispatch={dispatch}
    />
  );
  const renderPodcast = ({ item }: any) => (
    <Podcast
      item={item}
      key={item.id}
      navigation={navigation}
      dispatch={dispatch}
    />
  );
  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  const flatListHorizontalItemSeparator = ({ navigation }: any) => {
    return <View style={styles.separatorHorizontal} />;
  };
  return (
    <View>
      <ScrollView nestedScrollEnabled>
        {programReducer.program && programReducer.program.are_videos && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Videos populares</Text>
            {!popularVideosReducer.isLoading && popularVideosReducer.videos ? (
              <FlatList
                horizontal={true}
                ItemSeparatorComponent={flatListHorizontalItemSeparator}
                data={popularVideosReducer.videos}
                renderItem={renderVideo}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <Text>Cargando...</Text>
            )}
          </View>
        )}
        {programReducer.program && programReducer.program.are_courses && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cursos populares</Text>
            {!popularVideosReducer.isLoading &&
            popularPlaylistsReducer.playlists ? (
              <FlatList
                horizontal={true}
                ItemSeparatorComponent={flatListHorizontalItemSeparator}
                data={popularPlaylistsReducer.playlists}
                renderItem={renderPlaylist}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <Text>Cargando...</Text>
            )}
          </View>
        )}
        {programReducer.program && programReducer.program.are_podcasts && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Podcasts populares</Text>
            {!popularPodcastsReducer.isLoading &&
            popularPodcastsReducer.podcasts ? (
              <FlatList
                ItemSeparatorComponent={flatListItemSeparator}
                data={popularPodcastsReducer.podcasts}
                renderItem={renderPodcast}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <Text>Cargando...</Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  academyContainer: {
    width: Dimensions.get("window").width - 100,
  },
  image: {
    width: Dimensions.get("window").width - 100,
    height: Dimensions.get("window").width / 2 - 40,
  },
  imagePodcast: {
    width: 100,
    height: 100,
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
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    margin: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: { fontSize: 12 },
  separatorHorizontal: { height: "100%", width: 20 },
  separator: {
    borderBottomWidth: 0.5,
    marginVertical: 10,
    borderBottomColor: "#ccc",
  },
  section: {},
  podcastContainer: {
    flexDirection: "row",
  },
});
