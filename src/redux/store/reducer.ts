/** @format */

import { combineReducers } from "redux";
import { apiReducer, apiReducerPath } from "../services/base/base";
import AuthReducer from "../slices/authSlice";
import EmailReducer from "../slices/emailSlice";

export default combineReducers({
  [apiReducerPath]: apiReducer,
  auth: AuthReducer,
  "auth-email": EmailReducer,
});
