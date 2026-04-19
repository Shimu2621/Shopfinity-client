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
import { api } from "@/redux/api/baseApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useGetUserCartQuery } from "@/redux/api/cart/cartApi";
import CartSidebar from "@/components/shared/cartSidebar/CartSidebar";
import { useGetWishlistQuery } from "@/redux/api/wishlist/wishlistApi";
import WishlistSidebar from "@/components/shared/wishlistSidebar/WishlistSidebar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // 🔐 Auth state
  const { user, token } = useAppSelector((state) => state.auth);
  const userId = user?.id; // FIX: use _id (MongoDB)

  // 🛒 Cart query (safe)
  const { data: cartItems } = useGetUserCartQuery(userId!, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const isAuthenticated = !!token;
  const isAdmin = user?.role === "admin";

  const { data: wishlistData } = useGetWishlistQuery(
    { userId },
    {
      skip: !userId,
      refetchOnMountOrArgChange: true,
    },
  );

  const wishlistCount = wishlistData?.data?.length ?? 0;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  const cartCount =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  // const handleLogout = () => {
  //   dispatch(logout());
  //   localStorage.removeItem("token");
  //   router.push("/signin");
  // };

  const handleLogout = () => {
    dispatch(logout());

    // 🔥 Clear ALL RTK Query cache
    dispatch(api.util.resetApiState());

    localStorage.removeItem("token");

    router.push("/signin");
  };

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
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative"
              >
                <Heart className="h-4 w-4" />

                {wishlistCount > 0 && (
                  <span className="absolute -top-4 -right-4 bg-rose-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </motion.div>

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>
            </motion.div>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                {!isAuthenticated ? (
                  <DropdownMenuItem asChild>
                    <Link href="/signin">Sign In</Link>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Manage Profile</Link>
                    </DropdownMenuItem>

                    {isAdmin ? (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Dashboard</Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link href="/orders">My Orders</Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                )}
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
      {user && (
        <WishlistSidebar
          open={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          userId={user.id}
        />
      )}

      {userId && (
        <CartSidebar
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          userId={userId}
        />
      )}
    </motion.nav>
  );
}
