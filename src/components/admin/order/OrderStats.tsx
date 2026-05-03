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
      icon: <ShoppingCart size={20} />,
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock size={20} />,
    },
    {
      title: "Delivered",
      value: delivered,
      icon: <CheckCircle size={20} />,
    },
    {
      title: "Revenue",
      value: revenue,
      isMoney: true,
      icon: <DollarSign size={20} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => (
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
              transition
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

              {/* Right Icon */}
              <div
                className="
                  p-2 rounded-lg
                  border border-gray-300
                  dark:border-zinc-800
                  text-gray-700 dark:text-gray-300
                "
              >
                {card.icon}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default OrderStats;
