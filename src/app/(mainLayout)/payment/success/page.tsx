"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { baseApi } from "@/redux/api/baseApi";

export default function PaymentSuccessPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 🔥 Clear cart & wishlist cache after payment
    dispatch(baseApi.util.invalidateTags(["CART"]));
    dispatch(baseApi.util.invalidateTags(["WISHLIST"]));
  }, [dispatch]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p>Your order has been placed successfully.</p>
    </div>
  );
}
