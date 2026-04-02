import { motion } from "framer-motion";
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
    { title: "Total Orders", value: total },
    { title: "Pending", value: pending },
    { title: "Delivered", value: delivered },
    { title: "Revenue", value: `$${revenue.toFixed(2)}` },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl shadow bg-white"
        >
          <p className="text-gray-500">{card.title}</p>
          <h2 className="text-2xl font-bold">{card.value}</h2>
        </motion.div>
      ))}
    </div>
  );
};

export default OrderStats;
