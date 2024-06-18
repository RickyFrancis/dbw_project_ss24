// src/features/auth/authApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RegistrationRequest, RegistrationResponse } from '../../types';

interface LoginResponse {
  name: string;
  email: string;
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: (registrationData) => ({
        url: 'user',
        method: 'POST',
        body: registrationData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
