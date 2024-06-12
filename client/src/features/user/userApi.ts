// src/features/user/userApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { logout } from '../auth/authSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
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
    getUser: builder.query<any, void>({
      // Replace 'any' with the appropriate type for your user data
      query: () => 'api/user',
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err: unknown) {
          const error = err as {
            error: { status: number; data: { message: string } };
          };

          if (error.error.status === 401) {
            // Check if the status code is 401
            dispatch(logout()); // Dispatch the logout action
          }
        }
      },
    }),
    updateUser: builder.mutation<any, Partial<any>>({
      // Replace 'any' with specific types for better type safety
      query: (userData) => ({
        url: 'api/user',
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
