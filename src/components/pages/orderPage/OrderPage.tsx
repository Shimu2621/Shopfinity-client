"use client";

import Link from "next/link";
import { useState } from "react";
import { useGetAllOrdersQuery } from "@/redux/api/order/orderApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";
import { CreditCard, Truck, Inbox, CheckCircle, Star } from "lucide-react";
import { useRouter } from "next/navigation";
// import { stripePromise } from "@/lib/stripe";
// import type { Stripe } from "@stripe/stripe-js";

const tabs = [
  "All",
  "To Pay",
  "To Ship",
  "To Receive",
  "Delivered",
  "To Review",
];

const tabIcons: Record<string, React.ReactNode> = {
  All: <Inbox size={16} />,
  "To Pay": <CreditCard size={16} />,
  "To Ship": <Truck size={16} />,
  "To Receive": <Inbox size={16} />,
  Delivered: <CheckCircle size={16} />,
  "To Review": <Star size={16} />,
};

const statusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "processing":
      return "bg-blue-100 text-blue-700";
    case "shipped":
      return "bg-purple-100 text-purple-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function OrderPage() {
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery();
  console.log("orders:", orders);
  const [activeTab, setActiveTab] = useState("All");
  const router = useRouter();

  if (isLoading) return <div className="p-6">Loading orders...</div>;
  if (isError || !orders) return <div className="p-6">No orders found</div>;

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter(
          (order) => order.status.toLowerCase() === activeTab.toLowerCase(),
        );

  // const handlePayNow = async (orderId: string) => {
  //   try {
  //     const res = await fetch(
  //       "http://localhost:5000/api/payment/create-stripe-session",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ paymentId: orderId }),
  //       },
  //     );

  //     const data = await res.json();

  //     if (!data.id) throw new Error("Stripe session not created");

  //     type StripeInstance = Awaited<typeof stripePromise>;

  //     // const stripe = (await stripePromise) as Stripe;
  //     const stripe = (await stripePromise) as StripeInstance;

  //     if (!stripe) {
  //       throw new Error("Stripe failed to load");
  //     }

  //     await (stripe as any).redirectToCheckout({
  //       sessionId: data.id,
  //     });
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //   }
  // };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4" />
          <span className="text-sm">Home</span>
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Orders</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">My Orders</h1>
        <p className="text-sm text-gray-500">Track and manage your orders:</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-between bg-rose-50 p-1 rounded-lg overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-10 py-2 font-semibold rounded-md text-sm whitespace-nowrap ${
              activeTab === tab ? "bg-white shadow font-bold" : "text-gray-900"
            }`}
          >
            {tabIcons[tab]} {/* Icon */}
            {tab}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order._id} className="border rounded-xl bg-white shadow-sm">
            {/* Order Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <p className="font-medium">Order #{order._id.slice(-6)}</p>
                <Badge variant="secondary" className="capitalize">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </Badge>
              </div>

              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toDateString()}
              </p>
            </div>

            {/* Products */}
            <div className="divide-y">
              {order.items.map((item, index) => {
                const product = item.productId;

                return (
                  <div
                    key={index}
                    className="flex justify-between items-center px-6 py-4"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Image
                        src={product.images[0] || "/placeholder.png"} // ✅ first image
                        alt={product.name}
                        width={80}
                        height={80}
                        className="object-cover rounded-md border"
                      />

                      <div className="space-y-1">
                        <p className="font-medium">{product.name}</p>

                        {product.description && (
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <p className="font-semibold">
                        ${(product.price * item.quantity).toFixed(2)}
                      </p>

                      <Link href={`/order/${order._id}`}>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
              <p className="font-semibold">
                Total Amount: ${order.totalAmount.toFixed(2)}
              </p>

              {order.status === "pending" && (
                <Button
                  className="bg-rose-700 hover:bg-rose-900"
                  onClick={() => router.push(`/payment/${order._id}`)}
                >
                  Pay Now
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
