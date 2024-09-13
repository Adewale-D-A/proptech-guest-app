/** @format */

import { injectEndpoints } from "../base/base";
import { Endpoints } from "../base/service";

const bookingEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<GeneralResponse, any>({
      query: (body) => ({
        body,
        method: "POST",
        url: `${Endpoints.api}user/booking`,
      }),
    }),
  }),
});

export const { useCreateBookingMutation } = bookingEndpoints;
