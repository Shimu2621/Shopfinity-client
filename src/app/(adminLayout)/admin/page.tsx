"use client";

import { useGetDashboardSummaryQuery } from "@/redux/api/dashboard/dashboardApi";

import { StatsCard } from "@/components/admin/StatsCard";
import { statsConfig } from "@/components/admin/stats.config";
import { DashboardSummary } from "@/types/dashboard/dashboard";
import { SalesOverTimeChart } from "@/components/admin/charts/SalesOverTimeChart";
import { OrderStatusChart } from "@/components/admin/charts/OrderStatusChart";
import { TopSellingProductsChart } from "@/components/admin/charts/TopProductsChart";
import { UserTrendChart } from "@/components/admin/charts/UserTrendChart";
import { TopCategoriesChart } from "@/components/admin/charts/TopCategoriesChart";
import { PaymentMethodChart } from "@/components/admin/charts/PaymentMethodChart";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useGetDashboardSummaryQuery();

  if (isLoading) {
    return (
      <div className="p-6 text-muted-foreground">Loading dashboard...</div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-destructive">Failed to load dashboard data</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of store performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsConfig.map((stat) => (
          <StatsCard
            key={stat.key}
            title={stat.title}
            value={data[stat.key as keyof DashboardSummary]}
            icon={stat.icon}
            gradient={stat.gradient}
            iconBg={stat.iconBg}
          />
        ))}
      </div>

      {/* Charts placeholders */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SalesOverTimeChart />
        <OrderStatusChart />
        <TopSellingProductsChart />
        <UserTrendChart />
        <TopCategoriesChart />
        <PaymentMethodChart />
      </div>
    </div>
  );
}
