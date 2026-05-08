"use client";

import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6 space-y-6 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <XCircle className="w-14 h-14 text-red-500" />
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-red-600">Payment Cancelled</h1>
          <p className="text-gray-500 text-sm mt-1">
            Your payment was not completed. You can try again anytime.
          </p>
        </div>

        {/* Message Box */}
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-sm text-red-600">
          No amount has been charged from your account.
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/checkout"
            className="bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-800 transition"
          >
            Try Again
          </Link>

          <Link
            href="/products"
            className="flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft size={16} />
            Continue Shopping!
          </Link>
        </div>
      </div>
    </div>
  );
}
