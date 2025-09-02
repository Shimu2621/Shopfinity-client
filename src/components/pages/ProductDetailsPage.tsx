"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const productImages = [
  "/images/lg-monitor-main.png",
  "/lg-monitor-side-view.png",
  "/lg-monitor-back-view.png",
  "/lg-monitor-stand-detail.png",
];

const thumbnailImages = [
  "/lg-monitor-gaming-scene-1.png",
  "/lg-monitor-gaming-scene-2.png",
];

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div
            className="relative aspect-[4/3] bg-card rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground">
              32&rdquo; OLED
            </Badge>

            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={productImages[selectedImage]}
                alt="LG UltraFine OLED Pro Monitor"
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <motion.button
                key={index}
                className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-border"
                }`}
                onClick={() => setSelectedImage(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  width={800}
                  height={800}
                  src={image || "/placeholder.svg"}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>

          {/* Additional Thumbnails */}
          <div className="grid grid-cols-2 gap-2">
            {thumbnailImages.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-[3/2] rounded-md overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  width={200}
                  height={200}
                  src={image || "/placeholder.svg"}
                  alt={`Gaming scene ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <Badge variant="secondary" className="mb-2">
              LED
            </Badge>
            <h1 className="text-3xl font-bold text-balance mb-2">
              LG UltraFine OLED Pro 32EP950
            </h1>
            <p className="text-muted-foreground">32 inches</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">$2,759.99</span>
              <span className="text-lg text-muted-foreground line-through">
                $2,999.99
              </span>
            </div>
            <p className="text-sm text-accent font-medium">You save $240.00</p>
            <p className="text-sm text-green-600 font-medium">
              ✓ In Stock (14 available)
            </p>
          </div>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                32-inch 4K OLED professional monitor with HDR, 99% DCI-P3 &
                Adobe RGB coverage, and exceptional color accuracy.
              </p>
            </CardContent>
          </Card>

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

          <div className="flex gap-3">
            <Button className="flex-1" size="lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span>Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="h-4 w-4 text-primary" />
              <span>Easy Returns</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (0)</TabsTrigger>
            <TabsTrigger value="qa">Q&A (0)</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Product Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Screen Size:</span> 32 inches
                  </div>
                  <div>
                    <span className="font-medium">Resolution:</span> 4K UHD
                    (3840 x 2160)
                  </div>
                  <div>
                    <span className="font-medium">Panel Type:</span> OLED
                  </div>
                  <div>
                    <span className="font-medium">Color Gamut:</span> 99%
                    DCI-P3, Adobe RGB
                  </div>
                  <div>
                    <span className="font-medium">HDR Support:</span> HDR10,
                    Dolby Vision
                  </div>
                  <div>
                    <span className="font-medium">Connectivity:</span> USB-C,
                    HDMI, DisplayPort
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              star <= rating
                                ? "fill-accent text-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Your Review
                    </label>
                    <Textarea
                      placeholder="Share your experience with this product..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button className="w-full">Submit Review</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="text-center py-12 text-muted-foreground">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Star className="h-8 w-8" />
                  </div>
                  <h4 className="font-medium mb-2">No Reviews Yet</h4>
                  <p className="text-sm">
                    Be the first to review this product!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qa" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  <h4 className="font-medium mb-2">No Questions Yet</h4>
                  <p className="text-sm">
                    Be the first to ask a question about this product!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
