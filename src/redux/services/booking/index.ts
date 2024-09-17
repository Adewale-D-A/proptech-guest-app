/** @format */

import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";

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
  }),
});

export const { useCreateBookingMutation, useGetBookingPriceMutation } =
  bookingEndpoints;
