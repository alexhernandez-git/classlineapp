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
  const [orientationIsLandscape, setOrientationIsLandscape] = React.useState(
    false
  );
  return (
    <ScrollView>
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
});
