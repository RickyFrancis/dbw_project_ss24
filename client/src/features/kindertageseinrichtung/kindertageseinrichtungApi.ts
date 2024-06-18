// src/features/kindertageseinrichtung/kindertageseinrichtungApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { logout } from '../auth/authSlice';
import { KindertageseinrichtungApiResponse } from '../../types';
import { setKindertageseinrichtung } from './kindertageseinrichtungSlice';
import { BASE_API_URI } from '../../constants/appConstants';

export const kindertageseinrichtungApi = createApi({
  reducerPath: 'kindertageseinrichtungApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URI,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getKindertageseinrichtung: builder.query<
      KindertageseinrichtungApiResponse,
      void
    >({
      query: () => ({
        url: 'api/kindertageseinrichtung',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setKindertageseinrichtung(data.data)); // Assuming `data` is the correct shape
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

export const { useGetKindertageseinrichtungQuery, useGetReverseGeocodeQuery } =
  kindertageseinrichtungApi;
