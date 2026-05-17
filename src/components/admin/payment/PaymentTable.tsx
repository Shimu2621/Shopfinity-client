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
  isLoading: boolean;
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
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-4 md:p-6 rounded-2xl shadow-sm overflow-x-auto transition-all duration-300">
      <table className="w-full min-w-[700px] text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800 text-left text-gray-500 dark:text-gray-400">
            <th className="py-4 px-3 font-semibold">Payment ID</th>
            <th className="py-4 px-3 font-semibold">Order ID</th>
            <th className="py-4 px-3 font-semibold">User</th>
            <th className="py-4 px-3 font-semibold">Status</th>
            <th className="py-4 px-3 font-semibold">Amount</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p, index) => (
            <motion.tr
              key={p._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors"
            >
              <td className="py-4 px-3 text-gray-700 dark:text-gray-200">
                {p._id.slice(0, 8)}...
              </td>

              <td className="py-4 px-3 text-gray-700 dark:text-gray-300">
                {p.orderId?._id?.slice(0, 8)}
              </td>

              <td className="py-4 px-3">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {p.userId?.name || "User"}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {p.userId?.email}
                  </p>
                </div>
              </td>

              <td className="py-4 px-3">
                <button
                  onClick={() => setSelectedPayment(p)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-200
                    ${
                      p.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : p.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : p.paymentStatus === "cancelled"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }
                  `}
                >
                  {p.paymentStatus}
                </button>
              </td>

              <td className="py-4 px-3 font-semibold text-gray-800 dark:text-white">
                ${p.amount}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {payments.length === 0 && (
        <div className="py-12 text-center text-gray-500 dark:text-gray-400">
          No payments found
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end flex-wrap mt-6 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              page === i + 1
                ? "bg-white text-black dark:bg-white dark:text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
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
