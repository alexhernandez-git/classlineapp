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

YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
]);
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
const Video = (props: any) => {
  const { navigation, item } = props;
  return (
    <TouchableOpacity
      style={styles.academyContainer}
      onPress={() => navigation.navigate("Video", { videoId: item.id })}
    >
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/images/no-foto.png")}
        />
        <View style={styles.info}>
          <View style={styles.infoText}>
            <Text style={styles.title}>MainNavigator</Text>
            <Text style={styles.subtitle}>21/08/2019</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const Playlist = () => (
  <TouchableOpacity style={styles.academyContainer}>
    <View>
      <Image
        style={styles.image}
        source={require("../../assets/images/no-foto.png")}
      />
      <View style={styles.info}>
        <View style={styles.infoText}>
          <Text style={styles.title}>MainNavigator</Text>
          <Text style={styles.subtitle}>14 Videos</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
const Podcast = () => (
  <TouchableOpacity style={styles.podcastContainer}>
    <Image
      style={styles.imagePodcast}
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
export default function MainPageAcademyScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "MyAcademies">) {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Academy",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Academy",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Academy",
    },
    {
      id: "58694a0f-3da1-471f-bd9634-145571e29d72",
      title: "Four Academy",
    },
    {
      id: "58694a0f-3da1-471f-bd94326-145571e29d72",
      title: "Five Academy",
    },
    {
      id: "58694a0f-3da1-471f-b43d96-145571e29d72",
      title: "Six Academy",
    },
  ];
  const renderVideo = ({ item, separators }: any) => (
    <Video item={item} navigation={navigation} />
  );
  const renderPlaylist = ({ item, separators }: any) => <Playlist />;
  const renderPodcast = ({ item, separators }: any) => <Podcast />;
  const flatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  const flatListHorizontalItemSeparator = ({ navigation }: any) => {
    return <View style={styles.separatorHorizontal} />;
  };
  return (
    <View>
      <ScrollView nestedScrollEnabled>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Videos populares</Text>
          <FlatList
            horizontal={true}
            ItemSeparatorComponent={flatListHorizontalItemSeparator}
            data={DATA}
            renderItem={renderVideo}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Listas de reproducion populares
          </Text>
          <FlatList
            horizontal={true}
            ItemSeparatorComponent={flatListHorizontalItemSeparator}
            data={DATA}
            renderItem={renderPlaylist}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Podcasts populares</Text>
          <FlatList
            ItemSeparatorComponent={flatListItemSeparator}
            data={DATA}
            renderItem={renderPodcast}
            keyExtractor={(item) => item.id}
          />
        </View>
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
