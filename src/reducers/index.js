import { combineReducers } from "redux";
import NavReducer from "./NavReducer";
import QueryReducer from "./QueryReducer";
import SettingReducer from "./SettingReducer";

export default combineReducers({
  nav: NavReducer,
  query: QueryReducer,
  settings: SettingReducer
});
