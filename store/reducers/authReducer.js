import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CREATE_RATING,
  CREATE_RATING_SUCCESS,
  CREATE_RATING_FAIL,
} from "../types";
const initialState = {
  auth_token: null,
  isAuthenticated: null,
  isLoading: true,
  user: null,
  error: null,
  is_updating_profile: false,
  update_profile_error: null,
  is_updating_user: false,
  update_user_error: null,
  is_changing_password: false,
  change_password_error: null,
  rating: null,
  rating_creating: false,
  rating_create_error: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      //   console.log(action.payload);

      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        rating: action.payload.rating,
        auth_token: action.payload.access_token,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        auth_token: null,
        user: null,
        rating: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        is_updating_profile: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        is_updating_profile: false,
        user: action.payload,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        is_updating_profile: false,
        update_profile_error: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        is_updating_user: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        is_updating_user: false,
        user: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        is_updating_user: false,
        update_user_error: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        is_changing_password: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        is_changing_password: false,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        is_changing_password: false,
        change_password_error: action.payload,
      };
    case CREATE_RATING:
      return {
        ...state,
        rating_creating: true,
      };
    case CREATE_RATING_SUCCESS:
      return {
        ...state,
        rating_creating: false,
        rating: action.payload,
      };

    case CREATE_RATING_FAIL:
      return {
        ...state,
        rating_creating: false,
        rating_create_error: action.payload,
      };
    default:
      return state;
  }
}
