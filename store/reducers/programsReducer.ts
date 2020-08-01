import {
  SEARCH_MY_PROGRAMS_FETCH,
  SEARCH_MY_PROGRAMS_FETCH_SUCCESS,
  SEARCH_MY_PROGRAMS_FETCH_FAIL,
  MY_PROGRAMS_FETCH,
  MY_PROGRAMS_FETCH_SUCCESS,
  MY_PROGRAMS_FETCH_FAIL,
} from "../types";

const initialState = {
  isLoading: true,
  programs: null,
  error: null,
  isLoadingSearch: false,
  programs_search: null,
  error_search: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_PROGRAMS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case MY_PROGRAMS_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        programs: action.payload,
      };

    case MY_PROGRAMS_FETCH_FAIL:
      return {
        ...state,
        programs: null,
        isLoading: false,
        error: action.payload,
      };
    case SEARCH_MY_PROGRAMS_FETCH:
      return {
        ...state,
        isLoadingSearch: true,
      };
    case SEARCH_MY_PROGRAMS_FETCH_SUCCESS:
      return {
        ...state,
        isLoadingSearch: false,
        programs_search: action.payload,
      };

    case SEARCH_MY_PROGRAMS_FETCH_FAIL:
      return {
        ...state,
        programs_search: null,
        isLoadingSearch: false,
        error_search: action.payload,
      };

    default:
      return state;
  }
}
