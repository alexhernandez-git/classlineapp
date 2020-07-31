import axios from "axios";
import {
  MY_PROGRAMS_FETCH,
  MY_PROGRAMS_FETCH_SUCCESS,
  MY_PROGRAMS_FETCH_FAIL,
} from "../types";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchMyPrograms = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: MY_PROGRAMS_FETCH });

  axios
    .get(`/api/programs/list_my_programs/`, tokenConfig(getState))
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
