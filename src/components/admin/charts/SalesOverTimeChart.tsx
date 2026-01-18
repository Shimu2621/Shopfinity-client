"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { ChartCard } from "./ChartCard";
import { useGetSalesOverTimeQuery } from "@/redux/api/dashboard/dashboardApi";

export function SalesOverTimeChart() {
  const { data, isLoading, isError } = useGetSalesOverTimeQuery();

  if (isLoading) {
    return (
      <ChartCard title="Sales Over Time">
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Loading chart...
        </div>
      </ChartCard>
    );
  }

  if (isError || !data) {
    return (
      <ChartCard title="Sales Over Time">
        <div className="h-full flex items-center justify-center text-destructive">
          Failed to load data
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Sales Over Time">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
