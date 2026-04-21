import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPayment, ICreatePaymentPayload } from "@/types/payment/payment";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
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
  endpoints: (builder) => ({
    // ➕ Create Payment
    createPayment: builder.mutation<
      { success: boolean; data: IPayment },
      ICreatePaymentPayload
    >({
      query: (body) => ({
        url: "/payment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PAYMENT"],
    }),

    // 📦 Get all payments
    getAllPayments: builder.query<{ success: boolean; data: IPayment[] }, void>(
      {
        query: () => "/payment",
        providesTags: ["PAYMENT"],
      },
    ),

    // 📦 Get Single payments
    getPaymentById: builder.query<{ success: boolean; data: IPayment }, string>(
      {
        query: (id) => `/payment/${id}`,
      },
    ),

    // Stripe session
    createStripeSession: builder.mutation<
      { url: string },
      { paymentId: string }
    >({
      query: (body) => ({
        url: "/payment/create-stripe-session",
        method: "POST",
        body,
      }),
    }),

    // success
    paymentSuccess: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/payment/${id}/success`,
        method: "PATCH",
      }),
      invalidatesTags: ["PAYMENT"],
    }),

    // cancel
    paymentCancel: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/payment/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["PAYMENT"],
    }),
  }),
});
export const {
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useCreateStripeSessionMutation,
  usePaymentSuccessMutation,
  usePaymentCancelMutation,
} = baseApi;
