/** @format */

import { ShortletDataResponse } from "@/types/type";
import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";
import { buildQueryString } from "@/_shared/constants";

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
  }),
});
export const {
  useGetGuestShortletMutation,
  useGetSingleGuestShortletMutation,
} = authEndpoints;
