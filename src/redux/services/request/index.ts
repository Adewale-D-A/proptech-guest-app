/** @format */

import {
  AdditionalRequestResponseData,
  CreateRequestBody,
  RequestResponseData,
  ServiceFeeResponse,
  ServiceRequest,
  ServiceTypesResponse,
  UserRequestBreakdown,
} from "@/types/type";
import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";

const requestEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    getRequestStats: builder.query<UserRequestBreakdown, void>({
      query: () => ({
        method: Methods.get,
        url: `${Endpoints.api}user/request/breakdown`,
      }),
    }),
    getAdditionalRequestStats: builder.query<UserRequestBreakdown, void>({
      query: () => ({
        method: Methods.get,
        url: `${Endpoints.api}user/additional-service/metrics`,
      }),
    }),
    getRequest: builder.query<RequestResponseData, Record<string, any>>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.keys(params).forEach((key) => {
          if (params[key]) {
            searchParams.append(key, params[key]);
          }
        });
        return {
          method: Methods.get,
          url: `${Endpoints.api}user/request?${searchParams.toString()}`,
        };
      },
    }),
    createRequest: builder.mutation<any, CreateRequestBody>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}user/request`,
      }),
    }),
    createAdditional: builder.mutation<any, ServiceRequest>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}user/additional-service`,
      }),
    }),
    getServiceType: builder.query<ServiceTypesResponse, void>({
      query: () => ({
        method: Methods.get,
        url: `${Endpoints.api}user/service-type`,
      }),
    }),
    requestFee: builder.mutation<ServiceFeeResponse, any>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}user/additional-service/get-fees`,
      }),
    }),
    getAdditionalRequest: builder.query<
      AdditionalRequestResponseData,
      Record<string, any>
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.keys(params).forEach((key) => {
          if (params[key]) {
            searchParams.append(key, params[key]);
          }
        });
        return {
          method: Methods.get,
          url: `${
            Endpoints.api
          }user/additional-service?${searchParams.toString()}`,
        };
      },
    }),
  }),
});

export const {
  useGetRequestStatsQuery,
  useGetAdditionalRequestStatsQuery,
  useGetRequestQuery,
  useCreateRequestMutation,
  useGetServiceTypeQuery,
  useCreateAdditionalMutation,
  useRequestFeeMutation,
  useGetAdditionalRequestQuery,
} = requestEndpoints;
