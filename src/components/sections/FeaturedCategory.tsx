"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/services/category";
import { Category } from "@/types";
import { ShinyButton } from "../magicui/shiny-button";
import Image from "next/image";
import { AuroraText } from "../magicui/aurora-text";
// import { ShoppingBag } from "lucide-react";

// const baseURL = "https://single-vendor-backend-zz7x.onrender.com";

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

export default function FeaturedCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading categories...</p>;
  }

  return (
    <section className="py-12 bg-secondary">
      <div className="container  mx-auto px-4 flex flex-col items-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8  gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardContent className="flex flex-col items-center text-center">
                  <div
                    className={`mb-4 flex items-center justify-center w-16 h-16 rounded-full ${
                      colors[index % colors.length] // cycle through colors
                    }`}
                  >
                    <Image
                      src={category.icon!}
                      alt={category.name}
                      width={32}
                      height={32}
                      className="inline-flex items-center justify-center w-6 h-6"
                    />
                  </div>
                  <CardTitle className="text-md font-semibold">
                    {category.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground line-clamp-1 truncate max-w-[150px]">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
