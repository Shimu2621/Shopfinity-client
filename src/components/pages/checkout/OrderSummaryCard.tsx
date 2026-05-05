"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserCartQuery } from "@/redux/api/cart/cartApi";
import {
  CheckCircle,
  CreditCard,
  Shield,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useCreateOrderMutation } from "@/redux/api/order/orderApi";
import { useRouter } from "next/navigation";

interface OrderSummaryProps {
  userId: string;
  paymentMethod: "pay_now" | "cod";
}

const OrderSummary = ({ userId, paymentMethod }: OrderSummaryProps) => {
  const [createOrder] = useCreateOrderMutation();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: cartItems, isLoading } = useGetUserCartQuery(userId, {
    skip: !userId,
  });

  if (!userId) return null;

  const subtotal =
    cartItems?.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0,
    ) ?? 0;

  const shipping = subtotal > 0 ? 10 : 0; // flat demo shipping
  const tax = subtotal * 0.05; // 5% demo tax
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    try {
      setIsProcessing(true);

      // ✅ STEP 1: Validate cart
      if (!cartItems || cartItems.length === 0) {
        console.error("Cart is empty");
        return;
      }

      // ✅ STEP 2: Transform cart → order items
      const orderItems = cartItems.map((item) => ({
        productId: item.productId._id, // ✅ FIX HERE
        quantity: item.quantity,
        price: item.productId.price,
      }));

      // ✅ STEP 3: Call API
      const result = await createOrder({
        userId,
        items: orderItems,
        totalAmount: total,
        paymentMethod,
      }).unwrap();

      // ✅ STEP 4: Redirect
      const orderId = result._id;

      if (paymentMethod === "pay_now") {
        router.push(`/payment/${orderId}`);
      } else {
        router.push(`/order-success/${orderId}`);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Summary
            {/* <Badge variant="secondary" className="ml-auto">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </Badge> */}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          {/* Loading */}
          {isLoading && <p className="text-sm">Loading order summary...</p>}

          {/* Items */}
          {!isLoading &&
            cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 border-b pb-3"
              >
                <Image
                  src={item.productId.images?.[0] || "/placeholder.png"}
                  alt={item.productId.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">{item.productId.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-semibold">
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

          {/* Price breakdown */}
          <div className="space-y-2 pt-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold text-base border-t pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="pt-4">
        {paymentMethod === "pay_now" ? (
          <button
            disabled={isProcessing}
            onClick={handlePlaceOrder}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-rose-600 text-white py-3 font-medium
                 hover:bg-rose-900 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                {/* Spinner */}
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                {/* Animated Icon */}
                <CreditCard className="h-4 w-4 animate-pulse" />
                <span>Pay Now - ${total.toFixed(2)}</span>
              </>
            )}
          </button>
        ) : (
          <button
            disabled={isProcessing}
            onClick={handlePlaceOrder}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 text-white py-3 font-medium
                 hover:bg-orange-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                {/* Spinner */}
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Placing Order...</span>
              </>
            ) : (
              <>
                {/* Animated Icon */}
                <Truck className="h-4 w-4 animate-bounce" />
                <span>Place your order - ${total.toFixed(2)}</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2">
          <Shield className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Secure</span>
        </div>
        <div className="p-2">
          <Truck className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Fast Delivery</span>
        </div>
        <div className="p-2">
          <CheckCircle className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Guaranteed</span>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
