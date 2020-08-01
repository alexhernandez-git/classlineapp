import axios from "axios";

import {
  SEARCH_PODCASTS_FETCH,
  SEARCH_PODCASTS_SUCCESS,
  SEARCH_PODCASTS_FAIL,
} from "../types";

import { tokenConfig } from "./auth";
import API_URL from "../../constants/API_URL";

// CHECK TOKEN & LOAD USER
export const fetchPopularPodcasts = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: SEARCH_PODCASTS_FETCH });
  console.log(
    `/api/programs/${
      getState().programReducer.program.code
    }/videos/get_popular_podcasts/`
  );
  axios
    .get(
      `${API_URL}/api/programs/${
        getState().programReducer.program.code
      }/podcasts/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SEARCH_PODCASTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SEARCH_PODCASTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
