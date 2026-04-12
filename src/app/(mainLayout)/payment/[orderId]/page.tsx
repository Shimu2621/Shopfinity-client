/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { stripePromise } from "@/lib/stripe";
import { useCreatePaymentMutation } from "@/redux/api/baseApi";
import { useGetOrderByIdQuery } from "@/redux/api/order/orderApi";

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: order, isLoading } = useGetOrderByIdQuery(orderId);
  const [createPayment] = useCreatePaymentMutation();

  if (isLoading) return <p className="p-6">Loading payment...</p>;
  if (!order) return <p className="p-6">Order not found</p>;

  // const handlePayNow = async () => {
  //   setIsProcessing(true);

  //   try {
  //     // 1️⃣ Create payment record
  //     const payload = {
  //       userId: order.userId,
  //       orderId: order._id,
  //       amount: order.totalAmount,
  //       paymentMethod: "pay_now",
  //     };

  //     const { data } = await createPayment(payload).unwrap();

  //     // 2️⃣ Create Stripe session
  //     const res = await fetch(
  //       "http://localhost:5000/api/payment/create-stripe-session",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ paymentId: data._id }),
  //       },
  //     );

  //     const session: { id: string } = await res.json();

  //     // 3️⃣ Redirect to Stripe
  //     const stripe = await stripePromise;
  //     if (!stripe) throw new Error("Stripe failed to load");

  //     await (stripe as any).redirectToCheckout({
  //       sessionId: session.id,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     alert("Payment failed");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const handlePayNow = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/payment/create-stripe-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentId }),
        },
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // ✅ NEW WAY
      }
    } catch (error) {
      alert("Payment failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg text-center space-y-4">
      <h1 className="text-xl font-bold">Complete Your Payment</h1>

      <p className="text-gray-500">
        Amount to pay: <strong>${order.totalAmount.toFixed(2)}</strong>
      </p>

      <button
        disabled={isProcessing}
        onClick={handlePayNow}
        className="w-full bg-rose-600 text-white py-3 rounded-lg font-medium hover:bg-rose-900 disabled:opacity-70"
      >
        {isProcessing
          ? "Processing..."
          : `Pay Now - $${order.totalAmount.toFixed(2)}`}
      </button>
    </div>
  );
}
