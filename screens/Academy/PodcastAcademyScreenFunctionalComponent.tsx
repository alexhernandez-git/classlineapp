/**
 * @flow
 */

import React from "react";
import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Asset } from "expo-asset";
import { Audio, Video } from "expo-av";
import * as Font from "expo-font";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Can't perform a React state update on an unmounted component.", // TODO: Remove when fixed
]);
class Icon {
  module: any;
  width: any;
  height: any;
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(module).downloadAsync();
  }
}

class PlaylistItem {
  name: string;
  uri: string;
  isVideo: boolean;

  constructor(name: string, uri: string, isVideo: boolean) {
    this.name = name;
    this.uri = uri;
    this.isVideo = isVideo;
  }
}

const PLAYLIST = [
  new PlaylistItem(
    "Comfort Fit - “Sorry”",
    "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    false
  ),
  new PlaylistItem(
    "Big Buck Bunny",
    "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    true
  ),
  new PlaylistItem(
    "Mildred Bailey – “All Of Me”",
    "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
    false
  ),
  new PlaylistItem(
    "Popeye - I don't scare",
    "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
    true
  ),
  new PlaylistItem(
    "Podington Bear - “Rubber Robot”",
    "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
    false
  ),
];

const ICON_THROUGH_EARPIECE = "speaker-phone";
const ICON_THROUGH_SPEAKER = "speaker";

const ICON_PLAY_BUTTON = new Icon(
  require("../../assets/images/play_button.png"),
  34,
  51
);
const ICON_PAUSE_BUTTON = new Icon(
  require("../../assets/images/pause_button.png"),
  34,
  51
);
const ICON_STOP_BUTTON = new Icon(
  require("../../assets/images/stop_button.png"),
  22,
  22
);
const ICON_FORWARD_BUTTON = new Icon(
  require("../../assets/images/forward_button.png"),
  33,
  25
);
const ICON_BACK_BUTTON = new Icon(
  require("../../assets/images/back_button.png"),
  33,
  25
);

const ICON_LOOP_ALL_BUTTON = new Icon(
  require("../../assets/images/loop_all_button.png"),
  77,
  35
);
const ICON_LOOP_ONE_BUTTON = new Icon(
  require("../../assets/images/loop_one_button.png"),
  77,
  35
);

const ICON_MUTED_BUTTON = new Icon(
  require("../../assets/images/muted_button.png"),
  67,
  58
);
const ICON_UNMUTED_BUTTON = new Icon(
  require("../../assets/images/unmuted_button.png"),
  67,
  58
);

const ICON_TRACK_1 = new Icon(
  require("../../assets/images/track_1.png"),
  166,
  5
);
const ICON_THUMB_1 = new Icon(
  require("../../assets/images/thumb_1.png"),
  18,
  19
);
const ICON_THUMB_2 = new Icon(
  require("../../assets/images/thumb_2.png"),
  15,
  19
);

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFF";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "... Cargando ...";
const BUFFERING_STRING = "...Cargando...";
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;

