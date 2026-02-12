import { baseApi } from "../baseApi";
import { IAnswer } from "@/types/product/product";

type CreateAnswerPayload = {
  answer: string;
  questionId: string;
  adminId: string;
};

type AnswerResponse = {
  success: boolean;
  count: number;
  data: IAnswer[];
};

export const productAnswerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Answer
    createProductAnswer: builder.mutation<IAnswer, CreateAnswerPayload>({
      query: (body) => ({
        url: "/product-answers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PRODUCT_QUESTION"],
    }),

    // ✅ Get Answers by Question
    getAnswersByQuestion: builder.query<IAnswer[], string>({
      query: (questionId) => `/product-answers/question/${questionId}`,
      providesTags: ["PRODUCT_QUESTION"],
      transformResponse: (response: AnswerResponse) => response.data,
    }),

    // ✅ Update Answer
    updateProductAnswer: builder.mutation<
      IAnswer,
      { id: string; answer: string }
    >({
      query: ({ id, answer }) => ({
        url: `/product-answers/${id}`,
        method: "PUT",
        body: { answer },
      }),
      invalidatesTags: ["PRODUCT_QUESTION"],
    }),

    // ✅ Delete Answer
    deleteProductAnswer: builder.mutation<void, string>({
      query: (id) => ({
        url: `/product-answers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCT_QUESTION"],
    }),
  }),
});

export const {
  useCreateProductAnswerMutation,
  useGetAnswersByQuestionQuery,
  useUpdateProductAnswerMutation,
  useDeleteProductAnswerMutation,
} = productAnswerApi;
