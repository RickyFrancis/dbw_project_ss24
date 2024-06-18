// src/features/user/userApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { logout } from '../auth/authSlice';
import { setUser } from './userSlice';
import { Address, DistanceCalculationData } from '../../types';

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
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
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
    deleteUser: builder.mutation<any, void>({
      // Replace 'any' with specific types for better type safety
      query: () => ({
        url: `api/user/`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (err: unknown) {
          console.error('Delete user failed:', err);
        }
      },
    }),
    addAddress: builder.mutation<any, Partial<any>>({
      // Replace 'any' with specific types for better type safety
      query: (addressData) => ({
        url: 'api/user/address',
        method: 'POST',
        body: addressData,
      }),
    }),
    editAddress: builder.mutation<
      any,
      { id: number; addressData: Partial<Address> }
    >({
      query: ({ id, addressData }) => ({
        url: `api/user/address/${id}`,
        method: 'PUT',
        body: addressData,
      }),
    }),
    getAddress: builder.query<any, { id: number }>({
      // Replace 'any' with specific types for better type safety
      query: ({ id }) => ({
        url: `api/user/address/${id}`,
        method: 'GET',
      }),
    }),
    toggleFavoriteJugend: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `api/user/toggle-favorite-jugend/${id}`,
        method: 'POST',
      }),
    }),
    toggleFavoriteSchule: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `api/user/toggle-favorite-schule/${id}`,
        method: 'POST',
      }),
    }),
    toggleFavoriteKinder: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `api/user/toggle-favorite-kinder/${id}`,
        method: 'POST',
      }),
    }),
    toggleFavoriteSchulsozialarbeit: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `api/user/toggle-favorite-sozial/${id}`,
        method: 'POST',
      }),
    }),
    deleteAddress: builder.mutation<any, { id: number }>({
      // Replace 'any' with specific types for better type safety
      query: ({ id }) => ({
        url: `api/user/address/${id}`,
        method: 'DELETE',
      }),
    }),
    getDistance: builder.mutation<any, DistanceCalculationData>({
      query: (coords) => ({
        url: '/api/user/get-distance/',
        method: 'POST',
        body: coords,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAddAddressMutation,
  useEditAddressMutation,
  useDeleteAddressMutation,
  useGetAddressQuery,
  useToggleFavoriteJugendMutation,
  useToggleFavoriteSchuleMutation,
  useToggleFavoriteKinderMutation,
  useToggleFavoriteSchulsozialarbeitMutation,
  useGetDistanceMutation,
} = userApi;
