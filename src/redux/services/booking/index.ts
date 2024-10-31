/** @format */

import {
  BookingStats,
  ShortletDataResponse,
  VisitorResponse,
} from "@/types/type";
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
    getBookings: builder.query<
      BookingsResponseData,
      { start_date?: string; end_date?: string; search?: string }
    >({
      query: (params) => {
        const { start_date, end_date, search } = params;
        const queryParams = new URLSearchParams();
        if (start_date) queryParams.append("start_date", start_date);
        if (end_date) queryParams.append("end_date", end_date);
        if (search) queryParams.append("search", search);

        return {
          method: Methods.get,
          url: `${Endpoints.api}user/booking?${queryParams.toString()}`,
        };
      },
    }),
    getSingleBookings: builder.query<ShortletDataResponse, string>({
      query: (id) => ({
        method: Methods.get,
        url: `${Endpoints.api}user/booking/${id}`,
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
    rescheduleBooking: builder.mutation<GeneralResponse, any>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}user/booking/reschedule`,
      }),
    }),
    createRating: builder.mutation<any, RatingPayload>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}user/booking/rate`,
      }),
    }),
    transferBooking: builder.mutation<any, TransferPayload>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}user/booking/transfer`,
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
  useRescheduleBookingMutation,
  useGetSingleBookingsQuery,
  useCreateRatingMutation,
  useTransferBookingMutation,
} = bookingEndpoints;
