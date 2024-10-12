/** @format */

interface ChatMessage {
  id: number;
  message: string;
  sender: "user" | "admin";
  files: string | null;
  message_type: "text";
  chat_id: number;
  user_id: number;
  admin_id: number | null;
  created_at: string;
  updated_at: string;
}

interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

interface ChatApiResponse {
  error: boolean;
  message: string;
  data: {
    current_page: number;
    data: ChatMessage[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLinks[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}
