/** @format */

import { injectEndpoints } from "../base/base";
import { Endpoints } from "../base/service";

const authEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<GeneralResponse, any>({
      query: (body) => ({
        body,
        method: "POST",
        url: `${Endpoints.api}auth/login`,
      }),
    }),
    signUp: builder.mutation<GeneralResponse, any>({
      query: (body) => ({
        body,
        method: "POST",
        url: `${Endpoints.api}auth/register`,
      }),
    }),

    verifyOtp: builder.mutation<GeneralResponse, any>({
      query: (body) => ({
        body,
        method: "POST",
        url: `${Endpoints.api}auth/register/verify`,
      }),
    }),
    resendOtp: builder.mutation<GeneralResponse, any>({
      query: (body) => ({
        body,
        method: "POST",
        url: `${Endpoints.api}auth/register/resend-otp`,
      }),
    }),
    forgotPassword: builder.mutation<GeneralResponse, any>({
      query: (body) => ({
        body,
        method: "POST",
        url: `${Endpoints.api}auth/forgot-password`,
      }),
    }),
    verifyForgetPassword: builder.mutation<GeneralResponse, any>({
      query: (body) => ({
        body,
        method: "POST",
        url: `${Endpoints.api}auth/forgot-password/verify`,
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

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetUsersMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useVerifyForgetPasswordMutation,
} = authEndpoints;
