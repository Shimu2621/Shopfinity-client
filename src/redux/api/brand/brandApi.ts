import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes/tagTypes";
import { IBrand } from "@/types";
import { ApiResponse } from "@/types/api";

export interface BrandPayload {
  name: string;
  categoryIds?: string[];
}

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL
    getAllBrands: builder.query<
      ApiResponse<IBrand[]>,
      { page?: number; limit?: number; searchTerm?: string }
    >({
      query: (params) => ({
        url: "/brands",
        params,
      }),
      providesTags: [{ type: tagTypes.BRAND, id: "LIST" }],
    }),

    // GET SINGLE
    getSingleBrand: builder.query<ApiResponse<IBrand>, string>({
      query: (id) => `/brands/${id}`,
      providesTags: (result, error, id) => [{ type: tagTypes.BRAND, id }],
    }),

    // CREATE
    createBrand: builder.mutation<ApiResponse<IBrand>, BrandPayload>({
      query: (data) => ({
        url: "/brands",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: tagTypes.BRAND, id: "LIST" }],
    }),

    // UPDATE
    updateBrand: builder.mutation<
      ApiResponse<IBrand>,
      { id: string; data: BrandPayload }
    >({
      query: ({ id, data }) => ({
        url: `/brands/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.BRAND, id },
      ],
    }),

    // DELETE
    deleteBrand: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: tagTypes.BRAND, id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useGetSingleBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
