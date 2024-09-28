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
    verifyForgetPassword: builder.mutation<AuthVerifyOtpData, any>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}auth/forgot-password/verify`,
      }),
    }),
    resetPassword: builder.mutation<any, any>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}auth/reset-password`,
      }),
    }),
    getUsers: builder.query<User, void>({
      query: () => ({
        method: Methods.get,
        url: `${Endpoints.api}user/user`,
      }),
    }),
    updateUser: builder.mutation<any, UpdateUserPayload>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}user/user`,
      }),
    }),
    updateUserDocs: builder.mutation<any, UpdateUserDocPayload>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}user/user/upload-identity-document`,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetUsersQuery,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useVerifyForgetPasswordMutation,
  useUpdateUserMutation,
  useUpdateUserDocsMutation,
  useResetPasswordMutation,
} = authEndpoints;
