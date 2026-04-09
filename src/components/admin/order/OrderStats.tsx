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
      icon: <ShoppingCart className="text-blue-600" />,
      bg: "from-blue-500/20 to-blue-100",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock className="text-yellow-600" />,
      bg: "from-yellow-500/20 to-yellow-100",
    },
    {
      title: "Delivered",
      value: delivered,
      icon: <CheckCircle className="text-green-600" />,
      bg: "from-green-500/20 to-green-100",
    },
    {
      title: "Revenue",
      value: revenue,
      isMoney: true,
      icon: <DollarSign className="text-purple-600" />,
      bg: "from-purple-500/20 to-purple-100",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <motion.div key={i} whileHover={{ scale: 1.05 }}>
          <Card
            className={`bg-gradient-to-br ${card.bg} backdrop-blur-xl border border-white/20 shadow-xl dark:border-gray-600`}
          >
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>

                <h2 className="text-3xl font-bold">
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

              <div className="text-3xl">{card.icon}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default OrderStats;
