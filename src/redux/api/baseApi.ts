// src/redux/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, // http://localhost:5000/api
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "USER",
    "BRAND",
    "CATEGORY",
    "PRODUCT",
    "CART",
    "WISHLIST",
    "PAYMENT",
    "FILTER_OPTION",
    "PRODUCT_QUESTION",
    "PRODUCT_ANSWER",
    "PRODUCT_SPECIFICATION",
    "REVIEW",
    "ORDER",
    "DASHBOARD_ANALYTICS",
  ],
  endpoints: () => ({}),
});
