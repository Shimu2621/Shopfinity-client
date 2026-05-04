"use client";

import { CreditCard, Truck, ShieldCheck, Wallet } from "lucide-react";
import { PaymentMethodType } from "@/types/payment/payment";

interface PaymentMethodProps {
  paymentMethod: PaymentMethodType;
  onChange: (method: PaymentMethodType) => void;
}

export default function PaymentMethod({
  paymentMethod,
  onChange,
}: PaymentMethodProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 font-semibold text-lg">
        <CreditCard className="w-5 h-5" />
        Payment Method
      </div>

      {/* Pay Now */}
      <label
        className={`border rounded-xl p-4 flex items-start justify-between cursor-pointer transition
        ${
          paymentMethod === "pay_now"
            ? "border-blue-500 bg-blue-50"
            : "hover:border-gray-300"
        }`}
      >
        <div className="flex gap-4">
          <input
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === "pay_now"}
            onChange={() => onChange("pay_now")}
            className="mt-1 accent-blue-600"
          />

          <div>
            <div className="flex items-center gap-2 font-medium">
              Pay Now
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                Recommended
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Secure online payment with credit/debit card
            </p>
          </div>
        </div>
      </label>

      {/* Cash on Delivery */}
      <label
        className={`border rounded-xl p-4 flex items-start gap-4 cursor-pointer transition
        ${
          paymentMethod === "cod"
            ? "border-orange-500 bg-orange-50"
            : "hover:border-gray-300"
        }`}
      >
        <input
          type="radio"
          name="paymentMethod"
          checked={paymentMethod === "cod"}
          onChange={() => onChange("cod")}
          className="mt-1 accent-orange-500"
        />

        <div>
          <div className="font-medium flex items-center gap-2">
            <Truck className="w-4 h-4 text-orange-500" />
            Cash on Delivery
          </div>
          <p className="text-sm text-gray-500">
            Pay when your order is delivered.
          </p>
        </div>
      </label>

      {/* Info Box */}
      {paymentMethod === "pay_now" ? (
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm">
          <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-blue-700">Secure Payment</p>
            <p className="text-blue-600">
              Your payment information is encrypted and secure. We accept all
              major credit cards
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm">
          <Wallet className="w-5 h-5 text-orange-600 mt-0.5" />
          <div>
            <p className="font-medium text-orange-700">Cash on Delivery</p>
            <p className="text-orange-600">
              Pay in cash when your order arrives. Additional COD charges may
              apply.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
