/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/api/category/categoryApi.ts
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes/tagTypes";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "/categories",
      providesTags: [tagTypes.CATEGORY],
    }),
    getSingleCategory: builder.query({
      query: (id: string) => `/categories/${id}`,
      providesTags: [tagTypes.CATEGORY],
    }),
    createCategory: builder.mutation({
      query: (data: any) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.CATEGORY],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.CATEGORY],
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.CATEGORY],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
