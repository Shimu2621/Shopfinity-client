"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Smartphone,
  Laptop,
  Headphones,
  Gift,
  Users,
  Watch,
  Camera,
  LayoutGrid,
  Gamepad2Icon as GameController2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import airpodImg from "@/app/assets/airpod.png";
import iphoneImg from "@/app/assets/iphone.png";
import macbookImg from "@/app/assets/macbook.png";
// import { RainbowButton } from "@/components/magicui/rainbow-button";

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    count: 1234,
    iconColor: "text-blue-500",
  },
  { name: "Laptops", icon: Laptop, count: 856, iconColor: "text-purple-500" },
  { name: "Audio", icon: Headphones, count: 432, iconColor: "text-green-500" },
  { name: "Wearables", icon: Watch, count: 298, iconColor: "text-orange-500" },
  { name: "Cameras", icon: Camera, count: 167, iconColor: "text-red-500" },
  {
    name: "Gaming",
    icon: GameController2,
    count: 543,
    iconColor: "text-indigo-500",
  },
  { name: "Tablets", icon: Smartphone, count: 324, iconColor: "text-cyan-500" },
  {
    name: "Smart Home",
    icon: Smartphone,
    count: 189,
    iconColor: "text-emerald-500",
  },
  {
    name: "Accessories",
    icon: Headphones,
    count: 756,
    iconColor: "text-pink-500",
  },
  { name: "Software", icon: Laptop, count: 234, iconColor: "text-violet-500" },
  { name: "Books", icon: Smartphone, count: 892, iconColor: "text-amber-500" },
  { name: "Sports", icon: Watch, count: 445, iconColor: "text-lime-500" },
  {
    name: "Fashion",
    icon: Smartphone,
    count: 1123,
    iconColor: "text-rose-500",
  },
  {
    name: "Beauty",
    icon: Smartphone,
    count: 667,
    iconColor: "text-fuchsia-500",
  },
  {
    name: "Home & Garden",
    icon: Smartphone,
    count: 389,
    iconColor: "text-teal-500",
  },
  {
    name: "Automotive",
    icon: Smartphone,
    count: 234,
    iconColor: "text-slate-500",
  },
  { name: "Health", icon: Watch, count: 456, iconColor: "text-sky-500" },
  {
    name: "Toys",
    icon: GameController2,
    count: 678,
    iconColor: "text-yellow-500",
  },
];

const heroSlides = [
  {
    id: 1,
    title: "Latest iPhone 15 Pro",
    subtitle: "Experience the future",
    description:
      "Get the newest iPhone with advanced features and stunning design",
    image: iphoneImg,
    price: "$999",
    originalPrice: "$1199",
  },
  {
    id: 2,
    title: "MacBook Air M3",
    subtitle: "Power meets portability",
    description:
      "Ultra-thin, ultra-fast, and ultra-capable laptop for professionals",
    image: macbookImg,
    price: "$1299",
    originalPrice: "$1499",
  },
  {
    id: 3,
    title: "AirPods Pro 2",
    subtitle: "Immersive audio experience",
    description: "Active noise cancellation and spatial audio technology",
    image: airpodImg,
    price: "$249",
    originalPrice: "$299",
  },
];

export default function HeroSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1"
        >
          <Card className="p-4 h-[675px] flex flex-col">
            <Button className="font-semibold text-white text-lg flex-shrink-0 gap-3  bg-rose-700 hover:shadow-sm">
              <LayoutGrid className="w-5 h-5" />
              All Categories
            </Button>
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 pr-2">
                <div className="space-y-2">
                  {categories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <motion.div
                        key={category.name}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          activeCategory === index
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "hover:bg-muted hover:shadow-sm"
                        }`}
                        onClick={() => setActiveCategory(index)}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            className={`${category.iconColor} ${
                              activeCategory === index
                                ? "text-primary-foreground"
                                : ""
                            }`}
                          >
                            <IconComponent className="h-5 w-5" />
                          </motion.div>
                          <span className="font-medium text-sm">
                            {category.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {category.count}
                          </span>
                          <motion.div
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex-shrink-0 mt-2 text-center">
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs text-muted-foreground"
              >
                Scroll for more
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Hero Carousel */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="relative h-[450px] rounded-xl overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              loop
              className="h-full"
            >
              {heroSlides.map((slide, index) => (
                <SwiperSlide key={slide.id}>
                  <div className="relative h-full bg-gradient-to-r from-blue-800 to-rose-500 text-white">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 h-full flex items-center">
                      <div className="container mx-auto px-14">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="space-y-4"
                          >
                            <span className="text-sm font-medium animate-pulse bg-white/20 px-4 py-2 rounded-full">
                              {slide.subtitle}
                            </span>
                            <h1 className="text-4xl md:text-5xl pt-4 font-bold leading-tight">
                              {slide.title}
                            </h1>
                            <p className="text-lg text-white/90">
                              {slide.description}
                            </p>
                            <div className="flex items-center space-x-4">
                              <span className="text-3xl font-bold">
                                {slide.price}
                              </span>
                              <span className="text-lg text-white/70 line-through">
                                {slide.originalPrice}
                              </span>
                            </div>
                            <div className="flex space-x-4 pt-4">
                              <Button
                                size="lg"
                                className="bg-rose-700 text-white hover:bg-rose-600"
                              >
                                Shop Now
                              </Button>
                              {/* <RainbowButton variant="outline">
                                Get Unlimited Access
                              </RainbowButton> */}

                              <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                              >
                                Learn More
                              </Button>
                            </div>
                          </motion.div>
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="hidden md:block"
                          >
                            <Image
                              width={600}
                              height={400}
                              src={slide.image || "/placeholder.svg"}
                              alt={slide.title}
                              className="w-full h-auto max-w-md mx-auto"
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Special Offers */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fast Delivery Card */}
            <Card className=" p-4 rounded-lg shadow-lg text-center ">
              <div className="space-y-1">
                <div className="relative flex items-center justify-center animate-pulse mx-auto mb-2 p-3 bg-rose-100 rounded-full w-16 h-16  transition-all duration-300 hover:rotate-6">
                  <div className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-rose-300">
                    <Gift className="w-6 h-6 text-rose-600" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold">Special Offer!</h4>
                <p className="text-sm mb-3">
                  Limited time only! Get 20% off + free shipping on your first
                  order.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-rose-600 text-white hover:bg-rose-600"
                >
                  Claim Now
                </Button>
              </div>
            </Card>

            {/* Exclusive Membership Card */}
            <Card className=" p-4 rounded-lg shadow-lg text-center">
              <div className="space-y-2">
                <div className="relative flex items-center justify-center animate-pulse mx-auto mb-2 p-3 bg-rose-100 rounded-full w-16 h-16  transition-all duration-300 hover:rotate-6">
                  <div className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-rose-300">
                    <Users className="w-6 h-6 text-rose-600" />
                  </div>
                </div>

                <h4 className="text-xl font-bold"> Exclusive Member Perks</h4>
                <p className="text-sm">
                  Join our loyalty program and get early access to deals and new
                  arrivals.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-rose-600 text-white hover:bg-rose-500"
                >
                  Join Now
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
