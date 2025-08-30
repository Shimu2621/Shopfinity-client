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
import { ShinyButton } from "../magicui/shiny-button";
import { AuroraText } from "../magicui/aurora-text";
import Offer from "../../app/assets/offer.png";
import Image from "next/image";

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
    <section className="relative py-15 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-gradient-to-br dark:from-slate-600 dark:via-blue-500 dark:to-rose-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-gray-100/20 to-blue-400/20 rounded-full blur-lg"
          animate={{
            scale: [1, 1.5, 2],
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
      </div>

      <div className="container mx-auto  relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <ShinyButton className="relative inline-block px-6 py-3 rounded-full text-lg font-bold mb-4 bg-badge text-black overflow-hidden">
              🔥 LIMITED TIME OFFER
            </ShinyButton>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="relative">
                  <h2 className=" text-4xl lg:text-5xl text-center font-bold text-forground ">
                    Featured{" "}
                    <AuroraText className="text-blue-800 italic">
                      30% Discount!{" "}
                    </AuroraText>
                  </h2>
                  <motion.div
                    className="absolute -top-14 -right-24"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src={Offer}
                      alt="Special-offer"
                      width={110}
                      height={110}
                    />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-2xl text-muted-foreground font-semibold"
              >
                Create Your Free Account Today!
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg max-w-lg leading-relaxed text-muted-foreground mb-4"
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
              <Button className="bg-rose-700 hover:bg-rose-600 text-white px-8 py-4  font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group ">
                Join Now - Save 30%
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="inline-block ml-2"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
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
              </motion.div>

              {/* Secondary Rotating Circle */}
              <motion.div
                className="absolute inset-0 w-[400px] h-[400px] -top-4 -left-2"
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
                      whileHover={{ scale: 1.05 }}
                      className="relative group"
                    >
                      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />
                        <CardContent className="p-4 text-center relative ">
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
                  className="text-center p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl border border-red-200 animate-pulse"
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
