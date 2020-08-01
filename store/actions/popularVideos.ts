import axios from "axios";

import {
  POPULAR_VIDEOS_FETCH,
  POPULAR_VIDEOS_SUCCESS,
  POPULAR_VIDEOS_FAIL,
} from "../types";

import { tokenConfig } from "./auth";
import API_URL from "../../constants/API_URL";

// CHECK TOKEN & LOAD USER
export const fetchPopularVideos = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: POPULAR_VIDEOS_FETCH });
  console.log(`/api/programs/${id}/videos/get_popular_videos/`);
  axios
    .get(
      `${API_URL}/api/programs/${id}/videos/get_popular_videos/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: POPULAR_VIDEOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: POPULAR_VIDEOS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
