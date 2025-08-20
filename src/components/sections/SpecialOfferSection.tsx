/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Megaphone,
  Sparkles,
  Gift,
  Clock,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

export function SpecialOfferSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 480,
    hours: 3,
    minutes: 33,
    seconds: 25,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-15 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium border border-orange-200 animate-pulse"
            >
              <Sparkles className="w-4 h-4" />
              Limited Time Offer
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-lg"
                >
                  <Megaphone className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Get a{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    30% Discount!
                  </span>
                </h1>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-2xl font-semibold text-gray-700"
              >
                Create Your Free Account Today!
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-600 max-w-lg leading-relaxed"
            >
              Join thousands of satisfied customers and unlock exclusive
              benefits. Limited time offer - don&apos;t miss out on this
              incredible opportunity to save big!
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { icon: Gift, text: "Exclusive Benefits" },
                { icon: Users, text: "10K+ Happy Customers" },
                { icon: Star, text: "5-Star Rated" },
              ].map((feature, index) => (
                <div
                  key={feature.text}
                  className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200"
                >
                  <feature.icon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {feature.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                Join Now - Save 30%
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Countdown Timer with Circular Design */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end relative"
          >
            <div className="relative">
              {/* Large Circular Progress Background */}
              <motion.div
                className="absolute inset-0 w-[500px] h-[500px] -top-16 -left-16"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <svg className="w-full h-full opacity-30" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient
                      id="circleGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="25%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="75%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="url(#circleGradient)"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                    className="drop-shadow-lg"
                  />
                </svg>

                {/* Circling Numbers */}
                {[27, 28, 25, 24, 23, 26, 29, 22].map((num, index) => {
                  const angle = index * 45 * (Math.PI / 180); // 45 degrees apart
                  const radius = 85;
                  const x = 100 + radius * Math.cos(angle - Math.PI / 2);
                  const y = 100 + radius * Math.sin(angle - Math.PI / 2);

                  return (
                    <motion.div
                      key={`${num}-${index}`}
                      className="absolute w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-sm font-bold text-blue-600 shadow-lg border-2 border-blue-200"
                      style={{
                        left: `${(x / 200) * 100}%`,
                        top: `${(y / 200) * 100}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.25,
                      }}
                    >
                      {num}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Secondary Rotating Circle */}
              <motion.div
                className="absolute inset-0 w-[400px] h-[400px] -top-8 -left-8"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 25,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <svg className="w-full h-full opacity-20" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="75"
                    fill="none"
                    stroke="url(#circleGradient)"
                    strokeWidth="1"
                    strokeDasharray="5 10"
                  />
                </svg>
              </motion.div>

              {/* Main Content Area */}
              <div className="relative z-10 space-y-8">
                {/* Timer Header */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Offer Expires In
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Don&apos;t miss this limited-time opportunity!
                  </p>
                </div>

                {/* Countdown Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      value: timeLeft.days,
                      label: "Days",
                      color: "from-blue-500 to-blue-600",
                    },
                    {
                      value: timeLeft.hours,
                      label: "Hours",
                      color: "from-purple-500 to-purple-600",
                    },
                    {
                      value: timeLeft.minutes,
                      label: "Minutes",
                      color: "from-cyan-500 to-cyan-600",
                    },
                    {
                      value: timeLeft.seconds,
                      label: "Seconds",
                      color: "from-indigo-500 to-indigo-600",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="relative group"
                    >
                      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />
                        <CardContent className="p-6 text-center relative z-10">
                          <motion.div
                            key={item.value}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
                          >
                            {item.value.toString().padStart(2, "0")}
                          </motion.div>
                          <div className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                            {item.label}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Urgency Message */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-center p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200"
                >
                  <p className="text-red-600 font-semibold">
                    ⚡ Only 247 spots left at this price!
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
