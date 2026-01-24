import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPayment, ICreatePaymentPayload } from "@/types/payment/payment";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // 🔁 change if needed
    credentials: "include",
  }),
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    // ➕ Create Payment
    createPayment: builder.mutation<
      { success: boolean; data: IPayment },
      ICreatePaymentPayload
    >({
      query: (body) => ({
        url: "/payments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment"],
    }),

    // 📦 Get all payments (Admin)
    getAllPayments: builder.query<{ success: boolean; data: IPayment[] }, void>(
      {
        query: () => "/payments",
        providesTags: ["Payment"],
      },
    ),

    // ➕ Stripe session
    createStripeSession: builder.mutation<
      { url: string },
      { paymentId: string }
    >({
      query: (body) => ({
        url: "/payments/create-stripe-session",
        method: "POST",
        body,
      }),
    }),

    // ✅ Payment success
    paymentSuccess: builder.mutation<
      { success: boolean; data: IPayment },
      string
    >({
      query: (id) => ({
        url: `/payments/${id}/success`,
        method: "PATCH",
      }),
      invalidatesTags: ["Payment"],
    }),

    // ❌ Payment cancel
    paymentCancel: builder.mutation<
      { success: boolean; data: IPayment },
      string
    >({
      query: (id) => ({
        url: `/payments/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
  useCreateStripeSessionMutation,
  usePaymentSuccessMutation,
  usePaymentCancelMutation,
} = paymentApi;
