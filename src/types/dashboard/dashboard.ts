// src/types/dashboard.types.ts

export interface DashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  outOfStock: number;
  newCustomers: number;
  unansweredQuestions: number;
}

export interface SalesOverTime {
  _id: string; // date
  total: number;
  [key: string]: string | number;
}

export interface OrderStatusDistribution {
  _id: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  count: number;
  [key: string]: string | number;
}

export interface TopSellingProduct {
  name: string;
  sold: number;
  [key: string]: string | number;
}

export interface UserRegistrationTrend {
  _id: string; // date
  count: number;
  [key: string]: string | number;
}

export interface TopCategoryBySales {
  name: string;
  total: number;
  [key: string]: string | number;
}

export interface PaymentMethodDistribution {
  _id: string; // stripe | cod | etc
  count: number;
  [key: string]: string | number;
}
