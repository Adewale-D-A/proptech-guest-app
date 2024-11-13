/** @format */

import countries from "../data/countries";
import { format, isYesterday, parseISO } from "date-fns";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const NEXT_PUBLIC_REDIRECT_URL = process.env
  .NEXT_PUBLIC_REDIRECT_URL as string;
export const buildQueryString = (params: any) =>
  Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
export const toCurrency2 = (currency = "NGN", number: number) => {
  const formatter = new Intl.NumberFormat();

  return `${
    countries.find((el) => el.currencies[0].code === currency)?.currencies[0]
      .symbol
  }${formatter.format(number).split(".00")[0]}`;
};

export const formatCurrency = (
  amount: number | undefined = 0,
  currency = "NGN"
) => {
  return toCurrency2(currency, amount ? amount : 0).split(".00")[0];
};

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const formatChatTime = (dateString: string) => {
  const date = parseISO(dateString);

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "hh:mm a");
};

// utils/dateFormatter.ts
export function formatDate(
  date: Date | string | number,
  locales: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }
): string {
  const parsedDate = new Date(date);
  return new Intl.DateTimeFormat(locales, options).format(parsedDate);
}

export const urlRoute = {
  additionalPayStackUrl: `${NEXT_PUBLIC_REDIRECT_URL}/additional-services`,
  reBookUrl: `${NEXT_PUBLIC_REDIRECT_URL}/bookings`,
  shortletUrl: `${NEXT_PUBLIC_REDIRECT_URL}/shortlets`,
  activeBookingUrl: `${NEXT_PUBLIC_REDIRECT_URL}/bookings/active-bookings`,
} as const;

export enum payment_method {
  pay_stack = "paystack",
}
