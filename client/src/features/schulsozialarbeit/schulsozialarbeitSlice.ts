// src/features/schulsozialarbeit/schulsozialarbeitSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Schulsozialarbeit, SchulsozialarbeitApiResponse } from '../../types';

interface SchulsozialarbeitState {
  data: SchulsozialarbeitApiResponse; // Assume this is appropriately defined elsewhere
  schulsozialarbeit: Schulsozialarbeit[] | null; // Define the schulsozialarbeit property correctly
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SchulsozialarbeitState = {
  data: { data: [] }, // Default empty data setup
  schulsozialarbeit: null, // Default the schulsozialarbeit to null
  status: 'idle',
};

const schulsozialarbeitSlice = createSlice({
  name: 'schulsozialarbeit',
  initialState,
  reducers: {
    setSchulsozialarbeit: (
      state,
      action: PayloadAction<Schulsozialarbeit[]>
    ) => {
      state.schulsozialarbeit = action.payload;
      state.status = 'idle';
    },
    resetSchulsozialarbeit: (state) => {
      state.schulsozialarbeit = null;
      state.status = 'idle';
    },
    setStatus: (
      state,
      action: PayloadAction<'idle' | 'loading' | 'failed'>
    ) => {
      state.status = action.payload;
    },
  },
});

export const { setSchulsozialarbeit, resetSchulsozialarbeit, setStatus } =
  schulsozialarbeitSlice.actions;
export const selectSchulsozialarbeit = (state: RootState) =>
  state.schulsozialarbeit.schulsozialarbeit;
export const selectSchulsozialarbeitStatus = (state: RootState) =>
  state.schulsozialarbeit.status;

export default schulsozialarbeitSlice.reducer;
