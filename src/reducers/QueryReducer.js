import _ from "lodash";
import {
  USER_SEARCH,
  UPDATE_DATA,
  UPDATE_TOKEN,
  STEP_CHANGE
} from "../actions/types";

const initialState = {
  data: [],
  token: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SEARCH:
      return { ...state, searchText: action.payload };
    case UPDATE_DATA:
      return { ...state, data: action.payload };
    case UPDATE_TOKEN:
      return { ...state, token: action.payload };
    case STEP_CHANGE:
      return { ...state, step: action.payload };
    default:
      return state;
  }
};
