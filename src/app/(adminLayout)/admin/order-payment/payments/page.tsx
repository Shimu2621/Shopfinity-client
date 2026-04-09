"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGetAllPaymentsQuery } from "@/redux/api/baseApi";
import PaymentStats from "@/components/admin/payment/PaymentStats";
import PaymentTable from "@/components/admin/payment/PaymentTable";
import { DollarSign } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";

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
          <AuroraText className="text-3xl md:text-4xl font-bold">
            Payment Management
          </AuroraText>
        </div>
        <p className="text-muted-foreground">
          Monitor and manage all payment transactions, track status, and ensure
          secure and seamless financial operations across your platform
        </p>
      </motion.div>

      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-2 rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500">
            <DollarSign className="h-8 w-8 text-white" />
          </div>

          <AuroraText className="text-3xl md:text-4xl font-bold">
            Payment Management
          </AuroraText>
        </div>
        <p className="text-muted-foreground">
          Monitor and manage all payment transactions, track status, and ensure
          secure and seamless financial operations across your platform
        </p>
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
