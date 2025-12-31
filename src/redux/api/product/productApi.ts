// src/redux/features/product/productApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes/tagTypes";
import { IProduct, IProductQuery } from "@/types";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Product
    createProduct: builder.mutation<
      { success: boolean; product: IProduct },
      Partial<IProduct>
    >({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.PRODUCT],
    }),

    // ✅ Get All Products (with filters & pagination)
    getAllProducts: builder.query<IProduct[], IProductQuery | void>({
      query: (params) => ({
        url: "/products",
        params: params ?? undefined,
      }),
      transformResponse: (response: {
        success: boolean;
        products: IProduct[];
      }) => response.products,
      providesTags: [tagTypes.PRODUCT],
    }),

    // ✅ Get Single Product
    getSingleProduct: builder.query<IProduct, string>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: { success: boolean; product: IProduct }) =>
        response.product,
      providesTags: (_result, _error, id) => [{ type: tagTypes.PRODUCT, id }],
    }),

    // ✅ Update Product
    updateProduct: builder.mutation<
      { success: boolean; product: IProduct },
      { id: string; data: Partial<IProduct> }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: tagTypes.PRODUCT, id },
      ],
    }),

    // ✅ Delete Product
    deleteProduct: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.PRODUCT],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
