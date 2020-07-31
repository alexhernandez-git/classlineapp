import {
  MY_PROGRAMS_FETCH,
  MY_PROGRAMS_FETCH_SUCCESS,
  MY_PROGRAMS_FETCH_FAIL,
} from "../types";

const initialState = {
  isLoading: true,
  programs: null,
  error: null,
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

    default:
      return state;
  }
}
