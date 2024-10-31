/** @format */

export interface CommonProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

interface GeneralResponseStatus {
  error: boolean;
  message: string;
}

export interface ShortletType {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  shortletData: Shortlet[];
  isLoading?: boolean;
  setFilters?: Dispatch<SetStateAction<any>>;
}
export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
export interface NavLink {
  id: string;
  title: string;
  href: string;
  icon?: JSX.Element;
}
interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
  handleTextareaKeyDown: (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => void;
  handleSendMessage: () => void;
  showEmoji: boolean;
  emojiPickerRef: RefObject<HTMLDivElement>;
  handleEmojiSelect: (emoji: any) => void;
  setShowEmoji: (show: boolean) => void;
  emojiIconRef: RefObject<HTMLDivElement>;
  handleMenuClicked: () => void;
  showMenu: boolean;
}

interface ToastResponse {
  data: {
    message?: string;
  };
}

interface ShortletDataResponse extends GeneralResponseStatus {
  data: ShortletData;
}

interface ShortletData {
  bookings?: Booking;
  shortlet: ShortletPage;
}

interface ShortletPage {
  current_page: number;
  data: Shortlet[];
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

interface Amenity {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  ordering_position: number;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

interface Image {
  id: number;
  shortlet_id: number;
  path: string;
  ordering_position: number | null;
  created_at: string;
  updated_at: string;
}

interface Rule {
  id: number;
  name: string;
  slug: string;
  ordering_position: number;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

interface RoomOption {
  id: number;
  name: string;
  number_of_rooms: number | null;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface ExtraOptionItem {
  id: number;
  extra_option_id: number;
  name: string;
  slug: string;
  description: string | null;
  ordering_position: number;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
  extra_option: ExtraOption;
}

interface ExtraOption {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  ordering_position: number;
  created_at: string;
  updated_at: string;
}

interface Safety {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  ordering_position: number;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

interface Pivot {
  shortlet_id: number;
  [key: string]: number;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
interface ImageType {
  path: string;
}

interface NotificationData {
  id: number;
  user_id: number;
  title: string;
  message: string;
  is_read: boolean;
  type: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface NotificationsResponse {
  message: string;
  data: {
    current_page: number;
    data: NotificationData[];
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
}
interface Booking {
  id: number;
  booking_number: string;
  shortlet_id: number;
  user_id: number;
  check_in_date: string;
  check_out_date: string;
  check_in_time: string;
  check_out_time: string;
  number_of_days: number;
  number_of_guests: number;
  guest_breakdown: string | null;
  currency: string;
  caution_fee: number;
  tax_fee: number;
  base_price: number;
  discount_fee: number;
  total_price: number;
  exchange_rate: string;
  caution_fee_NGN: number;
  tax_fee_NGN: number;
  base_price_NGN: number;
  discount_amount_NGN: number;
  total_price_NGN: number;
  status: string;
  payment_status: string;
  payment_method: string;
  promo_code: string | null;
  notes: string | null;
  channel: string;
  payment_expires_at: string;
  created_at: string;

  transferred_from?: string;
  transferred_to?: string;
  visitor_code?: string;
  account_name?: string;
  updated_at: string;
  bank_name?: string;
  has_requested_refund?: number;
  shortlet: Shortlet;
}
interface UserRequestBreakdown {
  message: string;
  data: {
    pending: number;
    cancelled: number;
    completed: number;
    total: number;
  };
}

interface UserRequest {
  id: number;
  request_id: string | null;
  service_type_id: number;
  user_id: number;
  booking_id: number;
  currency: string;
  amount_charged: string;
  amount_charged_NGN: string;
  amount_paid: string | null;
  amount_paid_NGN: string | null;
  quantity: number;
  request_date: string;
  is_escalated: number;
  escalation_reason: string | null;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  booking: Booking;
  service_type: ServiceType;
  shortlet: Shortlet;
  name: string;
  subject: string;
  payment_status: string;
}

interface UserRequestsResponse extends PaginationLink {
  current_page: number;
  data: UserRequest[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface RequestResponseData {
  message: string;
  data: {
    user_requests: UserRequestsResponse;
  };
}

interface AdditionalRequestResponseData {
  message: string;
  data: {
    additional_service: UserRequestsResponse;
  };
}

interface BookingData {
  total_bookings: number;
  active_bookings: number;
  total_booking_cost: number;
  total_duration: number;
}

interface BookingStats extends GeneralResponseStatus {
  data: BookingData;
}
interface VisitorResponse extends GeneralResponseStatus {
  data: {
    visitor_code: string;
  };
}

export type ApartmentOption = {
  id: string;
  name: string;
};
interface CreateRequestBody {
  shortlet_id: number;
  subject: string;
  description: string;
}
interface FilterDateComponentProps {
  startDate: string | undefined;
  endDate: string | undefined;
  handleDateSelect: (
    date: Date | undefined,
    setter: (date: string | undefined) => void
  ) => void;
  handleCancel: () => void;
  handleApply: () => void;
  setStartDate: (date: string | undefined) => void;
  setEndDate: (date: string | undefined) => void;
}

interface ServiceRequest {
  shortlet_id: number;
  service_type_id: number;
  quantity: number;
  request_date: string;
  description: string;
  callback_url: string;
  payment_method: string;
}

interface ServiceType {
  id: number;
  name: string;
  slug: string;
  description: string;
  currency: string;
}

interface ServiceTypesResponse extends GeneralResponseStatus {
  data: {
    serviceTypes: {
      current_page: number;
      data: ServiceType[];
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
}
interface ServiceFeeResponse extends GeneralResponseStatus {
  data: {
    currency: string;
    quantity: string;
    cost: number;
  };
}

interface PaginationTableProps {
  pageSize: number;
  pageIndex: number;
  setPageIndex: (index: number) => void;
  totalItemsCount: number;
  handleOnChange: (index: number) => void;
  setPageSize?: (val: number) => void;
}
interface ButtonPaginationProps {
  children: React.ReactNode;
  index: number;
  setPageIndex: (index: number) => void;
  pageIndex: number;
  handleOnChange: (index: number) => void;
}

interface Pagination {
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  totalPages?: number;
  setPageSize?: (index: number) => void;
}

interface AdditionalServicesComponentProps extends Pagination {
  requestDataStats: UserRequestBreakdown | undefined;
  requestData: UserRequestsResponse | undefined;
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  endDate: string | undefined;
  startDate: string | undefined;
}

interface MakeARequestResponseData extends Pagination {
  requestDataStats: UserRequestBreakdown | undefined;
  requestData: UserRequestsResponse | undefined;
  isLoading: boolean;
  shortlet: Booking[];
  onNewRequest: () => void;
  searchTerm: string;
  setSearchTerm: any;
  setStartDate: any;
  setEndDate: any;
  endDate: string | undefined;
  startDate: string | undefined;
}
