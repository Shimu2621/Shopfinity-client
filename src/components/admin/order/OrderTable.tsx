"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IOrder } from "@/types/order/order";
import OrderStatusModal from "../order/OrderStatusModel";

interface Props {
  orders: IOrder[];
  total: number;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  isLoading: boolean;
}

const OrderTable = ({
  orders,
  total,
  page,
  setPage,
  limit,
  isLoading,
}: Props) => {
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const totalPages = Math.ceil(total / limit);

  if (isLoading) {
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading orders...
      </p>
    );
  }

  return (
    <div
      className="
        p-4 sm:p-5 rounded-2xl shadow-md
        bg-white dark:bg-black
        border border-gray-200 dark:border-zinc-900
      "
    >
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-zinc-900">
              <th className="py-3">Order ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Total</th>
              <th>Items</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, index) => (
              <motion.tr
                key={o._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="
                  border-b border-gray-100 dark:border-zinc-900
                  hover:bg-gray-50 dark:hover:bg-black
                  transition
                "
              >
                {/* Order ID */}
                <td className="py-3 font-medium text-gray-700 dark:text-white whitespace-nowrap">
                  {o._id.slice(0, 8)}...
                </td>

                {/* User ID */}
                <td className="text-gray-500 dark:text-gray-400">
                  {o.userId.slice(0, 8)}...
                </td>

                {/* Status */}
                <td>
                  <button
                    onClick={() => setSelectedOrder(o)}
                    className="
                      px-3 py-1 rounded-full text-xs font-medium capitalize transition
                      border border-gray-300 text-gray-600
                      dark:border-gray-700 dark:text-gray-400
                      hover:bg-gray-100 dark:hover:bg-black
                    "
                  >
                    {o.status}
                  </button>
                </td>

                {/* Total */}
                <td className="text-gray-700 dark:text-white font-medium">
                  ${o.totalAmount}
                </td>

                {/* Items */}
                <td className="text-gray-500 dark:text-gray-400">
                  {o.items.length}
                </td>

                {/* Date */}
                <td className="text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center sm:justify-end mt-6 gap-2 flex-wrap">
        {[...Array(totalPages)].map((_, i) => {
          const isActive = page === i + 1;

          return (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`
                px-3 py-1.5 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "border border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-black"
                }
              `}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderStatusModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderTable;
