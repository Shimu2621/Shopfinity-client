/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Target,
  Heart,
  Lightbulb,
  Globe,
  Shield,
  Rocket,
  Eye,
  Award,
  TrendingUp,
  Star,
  HeartHandshake,
  ShoppingCart,
  Truck,
  CreditCard,
  Headphones,
  Package,
} from "lucide-react";
// import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { OrbitingCircles } from "../magicui/orbiting-circles";
import { ShinyButton } from "../magicui/shiny-button";
import { AuroraText } from "../magicui/aurora-text";

const stats = [
  { label: "Happy Customers", value: "50K+", icon: Users, count: 50000 },
  { label: "Orders Delivered", value: "250K+", icon: Target, count: 250000 },
  { label: "Countries Served", value: "45+", icon: Globe, count: 45 },
  { label: "Customer Rating", value: "4.9", icon: Star, count: 4.9 },
];

const missionCards = [
  {
    title: "Customer Excellence",
    description:
      "Delivering exceptional experiences through personalized service and premium quality products.",
    icon: Award,
  },
  {
    title: "Innovation Drive",
    description:
      "Continuously evolving our platform with cutting-edge technology and user-centric design.",
    icon: Lightbulb,
  },
  {
    title: "Global Reach",
    description:
      "Connecting customers worldwide with seamless shopping experiences across all markets.",
    icon: Globe,
  },
  {
    title: "Trust & Security",
    description:
      "Building lasting relationships through transparent practices and secure transactions.",
    icon: Shield,
  },
];

const orbitIcons = [
  { Icon: ShoppingCart, color: "text-blue-500", size: "w-8 h-8", delay: 0 },
  { Icon: Truck, color: "text-green-500", size: "w-7 h-7", delay: 45 },
  { Icon: CreditCard, color: "text-purple-500", size: "w-8 h-8", delay: 90 },
  { Icon: Headphones, color: "text-orange-500", size: "w-7 h-7", delay: 135 },
  { Icon: Shield, color: "text-red-500", size: "w-8 h-8", delay: 180 },
  { Icon: Star, color: "text-yellow-500", size: "w-7 h-7", delay: 225 },
  { Icon: Package, color: "text-indigo-500", size: "w-8 h-8", delay: 270 },
  { Icon: Users, color: "text-teal-500", size: "w-7 h-7", delay: 315 },
];

const visionCards = [
  {
    title: "Market Leadership",
    description:
      "Becoming the world's most trusted and innovative ecommerce platform by 2030.",
    icon: TrendingUp,
  },
  {
    title: "Sustainable Future",
    description:
      "Leading the industry in sustainable practices and environmentally conscious commerce.",
    icon: Eye,
  },
  {
    title: "Technology Pioneer",
    description:
      "Pioneering next-generation shopping experiences through AI and emerging technologies.",
    icon: Rocket,
  },
  {
    title: "Community Impact",
    description:
      "Empowering millions of businesses and creators to thrive in the digital economy.",
    icon: Heart,
  },
];

export function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          stats.forEach((stat, index) => {
            const increment = stat.count / 50;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.count) {
                current = stat.count;
                clearInterval(timer);
              }
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current * 10) / 10;
                return newCounters;
              });
            }, 50);
          });
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 px-4 scroll-mt-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <ShinyButton className="relative inline-block px-6 py-3 rounded-full text-lg font-bold mb-4 bg-badge text-black overflow-hidden dark:font-bold">
            🌍 WHO WE ARE
          </ShinyButton>
          <h2 className="text-4xl lg:text-5xl text-center font-bold text-forground mb-4">
            Your Trusted{" "}
            <AuroraText className="text-blue-800 italic">Partner</AuroraText>{" "}
            <br /> in Online Shopping
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At ShopFinity, we believe shopping should be simple, secure, and
            enjoyable. Our mission is to bring you high-quality products at the
            best prices, paired with excellent customer services.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start mb-16">
          {/* Mission Section */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="text-2xl flex flex-start gap-3  items-center font-bold mb-4 text-blue-700">
              <div className="p-2 bg-blue-100 rounded-full">
                <Rocket />
              </div>
              Our Mission
            </div>
            <div className="space-y-6">
              {missionCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <Card
                    key={index}
                    className={`p-4 hover:shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer group border-l-4 border-l-blue-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                          <IconComponent className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 group-hover:text-blue-600 transition-colors duration-300">
                            {card.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden">
            <OrbitingCircles iconSize={50}>
              <ShoppingCart className="w-12 h-12 text-blue-600 rounded-full p-2 bg-blue-100 border border-slate-200" />
              <Package className="w-12 h-12 text-red-600 rounded-full p-2 bg-red-100 border border-slate-200" />
              <Star className="w-12 h-12 text-green-600 rounded-full p-2 bg-green-100 border border-slate-200" />
              <Headphones className="w-12 h-12 text-orange-600 rounded-full p-2 bg-orange-100 border border-slate-200" />
              <CreditCard className="w-12 h-12 text-purple-600 rounded-full p-2 bg-purple-100 border border-slate-200" />
            </OrbitingCircles>
            <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
              <Truck className="w-8 h-8 text-rose-700 rounded-full p-2 bg-rose-100 border border-slate-200" />
              <Shield className="w-8 h-8 text-green-700 rounded-full p-2 bg-green-100 border border-slate-200" />
              <Users className="w-10 h-8 text-amber-700 rounded-full p-2 bg-amber-100 border border-slate-200" />
              <Package className="w-8 h-8 text-indigo-600 rounded-full p-2 bg-indigo-100 border border-slate-200" />
            </OrbitingCircles>

            <div className="absolute inset-1/2 w-16 h-16 -ml-8 -mt-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Vision Section */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="text-2xl flex items-start gap-3 font-bold text-center mb-4  text-rose-600">
              <div className="p-2 bg-rose-100 rounded-full">
                <HeartHandshake />
              </div>
              Our Vision
            </div>
            <div className="space-y-6">
              {visionCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <Card
                    key={index}
                    className={`p-4 hover:shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer group border-l-4 border-l-rose-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors duration-300">
                          <IconComponent className="h-5 w-5 text-rose-600 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 group-hover:text-rose-600 transition-colors duration-300">
                            {card.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const colorSchemes = [
                {
                  iconBg: "bg-blue-500",
                  iconBorder: "border-blue-200",
                  text: "text-gray-900",
                },
                {
                  iconBg: "bg-emerald-500",
                  iconBorder: "border-emerald-200",
                  text: "text-gray-900",
                },
                {
                  iconBg: "bg-orange-500",
                  iconBorder: "border-orange-200",
                  text: "text-gray-900",
                },
                {
                  iconBg: "bg-purple-500",
                  iconBorder: "border-purple-200",
                  text: "text-gray-900",
                },
              ];
              const scheme = colorSchemes[index];

              return (
                <Card
                  key={index}
                  className={`text-center p-6 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 cursor-pointer group border ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div
                        className={`w-16 h-16 ${scheme.iconBg} rounded-full border-4 ${scheme.iconBorder}  flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300`}
                      >
                        <IconComponent className="h-8 w-8 text-white animate-pulse" />
                      </div>
                    </div>
                    <div
                      className={`text-4xl font-bold ${scheme.text} mb-2 transition-colors duration-300 dark:text-white`}
                    >
                      {index === 2
                        ? `${counters[index]}+`
                        : index === 3
                          ? `${counters[index]}`
                          : index === 1
                            ? `${Math.floor(counters[index] / 1000)}K+`
                            : `${Math.floor(counters[index] / 1000)}K+`}
                    </div>
                    <div className="text-lg font-semibold">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
