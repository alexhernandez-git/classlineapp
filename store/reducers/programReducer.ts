import { PROGRAM_FETCH, PROGRAM_SUCCESS, PROGRAM_FAIL } from "../types";

const initialState = {
  isLoading: true,
  program: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROGRAM_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PROGRAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        program: action.payload,
      };

    case PROGRAM_FAIL:
      return {
        ...state,
        program: null,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
