import axios from "axios";
import {
  MY_PROGRAMS_FETCH,
  MY_PROGRAMS_FETCH_SUCCESS,
  MY_PROGRAMS_FETCH_FAIL,
  SEARCH_MY_PROGRAMS_FETCH,
  SEARCH_MY_PROGRAMS_FETCH_SUCCESS,
  SEARCH_MY_PROGRAMS_FETCH_FAIL,
} from "../types";
import API_URL from "../../constants/API_URL";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchMyPrograms = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: MY_PROGRAMS_FETCH });

  axios
    .get(
      `${API_URL}/api/programs/list_my_programs/?search=${search}`,
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
export const fetchSearchMyPrograms = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: SEARCH_MY_PROGRAMS_FETCH });

  axios
    .get(
      `${API_URL}/api/programs/list_my_programs/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SEARCH_MY_PROGRAMS_FETCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SEARCH_MY_PROGRAMS_FETCH_FAIL,
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
