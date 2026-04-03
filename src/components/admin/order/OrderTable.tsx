import { useState } from "react";
import { motion } from "framer-motion";
import { IOrder } from "@/types/order/order";
import OrderStatusModal from "./OrderStatusModal";

interface Props {
  orders: IOrder[];
  total: number;
  page: number;
  setPage: (page: number) => void;
  limit: number;
}

const OrderTable = ({ orders, total, page, setPage, limit }: Props) => {
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Order ID</th>
            <th>User ID</th>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="border-t"
            >
              <td>{o._id.slice(0, 8)}...</td>

              {/* ✅ userId is string */}
              <td>{o.userId.slice(0, 8)}...</td>

              <td>
                <button
                  onClick={() => setSelectedOrder(o)}
                  className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 capitalize"
                >
                  {o.status}
                </button>
              </td>

              <td>${o.totalAmount}</td>

              {/* Items count */}
              <td>{o.items.length}</td>

              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
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
