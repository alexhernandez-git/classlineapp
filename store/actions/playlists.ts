import axios from "axios";

import {
  PLAYLISTS_FETCH,
  PLAYLISTS_SUCCESS,
  PLAYLISTS_FAIL,
  SET_PLAYLIST_EDIT,
  DELETE_PLAYLIST_EDIT,
  EDIT_PLAYLIST,
  EDIT_PLAYLIST_FAIL,
  EDIT_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST,
  CREATE_PLAYLIST_FAIL,
  CREATE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST,
  DELETE_PLAYLIST_FAIL,
  DELETE_PLAYLIST_SUCCESS,
} from "../types";

import { tokenConfig } from "./auth";
import API_URL from "../../constants/API_URL";

// CHECK TOKEN & LOAD USER
export const fetchPlaylists = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PLAYLISTS_FETCH });

  axios
    .get(
      `${API_URL}/api/programs/${
        getState().programReducer.program.code
      }/courses/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PLAYLISTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLISTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPlaylistsIncrease = (limit) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PLAYLISTS_FETCH });

  axios
    .get(
      `${API_URL}/api/programs/${
        getState().programReducer.program.code
      }/courses/?limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PLAYLISTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLISTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPlaylistsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PLAYLISTS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PLAYLISTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLISTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const setPlaylistEdit = (playlist) => (dispatch) => {
  // User Loading

  dispatch({
    type: SET_PLAYLIST_EDIT,
    payload: playlist,
  });
};

export const deletePlaylistEdit = () => (dispatch) => {
  // User Loading

  dispatch({
    type: DELETE_PLAYLIST_EDIT,
  });
};

export const editPlaylist = (playlist) => (dispatch, getState) => {
  dispatch({
    type: EDIT_PLAYLIST,
  });
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        playlist.id
      }/`,
      playlist,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: EDIT_PLAYLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_PLAYLIST_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createPlaylist = (playlist) => (dispatch, getState) => {
  dispatch({
    type: CREATE_PLAYLIST,
  });

  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/courses/`,
      playlist,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CREATE_PLAYLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_PLAYLIST_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deletePlaylist = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_PLAYLIST,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/courses/${id}`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: DELETE_PLAYLIST_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_PLAYLIST_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
