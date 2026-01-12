"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Heart,
  Shield,
  RotateCcw,
  Truck,
  Minus,
  Plus,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetSingleProductQuery } from "@/redux/api/product/productApi";
import ReviewForm from "@/components/pages/productDetailsPage/ReviewForm";
import QuestionForm from "@/components/pages/productDetailsPage/QuestionForm";
import { useAddToCartMutation } from "@/redux/api/cart/cartApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useState } from "react";
import { useGetProductSpecificationsByProductIdQuery } from "@/redux/api/productSpecification/productSpecificationApi";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
} from "@/redux/api/wishlist/wishlistApi";
import { IProduct } from "@/types";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;
  const router = useRouter();

  // Fetch product first
  const { data: product, isLoading, isError } = useGetSingleProductQuery(id);

  // Extract productId AFTER product exists
  const productId = product?._id;

  const [addToCart, { isLoading: adding }] = useAddToCartMutation();

  const { data: specifications, isLoading: specsLoading } =
    useGetProductSpecificationsByProductIdQuery(productId!, {
      skip: !productId,
    });

  console.log("Product ID:", productId);

  const { data: wishlistData } = useGetWishlistQuery(
    { userId },
    { skip: !userId }
  );

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const getProductId = (productId: string | IProduct) =>
    typeof productId === "string" ? productId : productId._id;

  const isWishlisted =
    !!product &&
    wishlistData?.data?.some(
      (item) => getProductId(item.productId) === product._id
    );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const discountedPrice =
    product?.isDiscountActive && product.discountPercentage
      ? product.price - (product.price * product.discountPercentage) / 100
      : product?.price;

  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = async () => {
    if (!product) {
      toast.error("Product not loaded yet");
      return;
    }

    if (!userId) {
      toast.error("Please login to add items to cart");
      router.push("/signin");
      return;
    }

    if (isOutOfStock) {
      toast.error("This product is out of stock");
      return;
    }

    try {
      await addToCart({
        userId,
        productId: product._id,
        quantity,
      }).unwrap();

      toast.success(`Added ${quantity} × ${product.name} to cart`);
    } catch (isError) {
      toast.error("Failed to add item to cart");
      console.error(isError);
    }
  };

  // ✅ Loading State
  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 animate-pulse">
          <div className="aspect-square bg-muted rounded-xl" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-6 bg-muted rounded w-1/3" />
          </div>
        </div>
      </section>
    );
  }

  // ❌ Error State
  if (isError || !product) {
    return (
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-destructive">
          Product not found
        </h2>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 🖼 Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-64 md:h-125 rounded-xl overflow-hidden border"
        >
          <Image
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />

          {product.isDiscountActive && product.discountPercentage && (
            <Badge className="absolute top-4 left-4 bg-rose-600 text-white">
              -{product.discountPercentage}% OFF
            </Badge>
          )}
        </motion.div>

        {/* 📄 Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <div className="flex gap-2">
            {product.brandId && (
              <Badge variant="secondary">{product.brandId.name}</Badge>
            )}
            {product.categoryId && (
              <Badge variant="outline">{product.categoryId.name}</Badge>
            )}
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < 4
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground">(4.0)</span>
          </div>

          {/* 💰 Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-rose-600">
              {formatPrice(discountedPrice!)}
            </span>

            {product.isDiscountActive && (
              <span className="line-through text-muted-foreground">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* 📦 Stock */}
          {product.stock > 0 ? (
            <Badge className="w-fit bg-emerald-600 text-white">
              Only {product.stock} left
            </Badge>
          ) : (
            <Badge variant="destructive" className="mb-3 w-fit">
              Out of Stock
            </Badge>
          )}

          <Separator />

          {/* 📝 Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="px-3 py-1 text-sm font-medium">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* 🛒 Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock || adding}
              className={`w-full bg-rose-700 hover:bg-rose-900 ${
                isOutOfStock ? "cursor-not-allowed opacity-60" : ""
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <ShoppingCart className="w-4 h-4 mr-2" />
              )}
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>

            {/* Heart Button */}
            <Button
              variant="outline"
              size="lg"
              onClick={async () => {
                if (!userId) {
                  toast.error("Please login first");
                  return;
                }

                try {
                  if (isWishlisted) {
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

                    toast.success(
                      product.stock === 0
                        ? "Saved for later (out of stock)"
                        : "Added to wishlist"
                    );
                  }
                } catch {
                  toast.error("Wishlist action failed");
                }
              }}
            >
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted ? "fill-rose-600 text-rose-600" : "text-rose-600"
                }`}
              />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-rose-600" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-rose-600" />
              <span>Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="h-4 w-4 text-rose-600" />
              <span>Easy Returns</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 📌 Specifications (Optional) */}
      {product.specifications && product.specifications.length > 0 && (
        <Card className="mt-16">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Specifications</h3>
            <ul className="space-y-2">
              {product.specifications.map((spec) => (
                <li
                  key={spec.id}
                  className="flex justify-between border-b py-2 text-sm"
                >
                  <span className="font-medium">{spec.key}</span>
                  <span className="text-muted-foreground">{spec.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* 🔽 Product Tabs Section */}
      <div className="mt-20">
        <Tabs defaultValue="reviews" className="w-full">
          {/* Tabs Header */}
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.reviews?.length ?? 0})
            </TabsTrigger>
            <TabsTrigger value="qa">
              Q&A ({product.questions?.length ?? 0})
            </TabsTrigger>
          </TabsList>

          {/* 📌 Overview */}
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader className="p-4 m-4 space-y-4">
                <CardTitle className="text-lg">
                  Product Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {specsLoading ? (
                  <p className="text-sm text-muted-foreground">
                    Loading specifications...
                  </p>
                ) : specifications?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-0">
                    {specifications.map((spec) => (
                      <div
                        key={spec.id}
                        className="flex justify-between border-b pb-4 text-sm"
                      >
                        <span className="font-medium">{spec.key}</span>
                        <span className="text-muted-foreground">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No specifications available.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ⭐ Reviews */}
          <TabsContent value="reviews" className="mt-8">
            <Card>
              <CardContent className="p-6 space-y-6">
                <ReviewForm productId={product._id} />
                <Separator />

                {/* Reviews List (future) */}
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {product.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {review.user.name}
                          </span>
                          <div className="flex gap-1">
                            {Array.from({ length: review.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                />
                              )
                            )}
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No Reviews Yet
                      </h3>
                      <p className="text-muted-foreground">
                        Be the first to review this product!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ❓ Q&A */}
          <TabsContent value="qa" className="mt-8">
            <Card>
              <CardContent className="p-6 space-y-6">
                <QuestionForm productId={product._id} />

                <Separator />

                {/* Questions List */}
                {product.questions && product.questions.length > 0 ? (
                  <div className="space-y-4">
                    {product.questions.map((q) => (
                      <div
                        key={q.id}
                        className="border rounded-lg p-4 space-y-2"
                      >
                        <p className="font-medium">{q.question}</p>

                        {q.answer ? (
                          <div className="bg-muted p-3 rounded-md text-sm">
                            <span className="font-semibold">Answer:</span>{" "}
                            {q.answer.answer}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No answer yet
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No Questions Yet
                      </h3>
                      <p className="text-muted-foreground">
                        Be the first to ask a question about this product!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
