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
    getRequest: builder.query<
      RequestResponseData,
      { start_date?: string; end_date?: string; search?: string }
    >({
      query: ({ start_date, end_date, search }) => {
        const params = new URLSearchParams();
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);
        if (search) params.append("search", search);

        return {
          method: Methods.get,
          url: `${Endpoints.api}user/request?${params.toString()}`,
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
      { start_date?: string; end_date?: string; search?: string }
    >({
      query: ({ start_date, end_date, search }) => {
        const params = new URLSearchParams();
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);
        if (search) params.append("search", search);

        return {
          method: Methods.get,
          url: `${Endpoints.api}user/additional-service?${params.toString()}`,
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
