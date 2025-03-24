/** @format */

export const Endpoints = {
  api: process.env.NEXT_PUBLIC_API_BASE_URL || "",
};

export enum Methods {
  get = "GET",
  post = "POST",
  put = "PUT",
}
