import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes/tagTypes";
import { ApiResponse } from "@/types/api";
import { IFilterOption } from "@/types/filterOption/filterOption";

export interface FilterOptionPayload {
  name: string;
  type: "select" | "range" | "checkbox";
  options?: string[];
  unit?: string;
  categoryId: string;
}

export const filterOptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL
    getAllFilterOptions: builder.query<ApiResponse<IFilterOption[]>, void>({
      query: () => "/filter-options",
      providesTags: [{ type: tagTypes.FILTER_OPTION, id: "LIST" }],
    }),

    // GET BY CATEGORY
    getFilterOptionsByCategory: builder.query<
      ApiResponse<IFilterOption[]>,
      string
    >({
      query: (categoryId) => `/filter-options?categoryId=${categoryId}`,
      providesTags: (result, error, categoryId) => [
        { type: tagTypes.FILTER_OPTION, id: categoryId },
      ],
    }),

    // CREATE
    createFilterOption: builder.mutation<
      ApiResponse<IFilterOption>,
      FilterOptionPayload
    >({
      query: (data) => ({
        url: "/filter-options",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: tagTypes.FILTER_OPTION, id: "LIST" }],
    }),

    // UPDATE
    updateFilterOption: builder.mutation<
      ApiResponse<IFilterOption>,
      { id: string; data: Partial<FilterOptionPayload> }
    >({
      query: ({ id, data }) => ({
        url: `/filter-options/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.FILTER_OPTION, id },
      ],
    }),

    // DELETE
    deleteFilterOption: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/filter-options/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: tagTypes.FILTER_OPTION, id },
        { type: tagTypes.FILTER_OPTION, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllFilterOptionsQuery,
  useGetFilterOptionsByCategoryQuery,
  useCreateFilterOptionMutation,
  useUpdateFilterOptionMutation,
  useDeleteFilterOptionMutation,
} = filterOptionApi;
