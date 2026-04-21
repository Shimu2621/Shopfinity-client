"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { baseApi } from "@/redux/api/baseApi";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useRef } from "react";
import { useGetAllPaymentsQuery } from "@/redux/api/baseApi";

export default function PaymentSuccessPage() {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const receiptRef = useRef<HTMLDivElement>(null);

  const paymentId = params.get("paymentId");

  const { data } = useGetAllPaymentsQuery();
  const payment = data?.data?.find((p) => p._id === paymentId);

  useEffect(() => {
    // 🔥 Reset all cache (cart, wishlist etc.)
    dispatch(baseApi.util.resetApiState());
  }, [dispatch]);

  const handlePrint = () => {
    if (!receiptRef.current) return;

    const printContents = receiptRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  if (!payment) {
    return (
      <div className="text-red-500 text-center mt-20">Payment not found</div>
    );
  }

  if (!data) {
    return (
      <div className="text-white text-center mt-20">Loading payment...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-10 text-white">
      <div className="max-w-xl w-full bg-gray-900/80 backdrop-blur-lg border border-gray-700 shadow-2xl rounded-2xl p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500 drop-shadow-lg" />
          </div>

          <h1 className="text-3xl font-bold text-green-400">
            Payment Successful
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Your transaction has been completed successfully
          </p>
        </div>

        {/* Receipt */}
        <div
          ref={receiptRef}
          className="print-area bg-gray-800 border border-gray-700 rounded-xl p-5 space-y-4"
        >
          <h2 className="text-lg font-semibold text-center">
            🧾 Payment Receipt
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Payment ID:</span>
              <span>{payment?._id}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400 font-semibold">
                {payment?.paymentStatus?.toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Date:</span>
              <span>{new Date(payment.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total Amount</span>
              <span className="text-green-400">${payment?.amount}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white py-2 rounded-lg transition"
          >
            Download Receipt
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 border border-gray-600 hover:bg-gray-800 py-2 rounded-lg transition"
          >
            Print Receipt
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center">
          Thank you for your purchase 💙
        </p>
      </div>
    </div>
  );
}
