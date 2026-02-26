"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Card, CardContent } from "@/components/ui/card";
import { Package, FileText, BarChart3 } from "lucide-react";

interface Props {
  total: number;
  page: number;
  limit: number;
}

export default function StatsCards({ total, page, limit }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Total */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-100 backdrop-blur-xl border border-white/20 shadow-xl">
          <CardContent className="p-6 flex justify-between">
            <div>
              <p>Total Brands</p>
              <h2 className="text-3xl font-bold">
                <CountUp end={total} duration={1.5} />
              </h2>
            </div>
            <Package className="text-blue-600" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Page */}
      <Card className="bg-gradient-to-br from-green-500/20 to-green-100 shadow-xl">
        <CardContent className="p-6 flex justify-between">
          <div>
            <p>Current Page</p>
            <h2 className="text-3xl font-bold">{page}</h2>
          </div>
          <FileText className="text-green-600" />
        </CardContent>
      </Card>

      {/* Limit */}
      <Card className="bg-gradient-to-br from-purple-500/20 to-purple-100 shadow-xl">
        <CardContent className="p-6 flex justify-between">
          <div>
            <p>Items Per Page</p>
            <h2 className="text-3xl font-bold">{limit}</h2>
          </div>
          <BarChart3 className="text-purple-600" />
        </CardContent>
      </Card>
    </div>
  );
}
