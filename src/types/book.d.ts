/** @format */

interface Shortlet {
  id: number;
  name: string;
  slug: string;
  description: string;
  location: string;
  currency: string;
  price: number;
  caution_fee: number;
  tax_fee: number;
  no_of_bedrooms: number;
  no_of_bathrooms: number;
  min_guests: number | null;
  max_guests: number;
  point_of_interest: string;
  cancellation_policy: string;
  availability_status: string;
  created_at: string;
  updated_at: string;
  room_option_id: number;
  average_rating: number;
  amenities: Amenity[];
  images: Image[];
  rules: Rule[];
  room_option: RoomOption;
  extra_option_items: ExtraOptionItem[];
  safeties: Safety[];
}

/** @format */
type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type Booking = {
  id: number;
  booking_number: string;
  shortlet_id: number;
  user_id: number;
  check_in_date: string;
  check_in_time: string;
  check_out_date: string;
  check_out_time: string;
  base_price: number;
  base_price_NGN: number;
  caution_fee: number;
  caution_fee_NGN: number;
  channel: string;
  created_at: string;
  currency: string;
  discount_amount_NGN: number;
  discount_fee: number;
  exchange_rate: string;
  guest_breakdown: null | string;
  number_of_days: number;
  number_of_guests: number;
  payment_expires_at: string;
  payment_method: string;
  payment_status: string;
  promo_code: null | string;
  shortlet: Shortlet;
  status: string;
  tax_fee: number;
  tax_fee_NGN: number;
  total_price: number;
  total_price_NGN: number;
  updated_at: string;
  notes: null | string;
};

type BookingsResponse = {
  bookings: {
    current_page: number;
    data: Booking[];
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
  };
};

type BookingsResponseData = {
  data: BookingsResponse;
  error: boolean;
  message: string;
};

export interface GetAvailableDateResponse extends GeneralResponseStatus {
  data: {
    booked_dates: string[];
    blocked_dates: string[];
  };
}

export type BookingsInterface = {
  bookingData: BookingsResponse | null;
  isLoading: boolean;
  statsLoading: boolean;
  statsData: BookingData | null;
  setSearch: (value: string) => void;
  setStartDate: (date: string | undefined) => void;
  setEndDate: (date: string | undefined) => void;
  endDate: string | undefined;
  startDate: string | undefined;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  totalPages?: number;
  setPageSize?: (index: number) => void;
  banksData: Bank[];
};
