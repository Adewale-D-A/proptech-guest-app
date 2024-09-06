/** @format */

import { injectEndpoints } from "../base/base";
import { Endpoints } from "../base/service";

const authEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<{ data: any }, any>({
      query: (body) => ({
        body,
        method: "POST",
        url: `${Endpoints.api}signin`,
      }),
    }),
    signUp: builder.mutation<void, any>({
      query: (body) => ({
        body,
        method: "POST",
        url: `${Endpoints.api}signup`,
      }),
    }),
    getUsers: builder.mutation<any[], void>({
      query: (body) => ({
        body,
        method: "GET",
        url: `${Endpoints.api}`,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useGetUsersMutation } =
  authEndpoints;
