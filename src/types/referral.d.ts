/** @format */

interface ReferredUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  profile_photo: string | null;
  dob: string | null;
  gender: string | null;
  identity_verification_document: string | null;
  identity_verification_status: string;
  has_set_password: number;
  identity_verified: number;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  stripe_id: string | null;
  pm_type: string | null;
  pm_last_four: string | null;
  trial_ends_at: string | null;
  delete_reason: string | null;
  referral_code: string;
  referred_by: string | null;
}

interface Referral {
  id: number;
  user_id: number;
  referred_user: ReferredUser;
  referral_code: string;
  created_at: string;
  updated_at: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface ReferralResponseData {
  current_page: number;
  data: Referral[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface ReferralResponse {
  error: boolean;
  message: string;
  data: ReferralResponseData;
}