const PodcastAcademyScreen = (props: any) => {
  const [index, setIndex] = React.useState(0);
  const [isSeeking, setIsSeeking] = React.useState(false);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = React.useState(
    false
  );
  const [playbackInstance, setPlaybackInstance] = React.useState<any>(null);
  const [podcastState, setPodcastState] = React.useState<any>({
    showVideo: false,
    playbackInstanceName: LOADING_STRING,
    loopingType: LOOPING_TYPE_ONE,
    muted: false,
    playbackInstancePosition: null,
    playbackInstanceDuration: null,
    shouldPlay: false,
    isPlaying: false,
    isBuffering: false,
    isLoading: true,
    fontLoaded: false,
    shouldCorrectPitch: true,
    volume: 1.0,
    rate: 1.0,
    videoWidth: DEVICE_WIDTH,
    videoHeight: VIDEO_CONTAINER_HEIGHT,
    poster: false,
    useNativeControls: false,
    fullscreen: false,
    throughEarpiece: false,
    unmounted: false,
  });

  React.useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  const _loadNewPlaybackInstance = async (playing: any) => {
    if (playbackInstance != null) {
      await playbackInstance.unloadAsync();
      // playbackInstance.setOnPlaybackStatusUpdate(null);
      setPlaybackInstance(null);
    }

    const source = {
      uri:
        "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
    };
    const initialStatus = {
      shouldPlay: playing,
      rate: podcastState.rate,
      shouldCorrectPitch: podcastState.shouldCorrectPitch,
      volume: podcastState.volume,
      isMuted: podcastState.muted,
      isLooping: podcastState.loopingType === LOOPING_TYPE_ONE,
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };

    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      _onPlaybackStatusUpdate
    );
    setPlaybackInstance(sound);

    _updateScreenForLoading(false);
  };

  const _mountVideo = (component) => {
    _video = component;
    _loadNewPlaybackInstance(false);
  };

  const _updateScreenForLoading = (isLoading) => {
    if (isLoading) {
      setPodcastState({
        ...podcastState,
        showVideo: false,
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
      });
    } else {
      setPodcastState({
        ...podcastState,
        playbackInstanceName: PLAYLIST[index].name,
        showVideo: PLAYLIST[index].isVideo,
        isLoading: false,
      });
    }
  };

  const _onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      console.log(status);

      setPodcastState({
        ...podcastState,
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
        shouldCorrectPitch: status.shouldCorrectPitch,
      });

      if (status.didJustFinish && !status.isLooping) {
        _advanceIndex(true);
        _updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  const _onLoad = (status: any) => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  const _onError = (error: any) => {
    console.log(`ON ERROR : ${error}`);
  };

  const _onReadyForDisplay = (event: any) => {
    const widestHeight =
      (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      setPodcastState({
        ...podcastState,
        videoWidth:
          (VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
          event.naturalSize.height,
        videoHeight: VIDEO_CONTAINER_HEIGHT,
      });
    } else {
      setPodcastState({
        ...podcastState,
        videoWidth: DEVICE_WIDTH,
        videoHeight:
          (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width,
      });
    }
  };

  const _onFullscreenUpdate = (event: any) => {
    console.log(
      `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
    );
  };

  const _advanceIndex = (forward: any) => {
    setIndex((index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length);
  };

  const _updatePlaybackInstanceForIndex = async (playing: any) => {
    _updateScreenForLoading(true);

    setPodcastState({
      ...podcastState,
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
    });

    _loadNewPlaybackInstance(playing);
  };

  const _onPlayPausePressed = () => {
    if (playbackInstance != null) {
      if (podcastState.isPlaying) {
        playbackInstance.pauseAsync();
      } else {
        playbackInstance.playAsync();
      }
    }
  };

  const _onStopPressed = () => {
    if (playbackInstance != null) {
      playbackInstance.stopAsync();
    }
  };

  const _onMutePressed = () => {
    if (playbackInstance != null) {
      playbackInstance.setIsMutedAsync(!podcastState.muted);
    }
  };

  const _onVolumeSliderValueChange = (value: any) => {
    if (playbackInstance != null) {
      playbackInstance.setVolumeAsync(value);
    }
  };

  const _onSeekSliderValueChange = (value: any) => {
    if (playbackInstance != null && !isSeeking) {
      setIsSeeking(true);
      setShouldPlayAtEndOfSeek(podcastState.shouldPlay);
      playbackInstance.pauseAsync();
    }
  };

  const _onSeekSliderSlidingComplete = async (value: any) => {
    if (playbackInstance != null) {
      setIsSeeking(false);

      const seekPosition = value * podcastState.playbackInstanceDuration;
      if (shouldPlayAtEndOfSeek) {
        playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  const _getSeekSliderPosition = () => {
    if (
      playbackInstance != null &&
      podcastState.playbackInstancePosition != null &&
      podcastState.playbackInstanceDuration != null
    ) {
      return (
        podcastState.playbackInstancePosition /
        podcastState.playbackInstanceDuration
      );
    }
    return 0;
  };

  const _getMMSSFromMillis = (millis) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  };

  const _getTimestamp = () => {
    if (
      playbackInstance != null &&
      podcastState.playbackInstancePosition != null &&
      podcastState.playbackInstanceDuration != null
    ) {
      return `${_getMMSSFromMillis(
        podcastState.playbackInstancePosition
      )} / ${_getMMSSFromMillis(podcastState.playbackInstanceDuration)}`;
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <View />
      <View style={styles.nameContainer}>
        <Text style={[styles.text]}>{podcastState.playbackInstanceName}</Text>
      </View>
      <View style={styles.space} />
      <View style={styles.videoContainer}>
        <Video
          ref={_mountVideo}
          style={[
            styles.video,
            {
              opacity: podcastState.showVideo ? 1.0 : 0.0,
              width: podcastState.videoWidth,
              height: podcastState.videoHeight,
            },
          ]}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
          onLoadStart={_onLoadStart}
          onLoad={_onLoad}
          onError={_onError}
          onFullscreenUpdate={_onFullscreenUpdate}
          onReadyForDisplay={_onReadyForDisplay}
          useNativeControls={podcastState.useNativeControls}
        />
      </View>
      <View
        style={[
          styles.playbackContainer,
          {
            opacity: podcastState.isLoading ? DISABLED_OPACITY : 1.0,
          },
        ]}
      >
        <Slider
          style={styles.playbackSlider}
          trackImage={ICON_TRACK_1.module}
          thumbImage={ICON_THUMB_1.module}
          value={_getSeekSliderPosition()}
          onValueChange={_onSeekSliderValueChange}
          onSlidingComplete={_onSeekSliderSlidingComplete}
          disabled={podcastState.isLoading}
        />
        <View style={styles.timestampRow}>
          <Text style={[styles.text, styles.buffering]}>
            {podcastState.isBuffering ? BUFFERING_STRING : ""}
          </Text>
          <Text style={[styles.text, styles.timestamp]}>{_getTimestamp()}</Text>
        </View>
      </View>
      <View
        style={[
          styles.buttonsContainerBase,
          styles.buttonsContainerTopRow,
          {
            opacity: podcastState.isLoading ? DISABLED_OPACITY : 1.0,
          },
        ]}
      >
        {/* <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={_onBackPressed}
            disabled={podcastState.isLoading}
          >
            <Image style={styles.button} source={ICON_BACK_BUTTON.module} />
          </TouchableHighlight> */}
        <TouchableHighlight
          underlayColor={BACKGROUND_COLOR}
          style={styles.wrapper}
          onPress={_onPlayPausePressed}
          disabled={podcastState.isLoading}
        >
          {podcastState.isPlaying ? (
            <FontAwesome name="pause" size={32} color="black" />
          ) : (
            <FontAwesome name="play" size={32} color="black" />
          )}
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={BACKGROUND_COLOR}
          style={styles.wrapper}
          onPress={_onStopPressed}
          disabled={podcastState.isLoading}
        >
          <FontAwesome name="stop" size={32} color="black" />
        </TouchableHighlight>
        {/* <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={_onForwardPressed}
            disabled={podcastState.isLoading}
          >
            <Image style={styles.button} source={ICON_FORWARD_BUTTON.module} />
          </TouchableHighlight> */}
      </View>
      <View
        style={[styles.buttonsContainerBase, styles.buttonsContainerMiddleRow]}
      >
        <View style={styles.volumeContainer}>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={_onMutePressed}
          >
            {podcastState.muted ? (
              <FontAwesome name="volume-off" size={32} color="black" />
            ) : (
              <FontAwesome name="volume-up" size={32} color="black" />
            )}
          </TouchableHighlight>
          <Slider
            style={styles.volumeSlider}
            trackImage={ICON_TRACK_1.module}
            thumbImage={ICON_THUMB_2.module}
            value={1}
            onValueChange={_onVolumeSliderValueChange}
          />
        </View>
        {/* <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={_onLoopPressed}
          >
            <Image
              style={styles.button}
              source={LOOPING_TYPE_ICONS[podcastState.loopingType].module}
            />
          </TouchableHighlight> */}
      </View>
      {/* <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerBottomRow,
          ]}
        >
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={() => _trySetRate(1.0, podcastState.shouldCorrectPitch)}
          >
            <View style={styles.button}>
              <Text
                style={[styles.text, { fontFamily: "cutive-mono-regular" }]}
              >
                Rate:
              </Text>
            </View>
          </TouchableHighlight>
          <Slider
            style={styles.rateSlider}
            trackImage={ICON_TRACK_1.module}
            thumbImage={ICON_THUMB_1.module}
            value={podcastState.rate / RATE_SCALE}
            onSlidingComplete={_onRateSliderSlidingComplete}
          />
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={_onPitchCorrectionPressed}
          >
            <View style={styles.button}>
              <Text
                style={[styles.text, { fontFamily: "cutive-mono-regular" }]}
              >
                PC: {podcastState.shouldCorrectPitch ? "yes" : "no"}
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={_onSpeakerPressed}
            underlayColor={BACKGROUND_COLOR}
          >
            <MaterialIcons
              name={
                podcastState.throughEarpiece
                  ? ICON_THROUGH_EARPIECE
                  : ICON_THROUGH_SPEAKER
              }
              size={32}
              color="black"
            />
          </TouchableHighlight>
        </View>
        <View /> */}
      {/* {podcastState.showVideo ? (
          <View>
            <View
              style={[
                styles.buttonsContainerBase,
                styles.buttonsContainerTextRow,
              ]}
            >
              <View />
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={_onPosterPressed}
              >
                <View style={styles.button}>
                  <Text
                    style={[styles.text, { fontFamily: "cutive-mono-regular" }]}
                  >
                    Poster: {podcastState.poster ? "yes" : "no"}
                  </Text>
                </View>
              </TouchableHighlight>
              <View />
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={_onFullscreenPressed}
              >
                <View style={styles.button}>
                  <Text
                    style={[styles.text, { fontFamily: "cutive-mono-regular" }]}
                  >
                    Fullscreen
                  </Text>
                </View>
              </TouchableHighlight>
              <View />
            </View>
            <View style={styles.space} />
            <View
              style={[
                styles.buttonsContainerBase,
                styles.buttonsContainerTextRow,
              ]}
            >
              <View />
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={_onUseNativeControlsPressed}
              >
                <View style={styles.button}>
                  <Text
                    style={[styles.text, { fontFamily: "cutive-mono-regular" }]}
                  >
                    Native Controls:{" "}
                    {podcastState.useNativeControls ? "yes" : "no"}
                  </Text>
                </View>
              </TouchableHighlight>
              <View />
            </View>
          </View>
        ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR,
  },
  wrapper: {},
  nameContainer: {
    height: FONT_SIZE,
  },
  space: {
    height: FONT_SIZE,
  },
  videoContainer: {
    height: VIDEO_CONTAINER_HEIGHT,
  },
  video: {
    maxWidth: DEVICE_WIDTH,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: ICON_THUMB_1.height * 2.0,
    maxHeight: ICON_THUMB_1.height * 2.0,
  },
  playbackSlider: {
    alignSelf: "stretch",
  },
  timestampRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    minHeight: FONT_SIZE,
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE,
  },
  buffering: {
    textAlign: "left",
    paddingLeft: 20,
  },
  timestamp: {
    textAlign: "right",
    paddingRight: 20,
  },
  button: {
    backgroundColor: BACKGROUND_COLOR,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_PLAY_BUTTON.height,
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  buttonsContainerMiddleRow: {
    maxHeight: ICON_MUTED_BUTTON.height,
    alignSelf: "stretch",
    paddingRight: 20,
  },
  volumeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width,
  },
  buttonsContainerBottomRow: {
    maxHeight: ICON_THUMB_1.height,
    alignSelf: "stretch",
    paddingRight: 20,
    paddingLeft: 20,
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0,
  },
  buttonsContainerTextRow: {
    maxHeight: FONT_SIZE,
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    minWidth: DEVICE_WIDTH,
    maxWidth: DEVICE_WIDTH,
  },
});

export default PodcastAcademyScreen;
