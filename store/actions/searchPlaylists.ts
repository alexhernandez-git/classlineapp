import axios from "axios";

import {
  SEARCH_PLAYLISTS_FETCH,
  SEARCH_PLAYLISTS_SUCCESS,
  SEARCH_PLAYLISTS_FAIL,
} from "../types";

import { tokenConfig } from "./auth";
import API_URL from "../../constants/API_URL";

// CHECK TOKEN & LOAD USER
export const fetchSearchPlaylists = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: SEARCH_PLAYLISTS_FETCH });

  axios
    .get(
      `${API_URL}/api/programs/${
        getState().programReducer.program.code
      }/playlists/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SEARCH_PLAYLISTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SEARCH_PLAYLISTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
