"use client";

import {
  Card,
  CardContent,
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
  Globe,
  Clock,
  Users,
  Package,
  Star,
  Zap,
  Heart,
  Gift,
  MapPin,
  Smartphone,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
    badge: "Popular",
    iconBg: "bg-blue-500",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment processing",
    badge: null,
    iconBg: "bg-purple-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service",
    badge: null,
    iconBg: "bg-cyan-500",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Multiple payment options available",
    badge: null,
    iconBg: "bg-pink-500",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
    badge: null,
    iconBg: "bg-indigo-500",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "Premium quality products only",
    badge: "Trusted",
    iconBg: "bg-emerald-500",
  },
  {
    icon: Globe,
    title: "Global Delivery",
    description: "Worldwide shipping to 150+ countries",
    badge: null,
    iconBg: "bg-orange-500",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Orders processed within 24 hours",
    badge: "New",
    iconBg: "bg-red-500",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join our community of satisfied customers",
    badge: null,
    iconBg: "bg-teal-500",
  },
  {
    icon: Package,
    title: "Gift Wrapping",
    description: "Beautiful gift wrapping available",
    badge: null,
    iconBg: "bg-violet-500",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Hand-picked products from trusted brands",
    badge: "Premium",
    iconBg: "bg-yellow-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Express delivery in major cities",
    badge: null,
    iconBg: "bg-lime-500",
  },
  {
    icon: Heart,
    title: "Wishlist",
    description: "Save your favorite items for later",
    badge: null,
    iconBg: "bg-rose-500",
  },
  {
    icon: Gift,
    title: "Loyalty Rewards",
    description: "Earn points with every purchase",
    badge: "Exclusive",
    iconBg: "bg-amber-500",
  },
  {
    icon: MapPin,
    title: "Store Locator",
    description: "Find our physical stores near you",
    badge: null,
    iconBg: "bg-slate-500",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Shop on-the-go with our mobile app",
    badge: "Download",
    iconBg: "bg-sky-500",
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        // @keyframes wave {
        //   0%,
        //   100% {
        //     transform: rotate(0deg);
        //   }
        //   25% {
        //     transform: rotate(5deg);
        //   }
        //   75% {
        //     transform: rotate(-5deg);
        //   }
        // }

        // @keyframes spin-slow {
        //   0% {
        //     transform: rotate(0deg);
        //   }
        //   100% {
        //     transform: rotate(360deg);
        //   }
        // }

        // @keyframes pulse-scale {
        //   0%,
        //   100% {
        //     transform: scale(1);
        //   }
        //   50% {
        //     transform: scale(1.1);
        //   }
        // }

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

        // .float-animation {
        //   animation: float 1.5s ease-in-out infinite;
        // }

        // .wave-animation {
        //   animation: wave 1s ease-in-out infinite;
        // }

        // .spin-animation {
        //   animation: spin-slow 3s linear infinite;
        // }

        // .pulse-scale-animation {
        //   animation: pulse-scale 2s ease-in-out infinite;
        // }

        .wiggle-animation {
          animation: wiggle 2.5s ease-in-out infinite;
        }
      `}</style>

      <section ref={sectionRef} className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              What can{" "}
              <span className="text-blue-500 animate-pulse">EcomStore</span> do
              for you?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide exceptional services to ensure the best shopping
              experience for our customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const getAnimationClass = (index: number) => {
                const animations = [
                  "float-animation wave-animation",
                  //   "spin-animation",
                  //   "pulse-scale-animation",
                  "wiggle-animation",
                ];
                return animations[index % 4];
              };

              return (
                <Card
                  key={index}
                  className={`relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border-0 shadow-sm bg-white cursor-pointer ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                  }}
                >
                  <CardHeader className="pb-4 text-center">
                    <div className="flex flex-col items-center mb-4">
                      <div
                        className={`p-3 ${service.iconBg} rounded-2xl w-fit mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <IconComponent
                          className={`h-5 w-5 text-white ${getAnimationClass(
                            index
                          )}`}
                          style={{
                            animationDelay: `${index * 100}ms`,
                          }}
                        />
                      </div>
                      {service.badge && (
                        <Badge
                          variant="secondary"
                          className="text-xs mb-2 animate-pulse"
                        >
                          {service.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-sm leading-relaxed text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {service.description}
                    </CardDescription>
                  </CardContent>

                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
