import axios from "axios";
import { PROGRAM_FETCH, PROGRAM_SUCCESS, PROGRAM_FAIL } from "../types";
import API_URL from "../../constants/API_URL";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchProgram = (data) => (dispatch) => {
  // User Loading
  dispatch({ type: PROGRAM_FETCH });
  dispatch({
    type: PROGRAM_SUCCESS,
    payload: data,
  });
  // dispatch({
  //   type: PROGRAM_FAIL,
  //   payload: { data: "err.response.data", status: err.response.status },
  // });
};
