"use client";

import { useAppSelector } from "@/redux/hooks/hooks";
import AccountInfoCard from "./AccountInfoCard";
import ShippingAddressForm from "./ShippingAddressForm";
import OrderSummary from "./OrderSummaryCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckoutPage = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  if (!user) return null; // prevents flicker

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
      {/* LEFT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AccountInfoCard />
        <ShippingAddressForm userId={user.id} />
        {/* Delivery Method */}
        {/* Payment Method */}
      </div>

      {/* RIGHT */}
      <OrderSummary userId={user.id} />
    </div>
  );
};

export default CheckoutPage;
