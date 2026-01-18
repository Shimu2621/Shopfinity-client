"use client";

import { Tooltip, ResponsiveContainer, BarChart, XAxis, Bar } from "recharts";

import { ChartCard } from "./ChartCard";
import { useGetTopProductsQuery } from "@/redux/api/dashboard/dashboardApi";

export function TopSellingProductsChart() {
  const { data: topProducts, isLoading, isError } = useGetTopProductsQuery();

  if (isLoading) {
    return (
      <ChartCard title="Top Selling Products">
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Loading chart...
        </div>
      </ChartCard>
    );
  }

  if (isError || !topProducts || topProducts.length === 0) {
    return (
      <ChartCard title="Top Selling Products">
        <div className="h-full flex items-center justify-center text-destructive">
          Failed to load data
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Top Selling Products">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={topProducts}>
          <XAxis dataKey="name" hide />
          <Tooltip />
          <Bar dataKey="sold" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
