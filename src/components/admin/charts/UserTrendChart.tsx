"use client";

import { XAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

import { ChartCard } from "./ChartCard";
import { useGetUserTrendQuery } from "@/redux/api/dashboard/dashboardApi";

export function UserTrendChart() {
  const { data: userTrend, isLoading, isError } = useGetUserTrendQuery();

  if (isLoading) {
    return (
      <ChartCard title="Sales Over Time">
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Loading chart...
        </div>
      </ChartCard>
    );
  }

  if (isError || !userTrend || userTrend.length === 0) {
    return (
      <ChartCard title="Sales Over Time">
        <div className="h-full flex items-center justify-center text-destructive">
          Failed to load data
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="User Registration Trend">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={userTrend}>
          <XAxis dataKey="_id" />
          <Tooltip />
          <Area dataKey="count" stroke="#22c55e" fill="#bbf7d0" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
