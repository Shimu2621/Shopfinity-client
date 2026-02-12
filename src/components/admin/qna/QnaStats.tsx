"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, CheckCircle, Clock } from "lucide-react";
import { IQuestion } from "@/types/product/product";

interface Props {
  questions: IQuestion[];
}

export default function QnaStats({ questions }: Props) {
  const total = questions.length;
  const answered = questions.filter((q) => q.answer).length;
  const pending = total - answered;

  const stats = [
    {
      title: "Total Questions",
      value: total,
      icon: MessageSquare,
      bg: "bg-blue-100 dark:bg-black",
      text: "text-blue-600 dark:text-blue-300",
      iconColor: "text-blue-500 dark:text-blue-500",
      border: "border dark:border-blue-700",
    },
    {
      title: "Answered",
      value: answered,
      icon: CheckCircle,
      bg: "bg-green-100 dark:bg-black",
      text: "text-green-600 dark:text-green-300",
      iconColor: "text-green-500 dark:text-green-400",
      border: "border  dark:border-green-500",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      bg: "bg-orange-100 dark:bg-black ",
      text: "text-orange-600 dark:text-orange-300",
      iconColor: "text-orange-500 dark:text-orange-400",
      border: "border dark:border-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`${item.bg} ${item.border} rounded-2xl shadow-md`}>
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <p className="text-gray-600 text-sm">{item.title}</p>
                <h2 className={`text-3xl font-bold ${item.text}`}>
                  {item.value}
                </h2>
              </div>

              <item.icon className={`w-10 h-10 ${item.iconColor}`} />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
