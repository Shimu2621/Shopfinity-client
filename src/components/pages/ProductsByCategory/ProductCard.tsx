"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, Star, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types";
import { toast } from "sonner";
import { useAddToCartMutation } from "@/redux/api/cart/cartApi";
import { useAppSelector } from "@/redux/hooks/hooks";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;
  const [addToCart] = useAddToCartMutation();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const calculateDiscountedPrice = (
    price: number,
    discountPercentage: number,
  ) => {
    return price - (price * discountPercentage) / 100;
  };

  return (
    <Card className="p-0 overflow-hidden rounded-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden ">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
            <Eye className="w-12 h-12 text-muted-foreground" />
          </div>
        )}

        <div className="flex flex-col">
          {/* Featured Badge */}
          {product.featured && (
            <Badge className="absolute top-2 left-3 font-bold text-xsm bg-blue-600 text-white">
              Featured
            </Badge>
          )}
          {/* Discount Badge */}
          {product.isDiscountActive && product.discountPercentage && (
            <Badge className="absolute top-10 left-3 font-bold text-xsm bg-rose-600 text-white">
              -{product.discountPercentage}% Off
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10"
            onClick={async () => {
              if (!userId) {
                toast.error("Please login first");
                return;
              }

              await addToCart({
                userId,
                productId: product._id,
                quantity: 1,
              });

              toast.success(`${product.name} added to cart`);
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>

          <Button size="icon" variant="secondary" className="h-10 w-10">
            <Heart className="w-6 h-6" />
          </Button>
          <Link href={`/products/${product._id}`}>
            <Button size="icon" variant="secondary" className="h-10 w-10">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Stock Status */}
        {product.stock > 0 && (
          <Badge
            variant="outline"
            className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm"
          >
            {/* In Stock */}
            Only {product.stock} left
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge variant="destructive" className="absolute bottom-3 left-3">
            Out of Stock
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between">
          {product.brand && (
            <Badge variant="secondary" className="text-md mb-2">
              {product.brand?.name}
            </Badge>
          )}
          {product.category && (
            <Badge variant="secondary" className="text-md mb-2">
              {product.category?.name}
            </Badge>
          )}
        </div>
        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-rose-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
          {product.description}
        </p>

        {/* Star */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < 4
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">(4.0)</span>
        </div>

        <div className="flex items-center gap-2">
          {product.isDiscountActive && product.discountPercentage ? (
            <>
              <span className="text-lg font-bold text-rose-600">
                {formatPrice(
                  calculateDiscountedPrice(
                    product.price,
                    product.discountPercentage,
                  ),
                )}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-rose-600">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
