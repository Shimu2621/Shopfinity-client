/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loadStripe } from "@stripe/stripe-js"; // no need to rename
import { useState } from "react";
import { ICreatePaymentPayload } from "@/types/payment/payment";
import { useCreatePaymentMutation } from "@/redux/api/payment/paymentApi";

const stripePromise = loadStripe("pk_test_YourPublishableKey"); // your publishable key

interface PaymentPageProps {
  orderId: string;
  userId: string;
  amount: number;
}

export default function PaymentPage({
  orderId,
  userId,
  amount,
}: PaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [createPayment] = useCreatePaymentMutation();

  const handlePayNow = async () => {
    setIsProcessing(true);

    try {
      const payload: ICreatePaymentPayload = {
        userId,
        orderId,
        amount,
        paymentMethod: "pay_now",
      };

      const { data } = await createPayment(payload).unwrap();

      const res = await fetch(
        `http://localhost:5000/api/payments/create-stripe-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId: data._id }),
        }
      );

      const session: { id: string } = await res.json(); // ✅ type-safe

      // 3️⃣ Load Stripe
      const stripe = await stripePromise;
      if (!stripe) return alert("Stripe failed to load");

      // 4️⃣ Redirect to checkout
      const result = await (stripe as any).redirectToCheckout({
        sessionId: session.id,
      });
      if (result?.error) alert(result.error.message);
    } catch (err) {
      console.error(err);
      alert("Payment failed!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg text-center space-y-4">
      <h1 className="text-xl font-bold">Complete Your Payment</h1>
      <p className="text-gray-500">
        Amount to pay: <strong>${amount.toFixed(2)}</strong>
      </p>

      <button
        disabled={isProcessing}
        onClick={handlePayNow}
        className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white py-3 rounded-lg font-medium hover:bg-rose-900 disabled:opacity-70"
      >
        {isProcessing ? "Processing..." : `Pay Now - $${amount.toFixed(2)}`}
      </button>
    </div>
  );
}
