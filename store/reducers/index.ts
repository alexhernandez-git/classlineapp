import { combineReducers } from "redux";
import authReducer from "./authReducer";
import programReducer from "./programReducer";
import programsReducer from "./programsReducer";
import popularVideosReducer from "./popularVideosReducer";
import popularPlaylistsReducer from "./popularPlaylistsReducer";
import popularPodcastsReducer from "./popularPodcastsReducer";
import recomendedVideosReducer from "./recomendedVideosReducer";
import videoReducer from "./videoReducer";
import videosReducer from "./videosReducer";
import playlistsReducer from "./playlistsReducer";
import playlistReducer from "./playlistReducer";
import podcastsReducer from "./podcastsReducer";
import meetupsReducer from "./meetupsReducer";
import studentsReducer from "./studentsReducer";
import accountsReducer from "./accountsReducer";
import pricingReducer from "./pricingReducer";

export default combineReducers({
  authReducer,
  programReducer,
  programsReducer,
  popularVideosReducer,
  popularPlaylistsReducer,
  popularPodcastsReducer,
  recomendedVideosReducer,
  videoReducer,
  videosReducer,
  playlistsReducer,
  playlistReducer,
  podcastsReducer,
  meetupsReducer,
  pricingReducer,
  accountsReducer,
  studentsReducer,
});