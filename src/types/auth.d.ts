/** @format */

export interface GeneralResponse {
  error: boolean;
  message: string;
}

export interface CreateBookingResponse extends GeneralResponse {
  data: {
    reference: string;
    payment: string;
  };
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  profile_photo: string;
  dob: string;
  gender: "Male" | "Female";
  identity_verification_document: string;
  identity_verification_status:
    | "submitted"
    | "pending"
    | "approved"
    | "rejected";
  has_set_password: boolean;
  identity_verified: boolean;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  stripe_id: string | null;
  pm_type: string | null;
  pm_last_four: string | null;
  trial_ends_at: string | null;
  referral_code: string;
}

export interface AuthResponseData extends GeneralResponse {
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
    user: User;
  };
}
export interface AuthVerifyOtpData extends GeneralResponse {
  data: {
    token: string;
  };
}

export interface GetFeeResponseData extends GeneralResponse {
  data: {
    base_cost: number;
    discount_amount: number;
    caution_fee: number;
    tax_fee: number;
    total_cost: number;
    referrer_id: number | null;
    coupon_id: number | null;
  };
}

export interface UpdateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  phone: string;
  dob: string | null;
}
export interface UpdateUserDocPayload {
  identity_document: File | null;
}

export interface GetFeesPayload {
  shortlet_id: number;
  check_in_day: string;
  check_out_day: string;
  check_in_time: string;
  check_out_time: string;
  number_of_guests: number;
  discount_code?: string;
}

export interface RatingPayload {
  booking_id: number;
  rating: number;
  review: string;
}

export interface TransferPayload {
  booking_id: number;
  email: string;
}
