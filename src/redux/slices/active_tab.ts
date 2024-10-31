/** @format */

// store/slices/activeTabSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NavLink } from "@/types/type";

interface ActiveTabState {
  activeTab: NavLink | null;
}

const initialState: ActiveTabState = {
  activeTab: null,
};

const activeTabSlice = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<NavLink>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = activeTabSlice.actions;

export default activeTabSlice.reducer;

export const selectTab = (state: RootState) => state.tab.activeTab;
