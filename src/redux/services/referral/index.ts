/** @format */

import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";
import { 
  ReferralQueryParams, 
  ReferralCodeResponse, 
  UpdateReferralCodePayload, 
  UpdateReferralCodeResponse,
  ReferralResponse,
  OfferResponse
} from "@/types/referral";

const referralEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    getReferrals: builder.query<ReferralResponse, ReferralQueryParams>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        // Add parameters to search params if they exist
        if (params.page) searchParams.append("page", params.page.toString());
        if (params.limit) searchParams.append("limit", params.limit.toString());
        if (params.sort) searchParams.append("sort", params.sort);
        if (params.start_date) searchParams.append("start_date", params.start_date);
        if (params.end_date) searchParams.append("end_date", params.end_date);
        if (params.search) searchParams.append("search", params.search);

        const queryString = searchParams.toString();
        
        return {
          method: Methods.get,
          url: `${Endpoints.api}user/referral/${queryString ? `?${queryString}` : ""}`,
        };
      },
    }),
    generateReferralCode: builder.mutation<ReferralCodeResponse, void>({
      query: () => ({
        method: Methods.post,
        url: `${Endpoints.api}user/referral/code`,
      }),
    }),
    updateReferralCode: builder.mutation<UpdateReferralCodeResponse, UpdateReferralCodePayload>({
      query: (body) => ({
        body,
        method: Methods.put,
        url: `${Endpoints.api}user/referral`,
      }),
    }),
    getPromo: builder.query<OfferResponse, any>({
      query: () => ({
        method: Methods.get,
        url: `${Endpoints.api}user/offer`,
      }),
    }),
  }),
});

export const {
  useGetReferralsQuery,
  useGenerateReferralCodeMutation,
  useUpdateReferralCodeMutation,
  useGetPromoQuery,
} = referralEndpoints;
