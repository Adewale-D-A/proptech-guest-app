/** @format */

import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";

const authEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponseData, any>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}auth/login`,
      }),
    }),
    signUp: builder.mutation<AuthResponseData, any>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}auth/register`,
      }),
    }),

    verifyOtp: builder.mutation<AuthResponseData, any>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}auth/register/verify`,
      }),
    }),
    resendOtp: builder.mutation<AuthResponseData, any>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}auth/register/resend-otp`,
      }),
    }),
    forgotPassword: builder.mutation<AuthResponseData, any>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}auth/forgot-password`,
      }),
    }),
    verifyForgetPassword: builder.mutation<AuthResponseData, any>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}auth/forgot-password/verify`,
      }),
    }),
    getUsers: builder.mutation<any[], void>({
      query: (body) => ({
        body,
        method: Methods.get,
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
