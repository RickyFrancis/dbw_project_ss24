// src/app/store.ts

import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

// Import APIs
import { authApi } from '../features/auth/authApi';
import { userApi } from '../features/user/userApi';
import { schuleApi } from '../features/schule/schuleApi';

// Import Reducers
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import schuleReducer from '../features/schule/schuleSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [schuleApi.reducerPath]: schuleApi.reducer,
    auth: authReducer,
    user: userReducer,
    schule: schuleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(schuleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define the AppThunk type specifically for thunk actions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
