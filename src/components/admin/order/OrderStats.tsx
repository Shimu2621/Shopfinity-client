"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Clock, CheckCircle, DollarSign } from "lucide-react";
import { IOrder } from "@/types/order/order";

interface Props {
  orders: IOrder[];
}

const OrderStats = ({ orders }: Props) => {
  const total = orders.length;
  const pending = orders.filter((o) => o.status === "pending").length;
  const delivered = orders.filter((o) => o.status === "delivered").length;
  const revenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);

  const cards = [
    {
      title: "Total Orders",
      value: total,
      icon: <ShoppingCart size={18} />,
      color: "blue",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock size={18} />,
      color: "yellow",
    },
    {
      title: "Delivered",
      value: delivered,
      icon: <CheckCircle size={18} />,
      color: "green",
    },
    {
      title: "Revenue",
      value: revenue,
      isMoney: true,
      icon: <DollarSign size={18} />,
      color: "purple",
    },
  ];

  type ColorKey = "blue" | "yellow" | "green" | "purple";

  const colorStyles: Record<ColorKey, { light: string; dark: string }> = {
    blue: {
      light: "bg-blue-50 text-blue-600 border-blue-200",
      dark: "dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
    },
    yellow: {
      light: "bg-yellow-50 text-yellow-600 border-yellow-200",
      dark: "dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20",
    },
    green: {
      light: "bg-green-50 text-green-600 border-green-200",
      dark: "dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
    },
    purple: {
      light: "bg-purple-50 text-purple-600 border-purple-200",
      dark: "dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => {
        const styles = colorStyles[card.color];

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Card
              className="
                rounded-2xl shadow-sm
                bg-white dark:bg-black
                border border-gray-200 dark:border-zinc-900
              "
            >
              <CardContent className="p-5 flex items-center justify-between">
                {/* Left */}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {card.title}
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mt-1">
                    {card.isMoney ? (
                      <>
                        $
                        <CountUp
                          end={card.value as number}
                          duration={1.5}
                          decimals={2}
                        />
                      </>
                    ) : (
                      <CountUp end={card.value as number} duration={1.5} />
                    )}
                  </h2>
                </div>

                {/* Icon */}
                <div
                  className={`
                    p-2.5 rounded-lg border
                    ${styles.light} ${styles.dark}
                  `}
                >
                  {card.icon}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OrderStats;
