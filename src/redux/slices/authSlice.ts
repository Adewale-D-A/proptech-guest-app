/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AuthType = {
  user: User | null;
  token: string | undefined;
  isAuthenticated: boolean;
};

const initialState: AuthType = {
  user: null,
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
    logout: (state) => {
      state.user = null;
      state.token = "";
      state.isAuthenticated = false;
    },
  },
});

const { actions, reducer } = authSlice;
export const { setUserDetails, setUserToken, logout } = actions;

// selector to select user details from the store
export const selectUserToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export default reducer;
