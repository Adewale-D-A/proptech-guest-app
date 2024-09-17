/** @format */

import countries from "../data/countries";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
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
