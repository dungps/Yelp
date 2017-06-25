import _ from "lodash";
import {
  DISTANCE_CHANGE,
  OFFER_CHANGE,
  SORT_BY_CHANGE,
  CATEGORY_ENABLE,
  GET_CATEGORY
} from "../actions/types";

const initialState = {
  distance: "0.3",
  sortBy: "best_match",
  offeringADeal: false,
  categoriesSelected: [],
  categories: [],
  onLoad: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISTANCE_CHANGE:
      return { ...state, distance: action.payload };
    case OFFER_CHANGE:
      return { ...state, offeringADeal: action.payload };
    case SORT_BY_CHANGE:
      return { ...state, sortBy: action.payload };
    case CATEGORY_ENABLE:
      return { ...state, categoriesSelected: action.enable ? _.concat(state.categoriesSelected, action.payload) : _.without(state.categoriesSelected, action.payload)};
    case GET_CATEGORY:
      return { ...state, categories: action.payload, onLoad: false };
    default:
      return state;
  }
};
