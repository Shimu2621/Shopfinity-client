"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks/hooks";
import AccountInfoCard from "./AccountInfoCard";
import ShippingAddressForm from "./ShippingAddressForm";
import OrderSummary from "./OrderSummaryCard";
import PaymentMethod from "./PaymentMethod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PaymentMethodType } from "@/types/payment/payment";

const CheckoutClient = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("pay_now");

  if (!user) {
    router.replace("/signin");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          <AccountInfoCard />
          <ShippingAddressForm userId={user.id} />

          <PaymentMethod
            paymentMethod={paymentMethod}
            onChange={setPaymentMethod}
          />
        </div>

        {/* RIGHT */}
        <div>
          <OrderSummary userId={user.id} paymentMethod={paymentMethod} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutClient;
