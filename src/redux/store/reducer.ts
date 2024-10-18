/** @format */

import { combineReducers } from "redux";
import { apiReducer, apiReducerPath } from "../services/base/base";
import AuthReducer from "../slices/authSlice";
import EmailReducer from "../slices/emailSlice";
import ApartmentReducer from "../slices/apt";
import ActiveTabReducer from "../slices/active_tab";
export default combineReducers({
  [apiReducerPath]: apiReducer,
  auth: AuthReducer,
  "auth-email": EmailReducer,
  apt: ApartmentReducer,
  tab: ActiveTabReducer,
});
