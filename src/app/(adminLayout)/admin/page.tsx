"use client";

import { useGetDashboardSummaryQuery } from "@/redux/api/dashboard/dashboardApi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
} from "lucide-react";

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

  const stats = [
    {
      title: "Revenue",
      value: `$${data.revenue.toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: data.totalCustomers,
      icon: Users,
    },
    {
      title: "Products",
      value: data.totalProducts,
      icon: Package,
    },
    {
      title: "Out of Stock",
      value: data.outOfStock,
      icon: AlertTriangle,
    },
  ];

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder for charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="h-[350px] flex items-center justify-center text-muted-foreground">
          Sales Over Time (Chart)
        </Card>

        <Card className="h-[350px] flex items-center justify-center text-muted-foreground">
          Order Status Distribution
        </Card>
      </div>
    </div>
  );
}
