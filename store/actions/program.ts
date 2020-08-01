import axios from "axios";
import { PROGRAM_FETCH, PROGRAM_SUCCESS, PROGRAM_FAIL } from "../types";
import API_URL from "../../constants/API_URL";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchProgram = (id) => (dispatch) => {
  // User Loading
  dispatch({ type: PROGRAM_FETCH });

  axios
    .get(`${API_URL}/api/programs/${id}`)
    .then((res) => {
      dispatch({
        type: PROGRAM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PROGRAM_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
