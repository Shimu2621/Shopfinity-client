import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon,
  variant,
}: {
  title: string;
  value: string | number;
  icon: string;
  variant: "blue" | "yellow" | "green" | "purple" | "red";
}) {
  const variants = {
    blue: "from-blue-500/20 to-indigo-500/20 border-blue-300/30",
    yellow: "from-amber-500/20 to-yellow-500/20 border-yellow-300/30",
    green: "from-emerald-500/20 to-green-500/20 border-green-300/30",
    purple: "from-violet-500/20 to-purple-500/20 border-purple-300/30",
  };

  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
      <Card
        className={`bg-gradient-to-br ${variants[variant]} backdrop-blur-xl border shadow-lg`}
      >
        <CardContent className="p-5 flex justify-between items-center">
          <div>
            <p className="text-muted-foreground text-sm">{title}</p>
            <h2 className="text-3xl font-bold">{value}</h2>
          </div>

          <div className="text-3xl opacity-80">{icon}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
