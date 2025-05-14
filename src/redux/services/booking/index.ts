/** @format */

import {
  Booking,
  BookingStats,
  ShortletDataResponse,
  VisitorResponse,
} from "@/types/type";
import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";
import { BookingsResponseData } from "@/types/book";

const bookingEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<CreateBookingResponse, any>({
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
        url: `${Endpoints.api}guest/shortlet/get-fees`,
      }),
    }),
    getRoomOptions: builder.query<any, void>({
      query: () => ({
        method: Methods.get,
        url: `${Endpoints.api}guest/room-option`,
      }),
    }),
    getBookings: builder.query<BookingsResponseData, Record<string, any>>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.keys(params).forEach((key) => {
          if (params[key]) {
            searchParams.append(key, params[key]);
          }
        });
        return {
          method: Methods.get,
          url: `${Endpoints.api}user/booking?${searchParams.toString()}`,
        };
      },
    }),
    getSingleBookings: builder.query<ShortletDataResponse, number>({
      query: (id) => ({
        method: Methods.get,
        url: `${Endpoints.api}user/booking/${id}`,
      }),
    }),
    getUserActiveBookings: builder.query<any, number>({
      query: (user_id) => ({
        method: Methods.get,
        url: `${Endpoints.api}user/booking/active/${user_id}`,
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
    verifyPayment: builder.query<Booking, string>({
      query: (reference) => ({
        method: Methods.get,
        url: `${Endpoints.api}user/booking/verify-booking-payment?reference=${reference}`,
      }),
    }),
     verifyAdditionalServicesPayment: builder.query<GeneralResponse, string>({
      query: (reference) => ({
        method: Methods.get,
        url: `${Endpoints.api}user/additional-service/verify-payment?reference=${reference}`,
      }),
    }),
    cautionFeeBooking: builder.mutation<any, any>({
      query: (body) => ({
        body,
        method: Methods.post,
        url: `${Endpoints.api}user/booking/caution-fee-refund`,
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingPriceMutation,
  useGetBookingsQuery,
  useGetBookingStatsQuery,
  useGetRoomOptionsQuery,
  useGenerateCodeMutation,
  useRescheduleBookingMutation,
  useGetSingleBookingsQuery,
  useCreateRatingMutation,
  useTransferBookingMutation,
  useVerifyPaymentQuery,
  useVerifyAdditionalServicesPaymentQuery,
  useCautionFeeBookingMutation,
  useGetUserActiveBookingsQuery,
} = bookingEndpoints;
