import { combineReducers } from "redux";
import authReducer from "./authReducer";
import programReducer from "./programReducer";
import programsReducer from "./programsReducer";
import popularVideosReducer from "./popularVideosReducer";
import searchVideosReducer from "./searchVideosReducer";
import popularPlaylistsReducer from "./popularPlaylistsReducer";
import searchPlaylistsReducer from "./searchPlaylistsReducer";
import popularPodcastsReducer from "./popularPodcastsReducer";
import searchPodcastsReducer from "./searchPodcastsReducer";
import recomendedVideosReducer from "./recomendedVideosReducer";
import videoReducer from "./videoReducer";
import podcastReducer from "./podcastReducer";
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
  searchVideosReducer,
  popularVideosReducer,
  searchPlaylistsReducer,
  popularPlaylistsReducer,
  searchPodcastsReducer,
  popularPodcastsReducer,
  recomendedVideosReducer,
  videoReducer,
  podcastReducer,
  videosReducer,
  playlistsReducer,
  playlistReducer,
  podcastsReducer,
  meetupsReducer,
  pricingReducer,
  accountsReducer,
  studentsReducer,
});
