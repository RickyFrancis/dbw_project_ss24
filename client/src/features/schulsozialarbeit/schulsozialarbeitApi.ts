// src/features/schulsozialarbeit/schulsozialarbeitApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { logout } from '../auth/authSlice';
import { SchulsozialarbeitApiResponse } from '../../types';
import { setSchulsozialarbeit } from './schulsozialarbeitSlice';

export const schulsozialarbeitApi = createApi({
  reducerPath: 'schulsozialarbeitApi',
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
    getSchulsozialarbeit: builder.query<
      SchulsozialarbeitApiResponse,
      { BEZEICHNUNG?: string; STRASSE?: string }
    >({
      query: (params) => ({
        url: 'api/schulsozialarbeit',
        params: params, // You can pass multiple parameters here
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSchulsozialarbeit(data.data)); // Assuming `data` is the correct shape
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
    getReverseGeocode: builder.query<any, { lat: number; lon: number }>({
      query: ({ lat, lon }) => ({
        url: `https://nominatim.openstreetmap.org/reverse`,
        params: {
          lat,
          lon,
          format: 'json',
          polygon_svg: 1,
        },
      }),
    }),
  }),
});

export const { useGetSchulsozialarbeitQuery, useGetReverseGeocodeQuery } =
  schulsozialarbeitApi;
