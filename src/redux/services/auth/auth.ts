/** @format */

import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";
import { 
  AuthResponseData, 
  AuthVerifyOtpData, 
  User, 
  UpdateUserPayload, 
  UpdateUserDocPayload,
  GeneralResponse
} from "@/types/auth";

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
    resetPassword: builder.mutation<GeneralResponse, any>({
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
    updateUser: builder.mutation<GeneralResponse, UpdateUserPayload>({
      query: (body) => ({
        body,
        method: Methods.put,
        url: `${Endpoints.api}user/user`,
      }),
    }),
    updateUserDocs: builder.mutation<GeneralResponse, UpdateUserDocPayload>({
      query: (body) => {
        const formData = new FormData();
        if (body.identity_document) {
          formData.append('identity_document', body.identity_document);
        }
        return {
          body: formData,
          method: Methods.post,
          url: `${Endpoints.api}user/user/upload-identity-document`,
        };
      },
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
