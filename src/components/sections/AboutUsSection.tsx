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
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            About Our Company
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transforming the future of ecommerce through innovation, excellence,
            and unwavering commitment to our customers.
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
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-600">
              Our Mission
            </h3>
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

          {/* Center Image */}
          <div
            className={`flex justify-center items-center transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative">
              <Image
                width={120}
                height={120}
                src="/modern-office-ecommerce-team.png"
                alt="Our Team"
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
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
            <h3 className="text-2xl font-bold text-center mb-8 text-purple-600">
              Our Vision
            </h3>
            <div className="space-y-6">
              {visionCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <Card
                    key={index}
                    className={`p-4 hover:shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer group border-l-4 border-l-purple-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                          <IconComponent className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 group-hover:text-purple-600 transition-colors duration-300">
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

        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h3 className="text-2xl font-bold text-center mb-12">
            Live Statistics
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className={`text-center p-6 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 cursor-pointer group bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <IconComponent className="h-10 w-10 text-primary mx-auto group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {index === 2
                        ? `${counters[index]}+`
                        : index === 3
                        ? `${counters[index]}`
                        : index === 1
                        ? `${Math.floor(counters[index] / 1000)}K+`
                        : `${Math.floor(counters[index] / 1000)}K+`}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
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
