/** @format */

import {
  CreateRequestBody,
  RequestResponseData,
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
    getRequest: builder.query<RequestResponseData, void>({
      query: () => ({
        method: Methods.get,
        url: `${Endpoints.api}user/request`,
      }),
    }),
    createRequest: builder.mutation<any, CreateRequestBody>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}user/request`,
      }),
    }),
  }),
});

export const {
  useGetRequestStatsQuery,
  useGetRequestQuery,
  useCreateRequestMutation,
} = requestEndpoints;
