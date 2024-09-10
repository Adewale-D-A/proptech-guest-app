/** @format */

export interface CommonProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}
export interface ShortletType {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
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
interface GeneralResponse {
  message: string;
}
