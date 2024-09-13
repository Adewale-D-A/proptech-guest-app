/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { Endpoints } from "./service";
import { API_BASE_URL } from "@/_shared/constants";

const base = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    // prepareHeaders: (header, { getState }) => {
    //   const token = getState() as RootState;
    //   token && header.set("Authorization", `Bearer ${token}`);
    //   return header;
    // },
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      console.log("token base:::", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getToken: builder.query<string, string>({
      query: (body) => `${Endpoints.api}token/${body}`,
    }),
  }),
  tagTypes: ["UserProfile"],
});

export const {
  reducer: apiReducer,
  reducerPath: apiReducerPath,
  useGetTokenQuery,
  middleware: apiMiddleware,
  enhanceEndpoints,
  injectEndpoints,
  endpoints,
} = base;
