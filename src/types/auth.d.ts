/** @format */

interface GeneralResponse {
  error: boolean;
  message: string;
}

interface CreateBookingResponse extends GeneralResponse {
  data: {
    reference: string;
    payment: string;
  };
}

interface User {
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
}

interface AuthResponseData extends GeneralResponse {
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
    user: User;
  };
}
interface AuthVerifyOtpData extends GeneralResponse {
  data: {
    token: string;
  };
}

interface GetFeeResponseData extends GeneralResponse {
  data: {
    base_cost: number;
    caution_fee: number;
    tax_fee: number;
    total_cost: number;
  };
}

interface UpdateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  phone: string;
  dob: string | null;
}
interface UpdateUserDocPayload {
  identity_document: File | null;
}

interface RatingPayload {
  booking_id: number;
  rating: number;
  review: string;
}

interface TransferPayload {
  booking_id: number;
  email: string;
}
