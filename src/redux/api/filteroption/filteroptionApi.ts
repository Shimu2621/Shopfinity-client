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
    // ✅ GET ALL or BY CATEGORY
    getFilterOptions: builder.query<
      ApiResponse<IFilterOption[]>,
      { categoryId?: string } | void
    >({
      query: (params) => ({
        url: "/filter-options",
        params: params ?? undefined,
      }),
      providesTags: [{ type: tagTypes.FILTER_OPTION, id: "LIST" }],
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
  useGetFilterOptionsQuery,
  useCreateFilterOptionMutation,
  useUpdateFilterOptionMutation,
  useDeleteFilterOptionMutation,
} = filterOptionApi;
