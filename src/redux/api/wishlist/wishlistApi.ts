// src/redux/api/wishlistApi.ts
import { baseApi } from "../baseApi";
import {
  IWishlist,
  IWishlistCreatePayload,
  IWishlistQueryParams,
  IWishlistResponse,
} from "@/types/wishlist/wishlist";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Add to wishlist
     */
    addToWishlist: builder.mutation<IWishlist, IWishlistCreatePayload>({
      query: (body) => ({
        url: "/wishlist",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WISHLIST"],
    }),

    /**
     * Get user wishlist
     */
    getWishlist: builder.query<IWishlistResponse, IWishlistQueryParams>({
      query: (params) => ({
        url: "/wishlist/user",
        params,
      }),
      providesTags: ["WISHLIST"],

      keepUnusedDataFor: 0,
    }),

    /**
     * Get all wishlist (Admin)
     */
    getAllWishlist: builder.query<
      IWishlistResponse,
      { page?: number; limit?: number }
    >({
      query: (params) => ({
        url: "/wishlist/admin",
        params,
      }),
      providesTags: ["WISHLIST"],
    }),

    /**
     * Remove from wishlist
     */
    removeFromWishlist: builder.mutation<
      { success: boolean; message: string },
      { userId: string; productId: string }
    >({
      query: ({ userId, productId }) => ({
        url: `/wishlist/${userId}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WISHLIST"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useGetAllWishlistQuery,
  useRemoveFromWishlistMutation,
} = wishlistApi;
