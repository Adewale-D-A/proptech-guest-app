/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AuthType = {
  user: any;
  token: any;
  isAuthenticated: boolean;
};

const initialState: AuthType = {
  user: "",
  token: "",
  isAuthenticated: false,
};
const AUTH_KEY = "auth";
// auth slice
const authSlice = createSlice({
  name: AUTH_KEY,
  initialState,
  reducers: {
    setUserDetails: (state, { payload: user }: PayloadAction<any>) => {
      state.user = user;
    },
    setUserToken: (
      state,
      { payload: token }: PayloadAction<string | undefined>
    ) => {
      state.token = token;
      state.isAuthenticated = true;
    },
  },
});

const { actions, reducer } = authSlice;
export const { setUserDetails, setUserToken } = actions;

// selector to select user details from the store
export const selectCurrentUser = (state: RootState) => state.auth.token;
// export const selectToken = (state: RootState) => state.auth.token;

export default reducer;
