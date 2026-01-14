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

interface OrderSummaryProps {
  userId: string;
  paymentMethod: "pay_now" | "cod";
}

const OrderSummary = ({ userId, paymentMethod }: OrderSummaryProps) => {
  const { data: cartItems, isLoading } = useGetUserCartQuery(userId, {
    skip: !userId,
  });

  if (!userId) return null;

  const subtotal =
    cartItems?.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    ) ?? 0;

  const shipping = subtotal > 0 ? 10 : 0; // flat demo shipping
  const tax = subtotal * 0.05; // 5% demo tax
  const total = subtotal + shipping + tax;

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
          <button className="w-full rounded-lg bg-rose-700 text-white py-3 font-medium hover:bg-rose-900 transition">
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Pay Now - ${total.toFixed(2)}</span>
            </div>
          </button>
        ) : (
          <button className="w-full rounded-xl bg-orange-700 text-white py-3 font-medium hover:bg-orange-700 transition">
            <div className="flex items-center justify-center gap-2">
              <Truck className="h-4 w-4" />
              <span> Place your order - ${total.toFixed(2)}</span>
            </div>
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
