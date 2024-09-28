/** @format */

import { RequestResponseData, UserRequestBreakdown } from "@/types/type";
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
        url: `${Endpoints.api}user/request/breakdown`,
      }),
    }),
  }),
});

export const { useGetRequestStatsQuery, useGetRequestQuery } = requestEndpoints;
