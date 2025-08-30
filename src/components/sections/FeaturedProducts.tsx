"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Eye, ArrowRight } from "lucide-react";
import type { IProduct } from "@/types";
import Image from "next/image";
import { getFeaturedProducts } from "@/services/product";
import { ShinyButton } from "../magicui/shiny-button";
import { AuroraText } from "../magicui/aurora-text";
import Link from "next/link";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const prods = await getFeaturedProducts();
        setProducts(prods);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setError(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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

  if (loading) {
    return (
      <section className="py-16 px-4 container mx-auto">
        <div className="text-center mb-12">
          <div className="h-8 bg-muted animate-pulse rounded-lg w-64 mx-auto mb-4" />
          <div className="h-4 bg-muted animate-pulse rounded w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-square bg-muted animate-pulse" />
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

  if (error) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto text-center">
        <div className="text-destructive">
          <h2 className="text-2xl font-bold mb-4">Error Loading Products</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-background">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden rounded-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                      <Eye className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex flex-col">
                    {/* Featured Badge */}
                    {product.featured && (
                      <Badge className="absolute top-2 left-3 font-bold text-sm bg-blue-600 text-white">
                        Featured
                      </Badge>
                    )}
                    {/* Discount Badge */}
                    {product.isDiscountActive && product.discountPercentage && (
                      <Badge className="absolute top-10 left-3 font-bold text-sm bg-destructive text-white">
                        -{product.discountPercentage}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10"
                    >
                      <Heart className="w-6 h-6" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
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

                <CardContent className="p-4">
                  <div className="flex justify-between">
                    {product.brand && (
                      <Badge variant="secondary" className="text-md mb-2">
                        {product.brand.name}
                      </Badge>
                    )}
                    {product.category && (
                      <Badge variant="secondary" className="text-md mb-2">
                        {product.category.name}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
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
                    <span className="text-sm text-muted-foreground ml-1">
                      (4.0)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {product.isDiscountActive && product.discountPercentage ? (
                      <>
                        <span className="text-lg font-bold text-muted-foreground">
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
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && !loading && (
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
