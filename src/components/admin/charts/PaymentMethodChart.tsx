"use client";

import { Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";

import { ChartCard } from "./ChartCard";
import { useGetPaymentMethodsQuery } from "@/redux/api/dashboard/dashboardApi";

export function PaymentMethodChart() {
  const {
    data: paymentMethods,
    isLoading,
    isError,
  } = useGetPaymentMethodsQuery();

  if (isLoading) {
    return (
      <ChartCard title="Payment Method Distribution">
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Loading chart...
        </div>
      </ChartCard>
    );
  }

  if (isError || !paymentMethods || paymentMethods.length === 0) {
    return (
      <ChartCard title="Payment Method Distribution">
        <div className="h-full flex items-center justify-center text-destructive">
          Failed to load data
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Payment Method Distribution">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={paymentMethods}
            dataKey="count"
            nameKey="_id"
            innerRadius={60}
            outerRadius={90}
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
