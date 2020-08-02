import { PODCAST_FETCH, PODCAST_SUCCESS, PODCAST_FAIL } from "../types";

const initialState = {
  isLoading: true,
  podcast: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PODCAST_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PODCAST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        podcast: action.payload,
      };

    case PODCAST_FAIL:
      return {
        ...state,
        podcast: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
