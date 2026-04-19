import { baseApi } from "../baseApi";
import {
  IAddToCartPayload,
  ICartItem,
  ICartResponse,
  ISingleCartResponse,
  IUpdateCartPayload,
} from "@/types/cart/cart";
import { tagTypes } from "../../tagTypes/tagTypes";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Add to Cart
    addToCart: builder.mutation<ISingleCartResponse, IAddToCartPayload>({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.CART],
    }),

    // 📥 Get Cart by User
    getUserCart: builder.query<ICartItem[], string>({
      query: (userId) => `/cart/user/${userId}`,
      providesTags: [tagTypes.CART],
      transformResponse: (response: ICartResponse) => response.data,

      keepUnusedDataFor: 0,
    }),

    // ✏️ Update Cart Item Quantity
    updateCartItem: builder.mutation<ISingleCartResponse, IUpdateCartPayload>({
      query: ({ id, quantity }) => ({
        url: `/cart/${id}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: [tagTypes.CART],
    }),

    // ❌ Delete Cart Item
    deleteCartItem: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.CART],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetUserCartQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
