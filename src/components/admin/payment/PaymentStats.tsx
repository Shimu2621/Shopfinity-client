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
      icon: <CreditCard className="text-blue-600" />,
      bg: "from-blue-500/20 to-blue-100",
    },
    {
      title: "Completed",
      value: completed,
      icon: <CheckCircle className="text-green-600" />,
      bg: "from-green-500/20 to-green-100",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock className="text-yellow-600" />,
      bg: "from-yellow-500/20 to-yellow-100",
    },
    {
      title: "Total Amount",
      value: totalAmount,
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

export default PaymentStats;
