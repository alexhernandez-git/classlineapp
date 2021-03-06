import axios from "axios";

import {
  VIDEOS_FETCH,
  VIDEOS_SUCCESS,
  VIDEOS_FAIL,
  SET_VIDEO_EDIT,
  DELETE_VIDEO_EDIT,
  EDIT_VIDEO,
  EDIT_VIDEO_FAIL,
  EDIT_VIDEO_SUCCESS,
  CREATE_VIDEO,
  CREATE_VIDEO_FAIL,
  CREATE_VIDEO_SUCCESS,
  DELETE_VIDEO,
  DELETE_VIDEO_FAIL,
  DELETE_VIDEO_SUCCESS,
} from "../types";

import { tokenConfig } from "./auth";
import API_URL from "../../constants/API_URL";

// CHECK TOKEN & LOAD USER
export const fetchVideos = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: VIDEOS_FETCH });

  axios
    .get(
      `${API_URL}/api/programs/${
        getState().programReducer.program.code
      }/videos/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: VIDEOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEOS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const fetchVideosIncrease = (limit) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: VIDEOS_FETCH });

  axios
    .get(
      `${API_URL}/api/programs/${
        getState().programReducer.program.code
      }/videos/?limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: VIDEOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEOS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const setVideoEdit = (video) => (dispatch) => {
  // User Loading

  dispatch({
    type: SET_VIDEO_EDIT,
    payload: video,
  });
};

export const deleteVideoEdit = () => (dispatch) => {
  // User Loading

  dispatch({
    type: DELETE_VIDEO_EDIT,
  });
};

export const editVideo = (video) => (dispatch, getState) => {
  dispatch({
    type: EDIT_VIDEO,
  });
  console.log(video);
  const fd = new FormData();
  fd.append("title", video.title);

  fd.append("description", video.description);
  fd.append("duration", video.duration);
  if (video.picture && video.picture.name !== undefined) {
    fd.append("picture", video.picture, video.picture.name);
  }
  if (video.video && video.video.name !== undefined) {
    fd.append("video", video.video, video.video.name);
  }
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/videos/${
        video.id
      }/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: EDIT_VIDEO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_VIDEO_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createVideo = (video) => (dispatch, getState) => {
  dispatch({
    type: CREATE_VIDEO,
  });
  const fd = new FormData();
  fd.append("title", video.title);

  fd.append("description", video.description);
  fd.append("duration", video.duration);

  if (video.picture && video.picture.name !== undefined) {
    fd.append("picture", video.picture, video.picture.name);
  }
  fd.append("video", video.video, video.video.name);
  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/videos/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: CREATE_VIDEO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: CREATE_VIDEO_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deleteVideo = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_VIDEO,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/videos/${id}`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: DELETE_VIDEO_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_VIDEO_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
