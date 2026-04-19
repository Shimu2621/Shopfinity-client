"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Download, Printer } from "lucide-react";
import { baseApi } from "@/redux/api/baseApi";
import { useAppDispatch } from "@/redux/hooks/hooks";

export default function PaymentSuccessPage() {
  const dispatch = useAppDispatch();
  const params = useSearchParams();

  const paymentId = params.get("paymentId");

  useEffect(() => {
    // 🔥 Reset all cache (cart, wishlist etc.)
    dispatch(baseApi.util.resetApiState());
  }, [dispatch]);

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
        <div className="border rounded-xl p-4 space-y-4">
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
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            <Download size={16} />
            Download Receipt
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
            <Printer size={16} />
            Print
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center">
          Thank you for your purchase! A confirmation email has been sent.
        </p>
      </div>
    </div>
  );
}
