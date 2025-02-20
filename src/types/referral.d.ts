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

interface ReBookType {
  handleRebook: () => void;
  reBookingLoading: boolean;
  handleDateSelect: (
    date: Date | undefined,
    setter: (date: string | undefined) => void
  ) => void;
  reBookEndDate: string | undefined;
  setReBookStartDate: (date: string | undefined) => void;
  setReBookEndDate: (date: string | undefined) => void;
  reBookStartDate: string | undefined;
  onClose: () => void;
  availableDates: any;
  handleEndDateSelect: (date: Date | undefined) => void;
  handleStartDateSelect: (date: Date | undefined) => void;
  minCheckoutDate: Date | undefined;
}

interface OfferResponse {
  error: boolean;
  message: string;
  data: {
    offer: {
      current_page: number;
      data: Offer[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: Link[];
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    };
  };
}

interface Offer {
  id: number;
  name: string;
  slug: string;
  offer_id: string;
  image: string;
  start_date: string;
  end_date: string;
  applicable_to: string;
  type: string;
  applicable_shortlets: string;
  minimum_number_of_nights: number;
  maximum_number_of_nights: number;
  price: number;
  currency: string;
  percentage: number | null;
  short_description: string;
  description: string;
  conditions: string;
  benefits: string;
  is_active: number;
  is_deleted: number;
  created_at: string;
  updated_at: string | null;
}

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}
