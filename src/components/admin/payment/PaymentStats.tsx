import { motion } from "framer-motion";
import { IPayment } from "@/types/payment/payment";
import { Card, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";

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
    { title: "Total Payments", value: total },
    { title: "Completed", value: completed },
    { title: "Pending", value: pending },
    { title: "Total Amount", value: `$${totalAmount.toFixed(2)}` },
  ];

  return (
    // <div className="grid md:grid-cols-4 gap-4">
    //   {cards.map((card, i) => (
    //     <motion.div
    //       key={i}
    //       initial={{ opacity: 0, y: 10 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       className="p-5 rounded-2xl shadow bg-white"
    //     >
    //       <p className="text-gray-500">{card.title}</p>
    //       <h2 className="text-2xl font-bold">{card.value}</h2>
    //     </motion.div>
    //   ))}
    // </div>

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
