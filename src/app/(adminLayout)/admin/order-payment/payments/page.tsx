"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGetAllPaymentsQuery } from "@/redux/api/baseApi";
import PaymentStats from "@/components/admin/payment/PaymentStats";
import PaymentTable from "@/components/admin/payment/PaymentTable";
import { DollarSign } from "lucide-react";

const PaymentPage = () => {
  const { data, isLoading } = useGetAllPaymentsQuery();

  const [page, setPage] = useState(1);
  const limit = 5;

  const payments = data?.data || [];

  const paginatedData = payments.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
        </div>
      </motion.div>

      <PaymentStats payments={payments} />

      <PaymentTable
        payments={paginatedData}
        total={payments.length}
        page={page}
        setPage={setPage}
        limit={limit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PaymentPage;
