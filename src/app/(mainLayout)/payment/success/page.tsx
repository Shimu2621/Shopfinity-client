"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Download, Printer } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-14 h-14 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-700">
            Payment Successful!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Your payment has been processed successfully
          </p>
        </div>

        {/* Receipt */}
        <div
          ref={receiptRef}
          className="print-area border rounded-xl p-4 space-y-4 bg-white"
        >
          <h2 className="font-semibold text-lg text-center">
            🧾 Payment Receipt
          </h2>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Payment ID:</span>
            <span className="font-medium">{paymentId}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status:</span>
            <span className="text-green-600 font-semibold">PAID</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Date:</span>
            <span>{new Date().toLocaleString()}</span>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount</span>
              <span className="text-green-600">$499.99</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={handlePrint}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
        >
          Download Receipt
        </button>

        <button onClick={handlePrint} className="flex-1 border py-2 rounded-lg">
          Print Receipt
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center">
          Thank you for your purchase! A confirmation email has been sent.
        </p>
      </div>
    </div>
  );
}
