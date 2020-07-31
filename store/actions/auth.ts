import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from "../types";
import API_URL from "../../constants/API_URL";
// SET TOKEN
// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    // .get("http://localhost:4000/users/1",
    .get(`${API_URL}/api/users/get_profile_app`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {});
};
export const login = (data) => (dispatch, getState) => {
  axios
    .post(`${API_URL}/api/users/login_from_app/`, data)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const logout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT_SUCCESS });
};

export const updateProfile = (profile) => (dispatch, getState) => {
  dispatch({ type: UPDATE_PROFILE });
  let data = new FormData();
  if (profile.picture && profile.picture.name) {
    data.append("picture", profile.picture, profile.picture.name);
  }

  axios
    .patch("/api/users/profile/", data, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const changePassword = (data) => (dispatch, getState) => {
  dispatch({
    type: CHANGE_PASSWORD,
  });
  axios
    .post("/api/users/change_password/", data, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  let token = getState().authReducer.auth_token;
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
