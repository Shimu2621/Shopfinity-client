"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  Shield,
  Headphones,
  CreditCard,
  RotateCcw,
  Award,
  Clock,
  Star,
  Heart,
  Gift,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ShinyButton } from "../magicui/shiny-button";
import { AuroraText } from "../magicui/aurora-text";

const services = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
    badge: "Popular",
    iconBg: "bg-blue-600",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% secure payment processing",
    badge: "Trusted",
    iconBg: "bg-purple-600",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service",
    badge: "Premium",
    iconBg: "bg-cyan-500",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Multiple payment options available",
    badge: "Exclusive",
    iconBg: "bg-pink-600",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
    badge: "Trusted",
    iconBg: "bg-indigo-600",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "Premium quality products only",
    badge: "Trusted",
    iconBg: "bg-teal-600",
  },

  {
    icon: Clock,
    title: "Fast Processing",
    description: "Orders processed within 24 hours",
    badge: "New",
    iconBg: "bg-red-500",
  },

  {
    icon: Star,
    title: "Premium Quality",
    description: "Hand-picked products from trusted brands",
    badge: "Premium",
    iconBg: "bg-sky-500",
  },

  {
    icon: Heart,
    title: "Wishlist",
    description: "Save your favorite items for later",
    badge: "New",
    iconBg: "bg-amber-500",
  },
  {
    icon: Gift,
    title: "Loyalty Rewards",
    description: "Earn points with every purchase",
    badge: "Exclusive",
    iconBg: "bg-rose-500",
  },
];

export function BasicServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <>
      <style jsx>{`
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(3deg) scale(1.05);
          }
          50% {
            transform: rotate(-3deg) scale(1.1);
          }
          75% {
            transform: rotate(2deg) scale(1.05);
          }
        }

        .wiggle-animation {
          animation: wiggle 2.5s ease-in-out infinite;
        }
      `}</style>

      <section ref={sectionRef} className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-[1480px]">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <ShinyButton className="relative inline-block px-6 py-3 rounded-full text-lg font-bold mb-4 bg-badge text-black overflow-hidden dark:font-bold">
              🚀 OUR SERVICES
            </ShinyButton>
            <h2 className="text-4xl lg:text-5xl text-center font-bold text-forground mb-4">
              What Can{" "}
              <AuroraText className="text-blue-800 italic">
                ShopFinity
              </AuroraText>{" "}
              <br /> Do For You?
            </h2>
            <p className="text-center mx-auto text-muted-foreground max-w-2xl mb-8">
              We provide reliable services to ensure a seamless shopping
              experiences — from secure payments and fast delivery to 24/7
              customer support and hassle-free returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;

              return (
                <Card
                  key={index}
                  className={`relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border-0  shadow-sm bg-background dark:border dark:border-gray-400 cursor-pointer ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                  }}
                >
                  <CardHeader className="text-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`p-4 ${service.iconBg} rounded-lg w-fit mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <IconComponent
                          className="h-8 w-8 text-white font-extrabold wiggle-animation"
                          style={{
                            animationDelay: `${index * 100}ms`,
                          }}
                        />
                      </div>
                      {service.badge && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-foreground text-secondary animate-pulse"
                        >
                          {service.badge}
                          {}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground group-hover:text-gray-800 transition-colors duration-300">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  {/* <CardContent className="text-center">
                    <CardDescription className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {service.description}
                    </CardDescription>
                  </CardContent> */}

                  {/* <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div> */}
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
