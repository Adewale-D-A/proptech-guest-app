/** @format */

import { combineReducers } from "redux";
import { apiReducer, apiReducerPath } from "../services/base/base";
import AuthReducer from "../slices/authSlice";

export default combineReducers({
  [apiReducerPath]: apiReducer,
  authSlice: AuthReducer,
});
