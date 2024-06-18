// src/features/kindertageseinrichtung/kindertageseinrichtungSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  Kindertageseinrichtung,
  KindertageseinrichtungApiResponse,
} from '../../types';

interface KindertageseinrichtungState {
  data: KindertageseinrichtungApiResponse; // Assume this is appropriately defined elsewhere
  kindertageseinrichtung: Kindertageseinrichtung[] | null; // Define the kindertageseinrichtung property correctly
  status: 'idle' | 'loading' | 'failed';
}

const initialState: KindertageseinrichtungState = {
  data: { data: [] }, // Default empty data setup
  kindertageseinrichtung: null, // Default the kindertageseinrichtung to null
  status: 'idle',
};

const kindertageseinrichtungSlice = createSlice({
  name: 'kindertageseinrichtung',
  initialState,
  reducers: {
    setKindertageseinrichtung: (
      state,
      action: PayloadAction<Kindertageseinrichtung[]>
    ) => {
      state.kindertageseinrichtung = action.payload;
      state.status = 'idle';
    },
    resetKindertageseinrichtung: (state) => {
      state.kindertageseinrichtung = null;
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

export const {
  setKindertageseinrichtung,
  resetKindertageseinrichtung,
  setStatus,
} = kindertageseinrichtungSlice.actions;
export const selectKindertageseinrichtung = (state: RootState) =>
  state.kindertageseinrichtung.kindertageseinrichtung;
export const selectKindertageseinrichtungStatus = (state: RootState) =>
  state.kindertageseinrichtung.status;

export default kindertageseinrichtungSlice.reducer;
