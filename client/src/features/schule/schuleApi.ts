// src/features/schule/schuleApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { logout } from '../auth/authSlice';
import { SchuleApiResponse } from '../../types';
import { setSchule } from './schuleSlice';

export const schuleApi = createApi({
  reducerPath: 'schuleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSchule: builder.query<
      SchuleApiResponse,
      { BEZEICHNUNG?: string; STRASSE?: string }
    >({
      query: (params) => ({
        url: 'api/schule',
        params: params, // You can pass multiple parameters here
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSchule(data.data)); // Assuming `data` is the correct shape
        } catch (err: unknown) {
          const error = err as {
            error: { status: number; data: { message: string } };
          };
          if (error.error.status === 401) {
            dispatch(logout());
          }
        }
      },
    }),
  }),
});

export const { useGetSchuleQuery } = schuleApi;
