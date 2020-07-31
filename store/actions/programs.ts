import axios from "axios";
import {
  MY_PROGRAMS_FETCH,
  MY_PROGRAMS_FETCH_SUCCESS,
  MY_PROGRAMS_FETCH_FAIL,
} from "../types";
import API_URL from "../../constants/API_URL";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchMyPrograms = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: MY_PROGRAMS_FETCH });

  axios
    .get(`${API_URL}/api/programs/list_my_programs/`, tokenConfig(getState))
    .then((res) => {
      console.log(res);

      dispatch({
        type: MY_PROGRAMS_FETCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: MY_PROGRAMS_FETCH_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchMyProgramsLimit = (limit) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: MY_PROGRAMS_FETCH });

  axios
    .get(
      `${API_URL}/api/programs/list_my_programs/?limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: MY_PROGRAMS_FETCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: MY_PROGRAMS_FETCH_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
