"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  useGetUserCartQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} from "@/redux/api/cart/cartApi";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

const CartSidebar = ({ open, onClose, userId }: CartSidebarProps) => {
  const { data: cartItems, isLoading } = useGetUserCartQuery(userId, {
    skip: !userId,
  });

  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const total =
    cartItems?.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    ) ?? 0;

  const totalItems =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[420px] max-w-full h-screen p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-items-start gap-4">
            <ShoppingBag />
            <SheetTitle>Shopping Cart</SheetTitle>
            {totalItems > 0 && (
              <Badge variant="secondary">
                {totalItems} item{totalItems > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {/* Loading */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p>Loading cart items...</p>
              </div>
            )}

            {/* Empty cart */}
            {!isLoading && cartItems?.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add some products to get started!
                </p>

                <Button
                  onClick={onClose}
                  asChild
                  className="bg-rose-700 hover:bg-rose-900"
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            )}

            {/* Cart items */}
            {!isLoading &&
              cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 border rounded-lg p-3"
                >
                  <Image
                    src={item.productId.images?.[0] || "/placeholder.png"}
                    alt={item.productId.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{item.productId.name}</p>
                      <button
                        onClick={() => deleteCartItem(item._id)}
                        className="text-muted-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm">${item.productId.price}</p>

                    <div className="flex items-center px-2 w-fit border rounded gap-2 mt-2 font-semibold">
                      <button
                        onClick={() =>
                          updateCartItem({
                            id: item._id,
                            quantity: item.quantity - 1,
                          })
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateCartItem({
                            id: item._id,
                            quantity: item.quantity + 1,
                          })
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Footer */}
        {!isLoading && cartItems && cartItems.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex items-center justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-rose-600 hover:bg-rose-800 text-white py-2 rounded">
              Proceed to Checkout
            </button>

            <button
              onClick={onClose}
              className="w-full hover:bg-blue-700 hover:text-white border py-2 rounded"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
