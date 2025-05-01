/** @format */

import {
  ListedApartmentAvaliableType,
  ShortletDataResponse,
} from "@/types/type";
import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";
import { buildQueryString } from "@/_shared/constants";
import { GetAvailableDateResponse } from "@/types/book";

// First, define an interface for the params
interface ShortletParams extends Record<string, any> {
  page?: number;
  per_page?: number;
  // other possible filter params
  location?: string;
  room_option_id?: string;
}

const shortletEndPoint = injectEndpoints({
  endpoints: (builder) => ({
    getGuestShortlet: builder.mutation<
      ShortletDataResponse,
      ShortletParams
    >({
      query: (params) => {
        const queryString = buildQueryString({
          ...params,
          page: params.page || 1,
          per_page: params.per_page || 20
        });
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
    getGuestList: builder.query<
      ListedApartmentAvaliableType,
      Record<string, any>
    >({
      query: (params) => {
        const queryString = buildQueryString(params);
        return {
          method: Methods.get,
          url: `${Endpoints.api}guest/calendar/all?${queryString}`,
        };
      },
    }),
  }),
});
export const {
  useGetGuestShortletMutation,
  useGetSingleGuestShortletMutation,
  useGetAvailableDateMutation,
  useGetGuestListQuery,
} = shortletEndPoint;
