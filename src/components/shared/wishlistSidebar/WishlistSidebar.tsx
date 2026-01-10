"use client";

import Image from "next/image";
import { X, Trash2, Heart } from "lucide-react";
import { motion } from "framer-motion";

import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/redux/api/wishlist/wishlistApi";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export default function WishlistSidebar({
  isOpen,
  onClose,
  userId,
}: WishlistSidebarProps) {
  const { data, isLoading } = useGetWishlistQuery({ userId });
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed right-0 top-0 z-50 h-full w-[380px] bg-white shadow-xl flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <Heart className="text-red-500" />
          <h2 className="font-semibold text-lg">
            Wishlist ({data?.data?.length || 0})
          </h2>
        </div>

        <button onClick={onClose}>
          <X />
        </button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        {isLoading ? (
          <p className="text-center text-sm text-gray-500">Loading...</p>
        ) : data?.data?.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            Your wishlist is empty
          </p>
        ) : (
          <div className="space-y-4">
            {data?.data?.map((item) => {
              const product =
                typeof item.productId === "string" ? null : item.productId;

              if (!product) return null;

              return (
                <div
                  key={item._id}
                  className="flex gap-3 border rounded-lg p-3"
                >
                  <Image
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                    width={70}
                    height={70}
                    className="rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-sm font-semibold mt-1">
                      ${product.price}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      removeFromWishlist({
                        userId,
                        productId: product._id,
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        <Button variant="ghost" className="w-full" onClick={onClose}>
          Continue Shopping
        </Button>
      </div>
    </motion.div>
  );
}
