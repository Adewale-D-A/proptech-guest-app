/** @format */

import countries from "./data/countries";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    try {
      const payload: { exp: number } = jwtDecode(token);
      const expirationTime = new Date(payload.exp * 1000);
      Cookies.set("access_token", token, { expires: expirationTime });
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return Cookies.get("access_token") || null;
  }
  return null;
};
