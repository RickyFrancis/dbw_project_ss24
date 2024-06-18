// src/features/jugendberufshilfe/jugendberufshilfeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Jugendberufshilfe, JugendberufshilfeApiResponse } from '../../types';

interface JugendberufshilfeState {
  data: JugendberufshilfeApiResponse; // Assume this is appropriately defined elsewhere
  jugendberufshilfe: Jugendberufshilfe[] | null; // Define the jugendberufshilfe property correctly
  status: 'idle' | 'loading' | 'failed';
}

const initialState: JugendberufshilfeState = {
  data: { data: [] }, // Default empty data setup
  jugendberufshilfe: null, // Default the jugendberufshilfe to null
  status: 'idle',
};

const jugendberufshilfeSlice = createSlice({
  name: 'jugendberufshilfe',
  initialState,
  reducers: {
    setJugendberufshilfe: (
      state,
      action: PayloadAction<Jugendberufshilfe[]>
    ) => {
      state.jugendberufshilfe = action.payload;
      state.status = 'idle';
    },
    resetJugendberufshilfe: (state) => {
      state.jugendberufshilfe = null;
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

export const { setJugendberufshilfe, resetJugendberufshilfe, setStatus } =
  jugendberufshilfeSlice.actions;
export const selectJugendberufshilfe = (state: RootState) =>
  state.jugendberufshilfe.jugendberufshilfe;
export const selectJugendberufshilfeStatus = (state: RootState) =>
  state.jugendberufshilfe.status;

export default jugendberufshilfeSlice.reducer;
