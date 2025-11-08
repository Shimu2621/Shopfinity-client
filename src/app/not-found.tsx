"use client";

import { motion, Variants } from "framer-motion";
import { ShoppingBag, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  // Animation variants with proper Framer Motion types
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const rotateVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  };

  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-blue-50 to-rose-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated background blobs - rose and blue theme */}
      <motion.div
        className="absolute top-20 left-10 w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          x: [0, 40, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          x: [0, -40, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      {/* Added third animated blob in the center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Content Container */}
      <motion.div
        className="relative z-10 text-center max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating Shopping Bag Icon */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={floatVariants}
          animate="animate"
        >
          <motion.div
            className="relative"
            variants={pulseVariants}
            animate="animate"
          >
            {/* Updated icon color to rose from blue */}
            <ShoppingBag
              className="w-24 h-24 text-rose-500"
              strokeWidth={1.5}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-rose-400"
              variants={rotateVariants}
              animate="animate"
            />
          </motion.div>
        </motion.div>

        {/* 404 Heading */}
        <motion.div variants={itemVariants} className="mb-4">
          {/* Updated gradient colors to rose and blue theme */}
          <h1 className="text-7xl sm:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-400 to-blue-500 drop-shadow-lg">
            404
          </h1>
        </motion.div>

        {/* Main Text */}
        <motion.div variants={itemVariants} className="mb-4">
          {/* Updated text colors for rose and blue theme */}
          <h2 className="text-3xl sm:text-4xl font-bold text-rose-900 mb-2">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-blue-800 text-balance">
            The page you&rsquore looking for has gone shopping elsewhere.
            Don&rsquot worry, we&rsquoll help you find your way back!
          </p>
        </motion.div>

        {/* Animated Dots */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-2 mb-12"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-400 to-blue-400"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {/* Updated button gradient to rose-blue theme */}
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold px-8 gap-2 shadow-lg"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </motion.div>
          </Link>

          <Link href="/shop">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {/* Updated outline button border and hover colors to blue */}
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold px-8 gap-2 bg-white shadow-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-sm text-blue-600"
        >
          <p>Error Code: 404 | Page Not Found</p>
        </motion.div>
      </motion.div>
    </main>
  );
}
