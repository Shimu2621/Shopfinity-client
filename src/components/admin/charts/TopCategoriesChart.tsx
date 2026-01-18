"use client";

import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  YAxis,
  Bar,
} from "recharts";

import { ChartCard } from "./ChartCard";
import { useGetTopCategoriesQuery } from "@/redux/api/dashboard/dashboardApi";

export function TopCategoriesChart() {
  const {
    data: topCategories,
    isLoading,
    isError,
  } = useGetTopCategoriesQuery();

  if (isLoading) {
    return (
      <ChartCard title="Top Categories by Sales">
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Loading chart...
        </div>
      </ChartCard>
    );
  }

  if (isError || !topCategories || topCategories.length === 0) {
    return (
      <ChartCard title="Sales Over Time">
        <div className="h-full flex items-center justify-center text-destructive">
          Failed to load data
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Top Categories by Sales">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={topCategories} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="total" fill="#f97316" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
