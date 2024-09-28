/** @format */

import { BookingStats, VisitorResponse } from "@/types/type";
import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";
import { BookingsResponseData } from "@/types/book";

const bookingEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<GeneralResponse, any>({
      query: (body) => ({
        body,
        method: "POST",
        url: `${Endpoints.api}user/booking`,
      }),
    }),
    getBookingPrice: builder.mutation<GetFeeResponseData, any>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}user/booking/get-fees`,
      }),
    }),

    getBookings: builder.query<BookingsResponseData, void>({
      query: () => ({
        method: Methods.get,
        url: `${Endpoints.api}user/booking`,
      }),
    }),
    getBookingStats: builder.query<BookingStats, void>({
      query: () => ({
        method: Methods.get,
        url: `${Endpoints.api}user/booking/metrics`,
      }),
    }),
    generateCode: builder.mutation<
      VisitorResponse,
      { name: string; booking_id: number }
    >({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}user/booking/visitor-code`,
      }),
    }),
   
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingPriceMutation,
  useGetBookingsQuery,
  useGetBookingStatsQuery,
  useGenerateCodeMutation,
} = bookingEndpoints;
