"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  ArrowRight,
  Loader2,
} from "lucide-react";
import type { IProduct } from "@/types";
import Image from "next/image";

import { ShinyButton } from "../magicui/shiny-button";
import { AuroraText } from "../magicui/aurora-text";
import Link from "next/link";
import { useGetFeaturedCategoryProductsQuery } from "@/redux/api/product/productApi";
import { useAddToCartMutation } from "@/redux/api/cart/cartApi";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useState } from "react";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
} from "@/redux/api/wishlist/wishlistApi";

export default function FeaturedProducts() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetFeaturedCategoryProductsQuery();

  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;
  const [addToCart] = useAddToCartMutation();
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const { data: wishlistData } = useGetWishlistQuery(
    { userId },
    { skip: !userId }
  );

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const getProductId = (productId: string | IProduct) =>
    typeof productId === "string" ? productId : productId._id;

  const isWishlisted = (id: string) =>
    wishlistData?.data?.some((item) => getProductId(item.productId) === id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const calculateDiscountedPrice = (
    price: number,
    discountPercentage: number
  ) => {
    return price - (price * discountPercentage) / 100;
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4 container mx-auto">
        <div className="text-center mb-12">
          <div className="h-8 bg-muted animate-pulse rounded-lg w-64 mx-auto mb-4" />
          <div className="h-4 bg-muted animate-pulse rounded w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="p-0 overflow-hidden">
              <div className="aspect-square animate-pulse" />
              <CardContent className="p-4">
                <div className="h-4 bg-muted animate-pulse rounded mb-2" />
                <div className="h-3 bg-muted animate-pulse rounded w-3/4 mb-4" />
                <div className="h-6 bg-muted animate-pulse rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto text-center">
        <div className="text-destructive">
          <h2 className="text-2xl font-bold mb-4">Error Loading Products</h2>
          <p>{isError}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 container mx-auto bg-background">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Section Heading */}
        <ShinyButton className="relative inline-block px-6 py-3 rounded-full text-lg font-bold mb-4 bg-badge text-black overflow-hidden">
          🛒 Featured Products
        </ShinyButton>

        <h2 className="text-4xl lg:text-5xl text-center font-bold text-forground mb-6">
          Handpicked{" "}
          <AuroraText className="text-blue-800 italic">Products</AuroraText>
          <br /> Just For You
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mb-8">
          Explore our most popular and trending products, carefully curated to
          give you the best shopping experience.
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.slice(0, 10).map((product: IProduct, index: number) => (
            <motion.div
              key={product._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full flex flex-col p-0 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden ">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      sizes="100vw"
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
                      disabled={
                        product.stock === 0 ||
                        (isLoading && loadingProductId === product._id)
                      }
                      onClick={async () => {
                        if (!userId) {
                          toast.error("Please login first");
                          return;
                        }

                        try {
                          setLoadingProductId(product._id);

                          await addToCart({
                            userId,
                            productId: product._id,
                            quantity: 1,
                          }).unwrap();

                          toast.success(`${product.name} added to cart`);
                        } catch (isError) {
                          toast.error("Failed to add to cart");
                          console.error(isError);
                        } finally {
                          setLoadingProductId(null);
                        }
                      }}
                    >
                      {isLoading && loadingProductId === product._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </Button>

                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10"
                      onClick={async () => {
                        if (!userId) {
                          toast.error("Please login first");
                          return;
                        }

                        try {
                          if (isWishlisted(product._id)) {
                            await removeFromWishlist({
                              userId,
                              productId: product._id,
                            }).unwrap();

                            toast.success("Removed from wishlist");
                          } else {
                            await addToWishlist({
                              userId,
                              productId: product._id,
                            }).unwrap();

                            toast.success("Added to wishlist");
                          }
                        } catch {
                          toast.error("Wishlist action failed");
                        }
                      }}
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          isWishlisted(product._id)
                            ? "fill-rose-600 text-rose-600"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>

                    <Link href={`/products/${product._id}`}>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10"
                      >
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
                    <Badge
                      variant="destructive"
                      className="absolute bottom-3 left-3"
                    >
                      Out of Stock
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between">
                    {product.brand && (
                      <Badge variant="secondary">{product.brand.name}</Badge>
                    )}

                    {product.category && (
                      <Badge variant="secondary">{product.category.name}</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold pt-3 text-rose-600 text-lg line-clamp-2 group-hover:text-rose-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                    {product.description}
                  </p> */}

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
                    <span className="text-sm text-muted-foreground ml-1">
                      (4.0)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {product.isDiscountActive && product.discountPercentage ? (
                      <>
                        <span className="text-lg font-bold ">
                          {formatPrice(
                            calculateDiscountedPrice(
                              product.price,
                              product.discountPercentage
                            )
                          )}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                          {formatPrice(product.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold ">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-semibold mb-2">No Featured Products</h3>
            <p className="text-muted-foreground">
              Check back later for new featured items.
            </p>
          </motion.div>
        )}

        {/* View Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <Button className="bg-rose-700 hover:bg-rose-600 text-white px-8 py-4  font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              View All Products
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="inline-block ml-2"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </motion.div>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
