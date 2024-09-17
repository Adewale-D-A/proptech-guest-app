/** @format */

interface GeneralResponse {
  error: boolean;
  message: string;
  // data: AuthResponseData;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  profile_photo: string | null;
  stripe_id: string | null;
  dob: string | null;
  gender: string | null;
  email_verified_at: string | null;
  identity_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthResponseData extends GeneralResponse {
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
    user: User;
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
