"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Trash2, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/redux/api/wishlist/wishlistApi";

interface WishlistSidebarProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

const WishlistSidebar = ({ open, onClose, userId }: WishlistSidebarProps) => {
  const { data: wishlistItems, isLoading } = useGetWishlistQuery({ userId });
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const totalItems = wishlistItems?.data?.length ?? 0;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[420px] max-w-full h-screen p-0">
        {/* Header */}
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-items-start gap-4">
            <Heart className="text-red-500" />
            <SheetTitle>Wishlist</SheetTitle>
            {totalItems > 0 && (
              <Badge variant="secondary">
                {totalItems} item{totalItems > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {/* Loading */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p>Loading wishlist...</p>
              </div>
            )}

            {/* Empty wishlist */}
            {!isLoading && totalItems === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Heart className="h-16 w-16 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Your wishlist is empty
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

            {/* Wishlist items */}
            {!isLoading &&
              wishlistItems?.data?.map((item) => {
                const product =
                  typeof item.productId === "string" ? null : item.productId;
                if (!product) return null;

                return (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 border rounded-lg p-3"
                  >
                    <Image
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{product.name}</p>
                        <button
                          onClick={() =>
                            removeFromWishlist({
                              userId,
                              productId: product._id,
                            })
                          }
                          className="text-muted-foreground"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-sm font-semibold mt-1">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Footer */}
        {!isLoading && totalItems > 0 && (
          <div className="border-t p-4 space-y-3">
            <Button
              onClick={onClose}
              className="w-full bg-rose-700 hover:bg-rose-900 hover:text-white border py-2 rounded"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default WishlistSidebar;
