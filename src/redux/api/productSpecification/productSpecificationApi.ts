import { baseApi } from "../baseApi";
import type {
  IProductSpecification,
  IProductSpecificationApiResponse,
} from "@/types/product/product";

export const productSpecificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* =========================
       GET ALL / FILTER BY PRODUCT
       ========================= */
    getProductSpecifications: builder.query<
      IProductSpecification[],
      string | void
    >({
      query: (productId) => ({
        url: "/product-specifications",
        params: productId ? { productId } : undefined,
      }),

      // ✅ THIS IS THE KEY PART
      transformResponse: (response: IProductSpecificationApiResponse[]) =>
        response.map((item) => ({
          id: item._id,
          productId: item.productId,
          key: item.key,
          value: item.value,
          product: item.product,
        })),

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "PRODUCT_SPECIFICATION" as const,
                id,
              })),
              { type: "PRODUCT_SPECIFICATION", id: "LIST" },
            ]
          : [{ type: "PRODUCT_SPECIFICATION", id: "LIST" }],
    }),

    /* =============================
       GET ALL / FILTER BY PRODUCTID
       ============================= */
    getProductSpecificationsByProductId: builder.query<
      IProductSpecification[],
      string
    >({
      query: (productId) => `/product-specifications/product/${productId}`,

      transformResponse: (response: IProductSpecificationApiResponse[]) =>
        response.map((item) => ({
          id: item._id,
          productId: item.productId,
          key: item.key,
          value: item.value,
          product: item.product,
        })),

      providesTags: ["PRODUCT_SPECIFICATION"],
    }),

    /* =========================
       GET SINGLE SPECIFICATION
       ========================= */
    getProductSpecification: builder.query<IProductSpecification, string>({
      query: (id) => `/product-specifications/${id}`,

      transformResponse: (response: IProductSpecificationApiResponse[]) =>
        response.map((item) => ({
          id: item._id,
          productId: item.productId,
          key: item.key,
          value: item.value,
          product: item.product,
        })),

      providesTags: (_result, _error, id) => [
        { type: "PRODUCT_SPECIFICATION", id },
      ],
    }),

    /* =========================
       CREATE
       ========================= */
    createProductSpecification: builder.mutation<
      IProductSpecification,
      Partial<IProductSpecification>
    >({
      query: (data) => ({
        url: "/product-specifications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "PRODUCT_SPECIFICATION", id: "LIST" }],
    }),

    /* =========================
       BULK CREATE
       ========================= */
    createProductSpecificationsBulk: builder.mutation<
      IProductSpecification[],
      Partial<IProductSpecification>[]
    >({
      query: (data) => ({
        url: "/product-specifications/bulk",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "PRODUCT_SPECIFICATION", id: "LIST" }],
    }),

    /* =========================
       UPDATE
       ========================= */
    updateProductSpecification: builder.mutation<
      IProductSpecification,
      { id: string; data: Partial<IProductSpecification> }
    >({
      query: ({ id, data }) => ({
        url: `/product-specifications/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "PRODUCT_SPECIFICATION", id },
      ],
    }),

    /* =========================
       DELETE
       ========================= */
    deleteProductSpecification: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/product-specifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "PRODUCT_SPECIFICATION", id },
        { type: "PRODUCT_SPECIFICATION", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductSpecificationsQuery,
  useGetProductSpecificationsByProductIdQuery,
  useGetProductSpecificationQuery,
  useCreateProductSpecificationMutation,
  useCreateProductSpecificationsBulkMutation,
  useUpdateProductSpecificationMutation,
  useDeleteProductSpecificationMutation,
} = productSpecificationApi;
