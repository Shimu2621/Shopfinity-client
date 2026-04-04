"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGetAllOrdersQuery } from "@/redux/api/order/orderApi";
import OrderStats from "@/components/admin/order/OrderStats";
import OrderTable from "@/components/admin/order/OrderTable";
import { ListOrdered } from "lucide-react";

const OrderPage = () => {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();

  const [page, setPage] = useState(1);
  const limit = 5;

  const paginatedData = orders.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <ListOrdered className="w-8 h-8 text-blue-500" />
          Order Management
        </h1>
        <p className="text-muted-foreground">
          Manage and track customer orders efficiently by updating statuses, and
          ensuring smooth order delivery
        </p>
      </motion.div>

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
