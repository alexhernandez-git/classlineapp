import axios from "axios";

import { PLAYLIST_FETCH, PLAYLIST_SUCCESS, PLAYLIST_FAIL } from "../types";

import { tokenConfig } from "./auth";
import API_URL from "../../constants/API_URL";
// CHECK TOKEN & LOAD USER
export const fetchPlaylist = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PLAYLIST_FETCH });

  axios
    .get(
      `${API_URL}/api/programs/${
        getState().programReducer.program.code
      }/courses/${id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PLAYLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLIST_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
