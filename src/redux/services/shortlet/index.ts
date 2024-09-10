/** @format */

import { ShortletDataResponse } from "@/types/type";
import { injectEndpoints } from "../base/base";
import { Endpoints } from "../base/service";

const authEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    getGuestShortlet: builder.mutation<ShortletDataResponse, any>({
      query: (body) => ({
        body,
        method: "POST",
        url: `${Endpoints.api}guest/shortlet/get-all`,
      }),
    }),
    getSingleGuestShortlet: builder.mutation<ShortletDataResponse, number>({
      query: (id) => ({
        method: "GET",
        url: `${Endpoints.api}guest/shortlet/${id}`,
      }),
    }),
  }),
});
export const {
  useGetGuestShortletMutation,
  useGetSingleGuestShortletMutation,
} = authEndpoints;
