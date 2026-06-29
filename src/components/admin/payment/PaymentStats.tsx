import { motion } from "framer-motion";
import { IPayment } from "@/types/payment/payment";
import { Card, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";
import { CreditCard, CheckCircle, Clock, DollarSign } from "lucide-react";

interface PaymentStatsProps {
  payments: IPayment[];
}

const PaymentStats = ({ payments }: PaymentStatsProps) => {
  const total = payments.length;

  const completed = payments.filter(
    (p: IPayment) => p.paymentStatus === "paid",
  ).length;

  const pending = payments.filter(
    (p: IPayment) => p.paymentStatus === "pending",
  ).length;

  const totalAmount = payments.reduce(
    (acc: number, p: IPayment) => acc + p.amount,
    0,
  );

  const cards = [
    {
      title: "Total Payments",
      value: total,
      icon: <CreditCard className="text-blue-500 dark:text-blue-400" />,
      bg: "from-blue-500/10 to-blue-100 dark:from-blue-900/40 dark:to-blue-950",
    },
    {
      title: "Completed",
      value: completed,
      icon: <CheckCircle className="text-green-500 dark:text-green-400" />,
      bg: "from-green-500/10 to-green-100 dark:from-green-900/40 dark:to-green-950",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock className="text-yellow-500 dark:text-yellow-400" />,
      bg: "from-yellow-500/10 to-yellow-100 dark:from-yellow-900/40 dark:to-yellow-950",
    },
    {
      title: "Total Amount",
      value: totalAmount,
      isMoney: true,
      icon: <DollarSign className="text-purple-500 dark:text-purple-400" />,
      bg: "from-purple-500/10 to-purple-100 dark:from-purple-900/40 dark:to-purple-950",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <Card
            className={`
              bg-gradient-to-br ${card.bg}
              border border-gray-200 dark:border-gray-800
              shadow-md hover:shadow-xl
              transition-all duration-300
              backdrop-blur-xl
              dark:bg-black
            `}
          >
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-md font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-black dark:text-white">
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

              <div className="rounded-2xl bg-white/60 p-4 dark:bg-white/10">
                <div className="text-3xl">{card.icon}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PaymentStats;
