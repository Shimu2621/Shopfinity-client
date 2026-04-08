import { motion } from "framer-motion";
import { IUser } from "@/types/user/user";

const UserStats = ({ users }: { users: IUser[] }) => {
  const total = users.length;
  const admins = users.filter((u) => u.role === "admin").length;
  const normalUsers = users.filter((u) => u.role === "user").length;

  const cards = [
    { title: "Total Users", value: total },
    { title: "Admins", value: admins },
    { title: "Users", value: normalUsers },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
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

export default UserStats;
