"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 ">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center bg-gradient-to-r from-blue-800 to-rose-600">
              <span className="text-primary-foreground font-bold text-lg ">
                S
              </span>
            </div>
            <span className="font-serif font-semibold text-xl text-rose-600">
              ShopFinity
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:flex items-center space-x-2 flex-1 max-w-sm mx-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search products..." className="pl-10 pr-4" />
            </div>
          </motion.div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </motion.div>

            {/* Wishlist */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-rose-700">
                  0
                </Badge>
              </Button>
            </motion.div>

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-rose-700">
                  0
                </Badge>
              </Button>
            </motion.div>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href="/signup">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t py-4"
          >
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
