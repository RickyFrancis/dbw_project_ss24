// src/app/store.ts

import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

// Import APIs
import { authApi } from '../features/auth/authApi';
import { userApi } from '../features/user/userApi';
import { schuleApi } from '../features/schule/schuleApi';
import { schulsozialarbeitApi } from '../features/schulsozialarbeit/schulsozialarbeitApi';
import { kindertageseinrichtungApi } from '../features/kindertageseinrichtung/kindertageseinrichtungApi';
import { jugendberufshilfeApi } from '../features/jugendberufshilfe/jugendberufshilfeApi';

// Import Reducers
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import schuleReducer from '../features/schule/schuleSlice';
import schulsozialarbeitReducer from '../features/schulsozialarbeit/schulsozialarbeitSlice';
import jugendberufshilfeSlice from '../features/jugendberufshilfe/jugendberufshilfeSlice';
import kindertageseinrichtungSlice from '../features/kindertageseinrichtung/kindertageseinrichtungSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [schuleApi.reducerPath]: schuleApi.reducer,
    [schulsozialarbeitApi.reducerPath]: schulsozialarbeitApi.reducer,
    [jugendberufshilfeApi.reducerPath]: jugendberufshilfeApi.reducer,
    [kindertageseinrichtungApi.reducerPath]: kindertageseinrichtungApi.reducer,
    auth: authReducer,
    user: userReducer,
    schule: schuleReducer,
    schulsozialarbeit: schulsozialarbeitReducer,
    jugendberufshilfe: jugendberufshilfeSlice,
    kindertageseinrichtung: kindertageseinrichtungSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(schuleApi.middleware)
      .concat(schulsozialarbeitApi.middleware)
      .concat(jugendberufshilfeApi.middleware)
      .concat(kindertageseinrichtungApi.middleware),
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
