import { baseApi } from "../baseApi";
import { IQuestion } from "@/types/product/product";

type CreateQuestionPayload = {
  question: string;
  productId: string;
  userId: string;
};

type QuestionResponse = {
  success: boolean;
  count: number;
  data: IQuestion[];
};

export const productQuestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Question
    createProductQuestion: builder.mutation<IQuestion, CreateQuestionPayload>({
      query: (body) => ({
        url: "/product-questions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PRODUCT_QUESTION"],
    }),

    // ✅ Get Questions by Product
    getProductQuestions: builder.query<IQuestion[], string>({
      query: (productId) => `/product-questions?productId=${productId}`,
      providesTags: ["PRODUCT_QUESTION"],
    }),

    // Get All Questions by Product
    getAllProductQuestions: builder.query<IQuestion[], void>({
      query: () => "/product-questions",
      providesTags: ["PRODUCT_QUESTION"],
      transformResponse: (response: QuestionResponse) => response.data,
    }),
  }),
});

export const {
  useCreateProductQuestionMutation,
  useGetProductQuestionsQuery,
  useGetAllProductQuestionsQuery,
} = productQuestionApi;
