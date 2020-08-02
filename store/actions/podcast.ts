import axios from "axios";

import { PODCAST_FETCH, PODCAST_SUCCESS, PODCAST_FAIL } from "../types";

import { tokenConfig } from "./auth";
import API_URL from "../../constants/API_URL";

// CHECK TOKEN & LOAD USER
export const fetchPodcast = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PODCAST_FETCH });

  axios
    .get(
      `${API_URL}/api/programs/${
        getState().programReducer.program.code
      }/podcasts/${id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: PODCAST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("res", err.response);

      dispatch({
        type: PODCAST_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
