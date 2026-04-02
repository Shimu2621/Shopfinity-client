"use client";

import { useState } from "react";
import { useGetAllPaymentsQuery } from "@/redux/api/baseApi";
import PaymentStats from "@/components/admin/payment/PaymentStats";
import PaymentTable from "@/components/admin/payment/PaymentTable";

const PaymentPage = () => {
  const { data, isLoading } = useGetAllPaymentsQuery();

  const [page, setPage] = useState(1);
  const limit = 5;

  const payments = data?.data || [];

  const paginatedData = payments.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Payment Management</h1>

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
