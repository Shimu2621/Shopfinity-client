import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes/tagTypes";
import { ICategory } from "@/types";
import { ApiResponse } from "@/types/api";

export interface CategoryPayload {
  name: string;
  description?: string;
  icon?: string;
  parentId?: string | null;
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL
    getAllCategories: builder.query<ApiResponse<ICategory[]>, void>({
      query: () => "/categories",
      providesTags: [{ type: tagTypes.CATEGORY, id: "LIST" }],
    }),

    // GET SINGLE
    getSingleCategory: builder.query<ApiResponse<ICategory>, string>({
      query: (id) => `/categories/${id}`,
      providesTags: (result, error, id) => [{ type: tagTypes.CATEGORY, id }],
    }),

    // CREATE
    createCategory: builder.mutation<ApiResponse<ICategory>, CategoryPayload>({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: tagTypes.CATEGORY, id: "LIST" }],
    }),

    // UPDATE (PUT)
    updateCategory: builder.mutation<
      ApiResponse<ICategory>,
      { id: string; data: CategoryPayload }
    >({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.CATEGORY, id },
      ],
    }),

    // DELETE
    deleteCategory: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: tagTypes.CATEGORY, id: "LIST" }],
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
