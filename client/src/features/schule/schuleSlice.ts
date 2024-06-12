// src/features/schule/schuleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Schule, SchuleApiResponse } from '../../types';

interface SchuleState {
  data: SchuleApiResponse; // Assume this is appropriately defined elsewhere
  schule: Schule[] | null; // Define the schule property correctly
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SchuleState = {
  data: { data: [] }, // Default empty data setup
  schule: null, // Default the schule to null
  status: 'idle',
};

const schuleSlice = createSlice({
  name: 'schule',
  initialState,
  reducers: {
    setSchule: (state, action: PayloadAction<Schule[]>) => {
      state.schule = action.payload;
      state.status = 'idle';
    },
    resetSchule: (state) => {
      state.schule = null;
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

export const { setSchule, resetSchule, setStatus } = schuleSlice.actions;
export const selectSchule = (state: RootState) => state.schule.schule;
export const selectSchuleStatus = (state: RootState) => state.schule.status;

export default schuleSlice.reducer;
