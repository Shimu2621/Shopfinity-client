"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Boxes,
  ChevronDown,
  CreditCard,
  Filter,
  Heart,
  HelpCircle,
  LayoutDashboard,
  ListOrdered,
  Moon,
  Package,
  ShoppingBag,
  ShoppingCart,
  Star,
  Sun,
  Tags,
  User2,
  Users,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export type MenuItem = {
  title: string;
  url?: string;
  icon: LucideIcon;
  children?: MenuItem[];
};

const items: MenuItem[] = [
  {
    title: "Admin Dashboard",
    icon: LayoutDashboard,
    url: "/admin",
  },
  {
    title: "Product Management",
    icon: Package,
    children: [
      { title: "All Products", url: "/admin/products", icon: Package },
      { title: "Q&A", url: "/admin/products/qna", icon: HelpCircle },
      {
        title: "Specification Management",
        url: "/admin/products/specification",
        icon: Wrench,
      },
      {
        title: "Review Management",
        url: "/admin/products/reviews",
        icon: Star,
      },
    ],
  },
  {
    title: "Category & Brand",
    icon: Tags,
    children: [
      {
        title: "Category",
        url: "/admin/category-brand/category",
        icon: Boxes,
      },
      {
        title: "Brand",
        url: "/admin/category-brand/brand",
        icon: Tags,
      },
    ],
  },
  {
    title: "Filter Options",
    icon: Filter,
    children: [
      {
        title: "All Filter",
        icon: Filter,
        url: "/admin/filters",
      },
    ],
  },
  {
    title: "Order & Payment",
    icon: ShoppingCart,
    children: [
      {
        title: "All Orders",
        icon: ListOrdered,
        url: "/admin/order-payment/orders",
      },
      {
        title: "All Payments",
        icon: CreditCard,
        url: "/admin/order-payment/payments",
      },
    ],
  },
  {
    title: "Cart & Wishlist",
    icon: ShoppingBag,
    children: [
      {
        title: "Cart Items",
        icon: ShoppingCart,
        url: "/admin/cart-wishlist/cart-items",
      },
      {
        title: "All Wishlist",
        icon: Heart,
        url: "/admin/cart-wishlist/wishlists",
      },
    ],
  },
  {
    title: "User Management",
    icon: Users,
    children: [
      {
        title: "All Users",
        icon: User2,
        url: "/admin/users",
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  const toggleMenu = (title: string) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
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
          </Link>
          <div>
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
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>

          <SidebarMenu>
            {items.map((item) => {
              const Icon = item.icon;
              const isOpen = openMenu === item.title;

              // ✅ SINGLE LINK (NO CHILDREN)
              if (!item.children) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link
                        href={item.url!}
                        className="flex items-center font-semibold mb-3 gap-2"
                      >
                        <Icon className="h-4 w-4 text-red-600" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              // ✅ PARENT WITH CHILDREN (ACCORDION)
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => toggleMenu(item.title)}
                    className="flex items-center justify-between mb-3"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-red-600" />
                      <span>{item.title}</span>
                    </div>

                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </SidebarMenuButton>

                  {isOpen && (
                    <SidebarMenuSub>
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;

                        return (
                          <SidebarMenuSubItem key={child.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === child.url}
                            >
                              <Link
                                href={child.url!}
                                className="flex items-center gap-2"
                              >
                                <ChildIcon className="h-4 w-4 text-red-600" />
                                <span>{child.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
