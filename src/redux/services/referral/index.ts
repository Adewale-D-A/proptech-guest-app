/** @format */

import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";

const referralEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    getReferrals: builder.query<ReferralResponse, any>({
      query: () => ({
        method: Methods.get,
        url: `${Endpoints.api}user/referral`,
      }),
    }),
    generateReferralLink: builder.mutation<any, void>({
      query: () => ({
        method: Methods.post,
        url: `${Endpoints.api}user/referral/code`,
      }),
    }),
  }),
});
export const { useGetReferralsQuery, useGenerateReferralLinkMutation } =
  referralEndpoints;
