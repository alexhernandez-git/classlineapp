import {
  SEARCH_PLAYLISTS_FETCH,
  SEARCH_PLAYLISTS_SUCCESS,
  SEARCH_PLAYLISTS_FAIL,
} from "../types";

const initialState = {
  isLoading: true,
  playlists: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_PLAYLISTS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_PLAYLISTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playlists: action.payload,
      };

    case SEARCH_PLAYLISTS_FAIL:
      return {
        ...state,
        playlists: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
