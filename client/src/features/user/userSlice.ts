// src/features/user/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface UserState {
  user: {
    name?: string;
    email?: string;
  } | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  user: null,
  status: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.user = action.payload;
      state.status = 'idle';
    },
    resetUser: (state) => {
      state.user = null;
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

export const { setUser, resetUser, setStatus } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
