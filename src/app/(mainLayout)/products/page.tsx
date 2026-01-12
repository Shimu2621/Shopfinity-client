//src>app>(mainLayout)>products>page.tsx:
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import type { IProduct } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

import { ShinyButton } from "@/components/magicui/shiny-button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useGetAllProductsQuery } from "@/redux/api/product/productApi";
import { useAddToCartMutation } from "@/redux/api/cart/cartApi";
import { toast } from "sonner";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks/hooks";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const { data, isLoading, isError } = useGetAllProductsQuery({
    page: currentPage.toString(),
    limit: itemsPerPage.toString(),
  });

  const { user } = useAppSelector((state) => state.auth);
  const userId = user?._id;
  const [addToCart] = useAddToCartMutation();

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

  // Pagination logic
  // const products = data?.products ?? [];
  // const totalPages = Math.ceil((data?.total ?? 0) / (data?.limit ?? 1));

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const limit = data?.limit ?? itemsPerPage;
  const totalPages = Math.ceil(total / limit);

  const currentProducts: IProduct[] = products;

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    if (page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number.parseInt(value));
    setCurrentPage(1);
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
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Section Heading */}
        <ShinyButton className="relative inline-block px-6 py-3 rounded-full text-lg font-bold mb-4 bg-badge text-black overflow-hidden">
          🛒 All Featured Products
        </ShinyButton>

        <h2 className="text-4xl lg:text-5xl text-center font-bold text-forground mb-6">
          Browse our{" "}
          <AuroraText className="text-blue-800 italic">complete</AuroraText>
          <br /> collection of products!
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mb-8">
          Explore our full range of products, including the latest arrivals and
          top-rated items. Find everything you need in one place
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product, index) => {
            console.log("PRODUCT OBJECT:", product);

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
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
                      {product.isDiscountActive &&
                        product.discountPercentage && (
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

                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10"
                      >
                        <Heart className="w-6 h-6" />
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
                      <span className="text-sm text-muted-foreground ml-1">
                        (4.0)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {product.isDiscountActive &&
                      product.discountPercentage ? (
                        <>
                          <span className="text-lg font-bold text-rose-600">
                            {formatPrice(
                              calculateDiscountedPrice(
                                product.price,
                                product.discountPercentage
                              )
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
              </motion.div>
            );
          })}
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

        {/* Pagination Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-16 border-t">
          {/* Items per page selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="48">48</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">per page</span>
          </div>

          {/* Results info */}
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, total)} of {total} results
          </div>

          {/* Pagination buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {/* Page numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className="w-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Pagination Section */}
        {/* <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </section>
  );
}
