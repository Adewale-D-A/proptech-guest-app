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
  user_id: number;
  shortlet_id: number;
  request_id: string;
  status: string;
  subject: string;
  description: string;
  is_escalated: number;
  escalation_reason: string | null;
  created_at: string;
  updated_at: string;
  shortlet: any | null;
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
