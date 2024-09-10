/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the email slice state
type EmailState = {
  email: string;
};

// Initial state for the email slice
const initialState: EmailState = {
  email: "",
};

// Create email slice
const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setEmail: (state, { payload: email }: PayloadAction<string>) => {
      state.email = email;
    },
    clearEmail: (state) => {
      state.email = ""; // Clear the email from the state
    },
  },
});

// Export actions and reducer
export const { setEmail, clearEmail } = emailSlice.actions;
export default emailSlice.reducer;

// Selector to get the email from the store
export const selectEmail = (state: RootState) => state["auth-email"].email;
