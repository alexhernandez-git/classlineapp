import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  Image,
  Dimensions,
} from "react-native";
import { RootStackParamList } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import API_URL from "../../constants/API_URL";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchVideo } from "../../store/actions/video";
import { fetchPodcast } from "../../store/actions/podcast";
import { fetchPlaylist } from "../../store/actions/playlist";
const Item = ({
  item,
  dispatch,
  navigation,
  isPlaylist,
  isVideo,
  isAudio,
}: any) => (
  <TouchableOpacity
    style={styles.academyContainer}
    onPress={() => {
      if (isVideo) {
        dispatch(fetchVideo(item.id));
        navigation.push("Video");
      }
      if (isAudio) {
        dispatch(fetchPodcast(item.id));
        navigation.push("Podcast");
      }
      if (isPlaylist) {
        dispatch(fetchPlaylist(item.id));
        navigation.push("Playlist");
      }
    }}
  >
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
        <Text style={styles.title}>{isPlaylist ? item.name : item.title}</Text>
        <Text style={styles.subtitle}>
          {isPlaylist
            ? item.tracks.length + " videos"
            : moment(item.created).format("DD/MM/YYYY")}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);
export default function SearchInAcademies({
  navigation,
}: StackScreenProps<RootStackParamList, "MyAcademies">) {
  const searchVideosReducer = useSelector(
    (state: any) => state.searchVideosReducer
  );
  const searchPlaylistsReducer = useSelector(
    (state: any) => state.searchPlaylistsReducer
  );
  const searchPodcastsReducer = useSelector(
    (state: any) => state.searchPodcastsReducer
  );
  const dispatch = useDispatch();
  const [data, setData] = React.useState([
    {
      title: "Videos",
      data: searchVideosReducer.videos
        ? searchVideosReducer.videos.results
        : [],
    },
    {
      title: "Listas de reproducción",
      data: searchPlaylistsReducer.playlists
        ? searchPlaylistsReducer.playlists.results
        : [],
    },
    {
      title: "Podcasts",
      data: searchPodcastsReducer.podcasts
        ? searchPodcastsReducer.podcasts.results
        : [],
    },
  ]);
  React.useEffect(() => {
    setData([
      {
        title: "Videos",
        data: searchVideosReducer.videos
          ? searchVideosReducer.videos.results
          : [],
      },
      {
        title: "Listas de reproducción",
        data: searchPlaylistsReducer.playlists
          ? searchPlaylistsReducer.playlists.results
          : [],
      },
      {
        title: "Podcasts",
        data: searchPodcastsReducer.podcasts
          ? searchPodcastsReducer.podcasts.results
          : [],
      },
    ]);
  }, [
    searchVideosReducer.videos,
    searchPlaylistsReducer.playlists,
    searchPodcastsReducer.podcasts,
  ]);

  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <View>
      {console.log(searchVideosReducer.isLoading)}
      {(searchVideosReducer.isLoading ||
        searchPlaylistsReducer.isLoading ||
        searchPodcastsReducer.isLoading) && <Text>CARGANDO...</Text>}
      <SectionList
        sections={data}
        style={styles.list}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <Item
            item={item}
            navigation={navigation}
            isPlaylist={item.name ? true : false}
            isVideo={item.video ? true : false}
            isAudio={item.audio ? true : false}
            dispatch={dispatch}
          />
        )}
        ItemSeparatorComponent={flatListItemSeparator}
        renderSectionHeader={({ section: { title } }) => (
          <View>
            <Text style={styles.titleSection}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
  },
  academyContainer: {
    flexDirection: "row",
  },
  image: {
    width: 75,
    height: 75,
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
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  titleSection: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 10,
    paddingBottom: 10,
    marginHorizontal: 10,
    textAlign: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    color: "#20232a",
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
});
