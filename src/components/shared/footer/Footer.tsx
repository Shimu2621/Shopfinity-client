/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import { easeInOut } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  // Animation variants for moving circles up and down with blinking
  // Use a valid framer-motion easing function
  const easeInOutCubic = "easeInOut";

  const verticalMovingAnimation1 = {
    y: [-50, 400, -50],
    opacity: [0, 1, 0.5, 1, 0],
    transition: {
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      ease: easeInOutCubic,
    },
  };

  const verticalMovingAnimation2 = {
    y: [400, -50, 400],
    opacity: [0, 0.8, 1, 0.3, 0],
    transition: {
      duration: 10,
      repeat: Number.POSITIVE_INFINITY,
      ease: easeInOutCubic,
    },
  };

  const verticalMovingAnimation3 = {
    y: [-30, 350, -30],
    opacity: [1, 0.2, 1, 0.5, 1],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: easeInOutCubic,
    },
  };

  const blinkingAnimation = {
    opacity: [0.1, 1, 0.1],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: easeInOutCubic,
    },
  };

  // new
  // Generate multiple parallel flowing lines (static)
  const generateStaticFlowingLines = () => {
    const lines = [];
    const numLines = 25;

    for (let i = 0; i < numLines; i++) {
      const yBase = 60 + i * 4;

      lines.push(
        <path
          key={`line-${i}`}
          d={`M-200,${yBase} Q200,${yBase - 30} 400,${yBase + 20} Q600,${
            yBase + 50
          } 800,${yBase - 10} Q1000,${yBase - 40} 1200,${yBase + 15} Q1400,${
            yBase + 45
          } 1600,${yBase}`}
          stroke={`url(#flowGradient${i % 3})`}
          strokeWidth="2"
          fill="none"
          opacity={0.8 - i * 0.02}
        />
      );
    }

    return lines;
  };

  return (
    <footer
      className="relative overflow-hidden min-h-[400px]"
      style={{ backgroundColor: "#212C65", position: "relative", zIndex: 1 }}
    >
      {/* Animated Background Circles */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* Vertically moving circles */}
        <motion.div
          animate={verticalMovingAnimation1}
          className="absolute left-10 w-16 h-16 rounded-full"
          style={{ backgroundColor: "#EF3938" }}
        />
        <motion.div
          animate={verticalMovingAnimation2}
          className="absolute left-1/4 w-20 h-20 rounded-full"
          style={{ backgroundColor: "#EF3938" }}
        />
        <motion.div
          animate={verticalMovingAnimation3}
          className="absolute right-1/4 w-12 h-12 rounded-full"
          style={{ backgroundColor: "#EF3938" }}
        />
        <motion.div
          animate={{
            y: [350, -50, 350],
            opacity: [0, 1, 0.7, 1, 0],
            transition: {
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="absolute right-10 w-18 h-18 rounded-full"
          style={{ backgroundColor: "#EF3938" }}
        />
        <motion.div
          animate={{
            y: [-80, 400, -80],
            opacity: [0.5, 1, 0.2, 1, 0.5],
            transition: {
              duration: 9,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="absolute left-1/2 w-14 h-14 rounded-full"
          style={{ backgroundColor: "#EF3938" }}
        />

        {/* Blinking stationary circles */}
        <motion.div
          animate={blinkingAnimation}
          className="absolute top-20 left-1/3 w-10 h-10 rounded-full"
          style={{ backgroundColor: "#EF3938" }}
        />
        <motion.div
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
            transition: {
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="absolute bottom-32 right-1/3 w-8 h-8 rounded-full"
          style={{ backgroundColor: "#EF3938" }}
        />
        <motion.div
          animate={{
            opacity: [1, 0.1, 1],
            scale: [0.5, 1.3, 0.5],
            transition: {
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="absolute top-1/2 right-20 w-12 h-12 rounded-full"
          style={{ backgroundColor: "#EF3938" }}
        />
      </div>

      {/* Footer Content */}
      <div
        className="relative z-10 container mx-auto px-6 py-16"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">IT Solutions</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Providing best services and IT solutions to help your business
              grow and succeed in the digital world.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  IT Consulting
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Digital Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-sm">
                  123 Business St, City, State 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-sm">
                  info@itsolutions.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} IT Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional floating elements for more dynamic effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [400, -50, 400],
            x: [0, 50, 0],
            opacity: [0, 0.8, 1, 0.3, 0],
            rotate: [0, 360, 720],
            transition: {
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
          className="absolute left-2/3 w-6 h-6 rounded-full"
          style={{ backgroundColor: "#EF3938" }}
        />
        <motion.div
          animate={{
            y: [-120, 350, -120],
            x: [0, -30, 0],
            opacity: [0.3, 1, 0.1, 1, 0.3],
            rotate: [360, 0, -360],
            transition: {
              duration: 11,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
          className="absolute right-1/5 w-8 h-8 rounded-full"
          style={{ backgroundColor: "#EF3938" }}
        />

        {/* Fast blinking small circles */}
        <motion.div
          animate={{
            opacity: [0, 1, 0],
            transition: {
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="absolute top-40 left-1/5 w-4 h-4 rounded-full"
          style={{ backgroundColor: "#EF3938" }}
        />
        <motion.div
          animate={{
            opacity: [1, 0, 1],
            transition: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="absolute bottom-20 left-2/3 w-5 h-5 rounded-full"
          style={{ backgroundColor: "#EF3938" }}
        />
      </div>

      {/* New */}
      {/* Static Flowing Ribbon Lines Design at Bottom */}
      <div
        className="absolute bottom-0 left-0 w-full h-48 overflow-hidden pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1400 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="ribbonGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient
              id="ribbonGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.7" />
              <stop offset="40%" stopColor="#0EA5E9" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#14B8A6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Main flowing ribbon bands */}
          <g>
            {/* Top ribbon band */}
            {/* <path
              d="M-100,80 Q100,40 300,60 Q500,80 700,45 Q900,10 1100,35 Q1300,60 1500,40"
              stroke="url(#ribbonGradient1)"
              strokeWidth="3"
              fill="none"
              opacity="0.9"
            />
            <path
              d="M-100,85 Q100,45 300,65 Q500,85 700,50 Q900,15 1100,40 Q1300,65 1500,45"
              stroke="url(#ribbonGradient1)"
              strokeWidth="2.5"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M-100,90 Q100,50 300,70 Q500,90 700,55 Q900,20 1100,45 Q1300,70 1500,50"
              stroke="url(#ribbonGradient1)"
              strokeWidth="2"
              fill="none"
              opacity="0.7"
            /> */}

            {/* Middle ribbon band */}
            <path
              d="M-100,100 Q150,120 350,90 Q550,60 750,95 Q950,130 1150,100 Q1350,70 1500,90"
              stroke="url(#ribbonGradient2)"
              strokeWidth="3"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M-100,105 Q150,125 350,95 Q550,65 750,100 Q950,135 1150,105 Q1350,75 1500,95"
              stroke="url(#ribbonGradient2)"
              strokeWidth="2.5"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M-100,110 Q150,130 350,100 Q550,70 750,105 Q950,140 1150,110 Q1350,80 1500,100"
              stroke="url(#ribbonGradient2)"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />

            {/* Bottom ribbon band */}
            <path
              d="M-100,130 Q200,150 400,120 Q600,90 800,125 Q1000,160 1200,130 Q1400,100 1500,120"
              stroke="url(#ribbonGradient1)"
              strokeWidth="3"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M-100,135 Q200,155 400,125 Q600,95 800,130 Q1000,165 1200,135 Q1400,105 1500,125"
              stroke="url(#ribbonGradient1)"
              strokeWidth="2.5"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M-100,140 Q200,160 400,130 Q600,100 800,135 Q1000,170 1200,140 Q1400,110 1500,130"
              stroke="url(#ribbonGradient1)"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />

            {/* Additional flowing lines for density */}
            {/* <path
              d="M-50,70 Q250,30 450,50 Q650,70 850,35 Q1050,0 1250,25 Q1450,50 1600,30"
              stroke="url(#ribbonGradient2)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M-50,160 Q250,180 450,150 Q650,120 850,155 Q1050,190 1250,160 Q1450,130 1600,150"
              stroke="url(#ribbonGradient1)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            /> */}

            {/* Twisted ribbon effect - left side */}
            <ellipse
              cx="200"
              cy="100"
              rx="80"
              ry="40"
              fill="none"
              stroke="url(#ribbonGradient1)"
              strokeWidth="2"
              opacity="0.6"
              transform="rotate(-20 200 100)"
            />
            <ellipse
              cx="180"
              cy="110"
              rx="70"
              ry="35"
              fill="none"
              stroke="url(#ribbonGradient2)"
              strokeWidth="1.5"
              opacity="0.5"
              transform="rotate(-25 180 110)"
            />

            {/* Twisted ribbon effect - right side */}
            <ellipse
              cx="1000"
              cy="80"
              rx="90"
              ry="45"
              fill="none"
              stroke="url(#ribbonGradient2)"
              strokeWidth="2"
              opacity="0.7"
              transform="rotate(15 1000 80)"
            />
            <ellipse
              cx="1020"
              cy="90"
              rx="80"
              ry="40"
              fill="none"
              stroke="url(#ribbonGradient1)"
              strokeWidth="1.5"
              opacity="0.6"
              transform="rotate(20 1020 90)"
            />
          </g>
        </svg>
      </div>

      {/* Legal Links Section */}
      <div
        className="absolute bottom-0 left-0 w-full bg-black bg-opacity-30 py-4 px-6"
        style={{ zIndex: 15 }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-sm text-gray-300">
            <Link
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              California Consumer Limit the Use of My Sensitive Personal
              Information
            </Link>
            <span className="hidden md:inline text-gray-500">|</span>
            <Link
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Open Source Libraries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
