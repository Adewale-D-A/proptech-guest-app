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
  
    escalate: builder.mutation<any, { request_id: number; body: any }>({
      query: ({ request_id, body }) => ({
        url: `${Endpoints.api}user/request/escalate/${request_id}`,
        method: Methods.put,
        body,
      }),
    }),
    escalateAdditionalServices: builder.mutation<any, { additional_service_id: number; body: any }>({
      query: ({ additional_service_id, body }) => ({
        url: `${Endpoints.api}user/additional-service/escalate/${additional_service_id}`,
        method: Methods.put,
        body,
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
  useEscalateMutation,
  useEscalateAdditionalServicesMutation,
} = requestEndpoints;
