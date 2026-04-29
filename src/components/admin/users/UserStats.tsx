// import { motion } from "framer-motion";
// import { IUser } from "@/types/user/user";

// const UserStats = ({ users }: { users: IUser[] }) => {
//   const total = users.length;
//   const admins = users.filter((u) => u.role === "admin").length;
//   const normalUsers = users.filter((u) => u.role === "user").length;

//   const cards = [
//     { title: "Total Users", value: total },
//     { title: "Admins", value: admins },
//     { title: "Users", value: normalUsers },
//   ];

//   return (
//     <div className="grid md:grid-cols-3 gap-4">
//       {cards.map((card, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="p-5 rounded-2xl shadow bg-white"
//         >
//           <p className="text-gray-500">{card.title}</p>
//           <h2 className="text-2xl font-bold">{card.value}</h2>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default UserStats;

"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, User } from "lucide-react";
import { IUser } from "@/types/user/user";

const UserStats = ({ users }: { users: IUser[] }) => {
  const total = users.length;
  const admins = users.filter((u) => u.role === "admin").length;
  const normalUsers = users.filter((u) => u.role === "user").length;

  const cards = [
    {
      title: "Total Users",
      value: total,
      icon: Users,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Admins",
      value: admins,
      icon: ShieldCheck,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Users",
      value: normalUsers,
      icon: User,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {cards.map((card, i) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-2xl shadow-md 
                       bg-white dark:bg-black 
                       border border-gray-200 dark:border-gray-800
                       hover:shadow-xl transition duration-300"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {card.title}
              </p>

              <div
                className={`p-2 rounded-xl bg-gradient-to-r ${card.color} text-white`}
              >
                <Icon size={18} />
              </div>
            </div>

            {/* Value */}
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {card.value}
            </h2>

            {/* Bottom subtle line */}
            <div className="mt-4 h-1 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div
                className={`h-full w-2/3 bg-gradient-to-r ${card.color}`}
              ></div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default UserStats;
