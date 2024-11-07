/** @format */

import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";

const BanksEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    verifyBank: builder.mutation<BankVerify, any>({
      query: (body) => ({
        body,
        method: "POST",
        url: `${Endpoints.api}user/booking/verify-bank-account`,
      }),
    }),
    getBanks: builder.query<BanksResponse, any>({
      query: () => ({
        method: Methods.get,
        url: `${Endpoints.api}user/booking/banks`,
      }),
    }),
  }),
});

export const { useVerifyBankMutation, useGetBanksQuery } = BanksEndpoints;
