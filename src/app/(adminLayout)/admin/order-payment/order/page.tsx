"use client";

import { useState } from "react";
import { useGetAllOrdersQuery } from "@/redux/api/order/orderApi";
import OrderStats from "@/components/admin/order/OrderStats";
import OrderTable from "@/components/admin/order/OrderTable";

const OrderPage = () => {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();

  const [page, setPage] = useState(1);
  const limit = 5;

  const paginatedData = orders.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Order Management</h1>

      <OrderStats orders={orders} />

      <OrderTable
        orders={paginatedData}
        total={orders.length}
        page={page}
        setPage={setPage}
        limit={limit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default OrderPage;
