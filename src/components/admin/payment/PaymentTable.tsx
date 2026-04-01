import { useState } from "react";
import { motion } from "framer-motion";
import PaymentStatusModal from "../payment/PaymentStatusModal";
import { IPayment } from "@/types/payment/payment";

interface PaymentTableProps {
  payments: IPayment[];
  total: number;
  page: number;
  setPage: (page: number) => void;
  limit: number;
}

const PaymentTable = ({
  payments,
  total,
  page,
  setPage,
  limit,
}: PaymentTableProps) => {
  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Payment ID</th>
            <th>Order ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p, index) => (
            <motion.tr
              key={p._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="border-t"
            >
              <td>{p._id.slice(0, 8)}...</td>
              <td>{p.orderId?._id?.slice(0, 8)}</td>

              <td>
                <div>
                  <p>{p.userId?.name || "User"}</p>
                  <p className="text-xs text-gray-400">{p.userId?.email}</p>
                </div>
              </td>

              <td>
                <button
                  onClick={() => setSelectedPayment(p)}
                  className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
                >
                  {p.paymentStatus}
                </button>
              </td>

              <td>${p.amount}</td>
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
      {selectedPayment && (
        <PaymentStatusModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
};

export default PaymentTable;
