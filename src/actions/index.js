import _ from "lodash";
import {
  LOGIN_USER,
  USER_SEARCH,
  UPDATE_DATA,
  GET_CATEGORY,
  DISTANCE_CHANGE,
  OFFER_CHANGE,
  SORT_BY_CHANGE,
  CATEGORY_ENABLE,
  UPDATE_TOKEN,
  STEP_CHANGE
} from "./types";

// Login Screen
export const startLogin = token => {
  return dispatch => {
    dispatch({
      type: LOGIN_USER,
      payload: token
    });
  };
};

// Home Screen
export const startSearch = text => {
  return dispatch => {
    dispatch({
      type: USER_SEARCH,
      payload: text
    });
  };
};

export const updateData = data => {
  return dispatch => {
    dispatch({
      type: UPDATE_DATA,
      payload: data
    });
  };
};

export const updateToken = data => {
  return dispatch => {
    dispatch({
      type: UPDATE_TOKEN,
      payload: data
    });
  };
};

export const stepChange = step => {
  return dispatch => {
    dispatch({
      type: STEP_CHANGE,
      payload: step
    });
  };
};

// Setting Screen
export const distanceChange = value => {
  return dispatch => {
    dispatch({
      type: DISTANCE_CHANGE,
      payload: value
    });
  };
};

export const offerChange = value => {
  return dispatch => {
    dispatch({
      type: OFFER_CHANGE,
      payload: value
    });
  };
};

export const sortByChage = value => {
  return dispatch => {
    dispatch({
      type: SORT_BY_CHANGE,
      payload: value
    });
  };
};

export const categoryEnable = (enable, value) => {
  return dispatch => {
    dispatch({
      type: CATEGORY_ENABLE,
      enable: enable,
      payload: value
    });
  };
};

export const getCategory = () => {
  return dispatch => {
    fetch(
      "https://www.yelp.com/developers/documentation/v3/all_category_list/categories.json"
    )
      .then(resp => resp.json())
      .then(json => {
        dispatch({
          type: GET_CATEGORY,
          payload: json
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
};
