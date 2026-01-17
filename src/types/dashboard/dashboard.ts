// src/types/dashboard.types.ts

export interface DashboardSummary {
  revenue: number;
  totalOrders: number;
  pendingOrders: number;
  totalCustomers: number;
  totalProducts: number;
  outOfStock: number;
  newCustomers: number;
}

export interface SalesOverTime {
  _id: string; // date
  total: number;
}

export interface OrderStatusDistribution {
  _id: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  count: number;
}

export interface TopSellingProduct {
  name: string;
  sold: number;
}

export interface UserRegistrationTrend {
  _id: string; // date
  count: number;
}

export interface PaymentMethodDistribution {
  _id: string; // stripe | cod | etc
  count: number;
}
