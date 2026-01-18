"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { ChartCard } from "./ChartCard";
import { useGetOrderStatusQuery } from "@/redux/api/dashboard/dashboardApi";

const COLORS = ["#3b82f6", "#22c55e", "#facc15", "#f97316", "#ef4444"];

export function OrderStatusChart() {
  const { data: orderStatus, isLoading, isError } = useGetOrderStatusQuery();

  if (isLoading) {
    return (
      <ChartCard title="Order Status Distribution">
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Loading chart...
        </div>
      </ChartCard>
    );
  }

  if (isError || !orderStatus) {
    return (
      <ChartCard title="Order Status Distribution">
        <div className="h-full flex items-center justify-center text-destructive">
          Failed to load data
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Order Status Distribution">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={orderStatus}
            dataKey="count"
            nameKey="_id"
            innerRadius={60}
            outerRadius={90}
            label
          >
            {orderStatus.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
