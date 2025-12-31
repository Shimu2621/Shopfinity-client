"use client";

// import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Headphones,
  Tv,
  Camera,
  Smartphone,
  Video,
  Gamepad2,
  Watch,
  Book,
  Tablet,
  Shirt,
  Laptop,
  Package,
} from "lucide-react";
import { ICategory } from "@/types";
import { ShinyButton } from "../magicui/shiny-button";
import { AuroraText } from "../magicui/aurora-text";
import { useGetAllCategoriesQuery } from "@/redux/api/category/categoryApi";
import { useEffect, useState } from "react";

// Define color palette
const colors = [
  "bg-pink-100 text-pink-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-yellow-100 text-yellow-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
  "bg-red-100 text-red-600",
  "bg-teal-100 text-teal-600",
  "bg-orange-100 text-orange-600",
  "bg-teal-100 text-teal-600",
];

const categoryIconMap: Record<string, React.ElementType> = {
  Headphone: Headphones,
  TV: Tv,
  Cameras: Camera,
  Mobile: Smartphone,
  "Action Camera": Video,
  "Gaming Console": Gamepad2,
  Accessories: Package,
  Watch: Watch,
  Books: Book,
  Laptop: Laptop,
  Fashion: Shirt,
  Tablets: Tablet,
};

export default function FeaturedCategory() {
  const { data, isLoading, isError } = useGetAllCategoriesQuery();
  const [isVisible, setIsVisible] = useState(false);

  const categories: ICategory[] = data?.data ?? [];

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 bg-secondary">
        <div className="px-4 flex flex-col items-center">
          {/* Header Skeleton */}
          <div className="h-10 w-48 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse mb-6" />
          <div className="h-12 w-[420px] max-w-full rounded bg-gray-300 dark:bg-gray-700 animate-pulse mb-4" />
          <div className="h-4 w-[520px] max-w-full rounded bg-gray-200 dark:bg-gray-600 animate-pulse mb-10" />

          {/* Cards Grid Skeleton */}
          <div className="container mx-auto max-w-[1480px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm bg-background dark:border dark:border-gray-400"
              >
                <CardContent className="flex flex-col items-center text-center py-6 animate-pulse">
                  {/* Icon Circle Skeleton */}
                  <div className="mb-4 w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600" />

                  {/* Title Skeleton */}
                  <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-2" />

                  {/* Description Skeleton */}
                  <div className="h-3 w-32 bg-gray-200 dark:bg-gray-500 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 text-center text-red-500">
        Failed to load categories
      </section>
    );
  }

  return (
    <section className="py-12 bg-secondary">
      <div className=" px-4 flex flex-col items-center">
        <ShinyButton className="relative inline-block px-6 py-3 rounded-full text-lg font-bold mb-4 bg-badge text-black overflow-hidden">
          🛍️ Shop By Category
        </ShinyButton>
        <h2 className="text-4xl lg:text-5xl text-center font-bold text-forground mb-6">
          Featured{" "}
          <AuroraText className="text-blue-800 italic">Categories </AuroraText>
          <br />
          Handpicked Just for You
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mb-8">
          Discover our most popular product categories, carefully curated to
          make your shopping experience faster and easier.
        </p>
        <div className="container mx-auto max-w-[1480px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-6">
          {categories.map((category, index) => {
            const Icon = categoryIconMap[category.name] || Package;

            return (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  className={`relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border-0  shadow-sm bg-background dark:border dark:border-gray-400 cursor-pointer ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                  }}
                >
                  <CardContent className="flex flex-col items-center text-center">
                    <div
                      className={`mb-4 flex items-center justify-center w-16 h-16 rounded-full ${
                        colors[index % colors.length]
                      }`}
                    >
                      {/* ✅ ICON FROM MAP */}
                      <Icon className="w-7 h-7" />
                    </div>

                    <CardTitle className="text-lg font-bold">
                      {category.name}
                    </CardTitle>

                    <p className="text-xs text-muted-foreground line-clamp-1 truncate max-w-[190px]">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
