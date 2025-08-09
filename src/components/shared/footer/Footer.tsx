"use client";

import { motion } from "framer-motion";
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
  const verticalMovingAnimation1 = {
    y: [-50, 400, -50],
    opacity: [0, 1, 0.5, 1, 0],
    transition: {
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  const verticalMovingAnimation2 = {
    y: [400, -50, 400],
    opacity: [0, 0.8, 1, 0.3, 0],
    transition: {
      duration: 10,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  const verticalMovingAnimation3 = {
    y: [-30, 350, -30],
    opacity: [1, 0.2, 1, 0.5, 1],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  const blinkingAnimation = {
    opacity: [0.1, 1, 0.1],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
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
    </footer>
  );
}
