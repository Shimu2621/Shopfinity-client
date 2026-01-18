"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  gradient,
  iconBg,
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "relative overflow-hidden rounded-xl p-5 text-white shadow-md",
        gradient,
      )}
    >
      {/* glow effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-white/10" />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>

        <div
          className={cn(
            "h-12 w-12 rounded-lg flex items-center justify-center",
            iconBg,
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}
