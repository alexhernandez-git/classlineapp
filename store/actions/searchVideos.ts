import axios from "axios";

import {
  SEARCH_VIDEOS_FETCH,
  SEARCH_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_FAIL,
} from "../types";

import { tokenConfig } from "./auth";
import API_URL from "../../constants/API_URL";

// CHECK TOKEN & LOAD USER
export const fetchPopularVideos = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: SEARCH_VIDEOS_FETCH });
  axios
    .get(
      `${API_URL}/api/programs/${
        getState().programReducer.program.code
      }/videos/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SEARCH_VIDEOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SEARCH_VIDEOS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
