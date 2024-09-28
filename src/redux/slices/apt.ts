/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ApartmentState {
  selectedApt: Booking | null;
}

const initialState: ApartmentState = {
  selectedApt: null,
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    setSelectedApt: (state, action: PayloadAction<any>) => {
      state.selectedApt = action.payload;
    },

    clearSelectedApt: (state) => {
      state.selectedApt = null;
    },
  },
});

export const { setSelectedApt, clearSelectedApt } = apartmentSlice.actions;

export default apartmentSlice.reducer;

export const selectApartment = (state: RootState) => state.apt.selectedApt;
