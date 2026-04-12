"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGetAllOrdersQuery } from "@/redux/api/order/orderApi";
import OrderStats from "@/components/admin/order/OrderStats";
import OrderTable from "@/components/admin/order/OrderTable";
import { ListOrdered } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";

const OrderPage = () => {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();

  const [page, setPage] = useState(1);
  const limit = 5;

  const paginatedData = orders.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6 space-y-6">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-2 rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500">
            <ListOrdered className="h-8 w-8 text-white" />
          </div>

          <AuroraText className="text-3xl md:text-4xl font-bold">
            Order Management
          </AuroraText>
        </div>
        <p className="text-muted-foreground">
          Manage and track customer orders efficiently by updating status, and
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
