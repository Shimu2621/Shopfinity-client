// src/redux/api/review/reviewApi.ts

import { baseApi } from "../baseApi";
import { ApiResponse } from "@/types/api";
import { IReview, IReviewQuery } from "@/types/review/review";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET ALL REVIEWS
    getAllReviews: builder.query<IReview[], IReviewQuery | void>({
      query: (params) => ({
        url: "/reviews",
        params: params ?? {},
      }),
      transformResponse: (response: ApiResponse<IReview[]>) => response.data,
      providesTags: ["REVIEW"],
    }),

    // ✅ GET SINGLE REVIEW
    getSingleReview: builder.query<IReview, string>({
      query: (id) => `/reviews/${id}`,
      transformResponse: (response: ApiResponse<IReview>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "REVIEW", id }],
    }),

    // ✅ CREATE REVIEW
    createReview: builder.mutation<IReview, Partial<IReview>>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<IReview>) => response.data,
      invalidatesTags: ["REVIEW"],
    }),

    // ✅ UPDATE REVIEW
    updateReview: builder.mutation<
      IReview,
      { id: string; body: Partial<IReview> }
    >({
      query: ({ id, body }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response: ApiResponse<IReview>) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        "REVIEW",
        { type: "REVIEW", id },
      ],
    }),

    // ✅ DELETE REVIEW
    deleteReview: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["REVIEW"],
    }),
  }),
  overrideExisting: false,
});

// ✅ Auto-generated hooks
export const {
  useGetAllReviewsQuery,
  useGetSingleReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
