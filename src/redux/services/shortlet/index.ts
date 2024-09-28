/** @format */

import { ShortletDataResponse } from "@/types/type";
import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";
import { buildQueryString } from "@/_shared/constants";
import { GetAvailableDateResponse } from "@/types/book";

const authEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    getGuestShortlet: builder.mutation<
      ShortletDataResponse,
      Record<string, any>
    >({
      query: (params) => {
        const queryString = buildQueryString(params);
        return {
          method: Methods.post,
          url: `${Endpoints.api}guest/shortlet/get-all?${queryString}`,
        };
      },
    }),
    getSingleGuestShortlet: builder.mutation<ShortletDataResponse, number>({
      query: (id) => ({
        method: Methods.get,
        url: `${Endpoints.api}guest/shortlet/${id}`,
      }),
    }),
    getAvailableDate: builder.mutation<GetAvailableDateResponse, number>({
      query: (id) => ({
        method: Methods.get,
        url: `${Endpoints.api}guest/calendar/${id}`,
      }),
    }),
  }),
});
export const {
  useGetGuestShortletMutation,
  useGetSingleGuestShortletMutation,
  useGetAvailableDateMutation,
} = authEndpoints;
