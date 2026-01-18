// src/redux/api/dashboardApi.ts
import { baseApi } from "../baseApi";
import {
  DashboardSummary,
  SalesOverTime,
  OrderStatusDistribution,
  TopSellingProduct,
  UserRegistrationTrend,
  PaymentMethodDistribution,
  TopCategoryBySales,
} from "@/types/dashboard/dashboard";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<DashboardSummary, void>({
      query: () => "/admin/dashboard/summary",
      providesTags: ["DASHBOARD_ANALYTICS"],
    }),

    getSalesOverTime: builder.query<SalesOverTime[], void>({
      query: () => "/admin/dashboard/sales-over-time",
    }),

    getOrderStatus: builder.query<OrderStatusDistribution[], void>({
      query: () => "/admin/dashboard/order-status",
    }),

    getTopProducts: builder.query<TopSellingProduct[], void>({
      query: () => "/admin/dashboard/top-products",
    }),

    getUserTrend: builder.query<UserRegistrationTrend[], void>({
      query: () => "/admin/dashboard/user-trend",
    }),

    getTopCategories: builder.query<TopCategoryBySales[], void>({
      query: () => "/admin/dashboard/top-categories",
    }),

    getPaymentMethods: builder.query<PaymentMethodDistribution[], void>({
      query: () => "/admin/dashboard/payment-methods",
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetSalesOverTimeQuery,
  useGetOrderStatusQuery,
  useGetTopProductsQuery,
  useGetUserTrendQuery,
  useGetTopCategoriesQuery,
  useGetPaymentMethodsQuery,
} = dashboardApi;
