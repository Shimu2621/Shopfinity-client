// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// export function ChartCard({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <Card className="h-[360px]">
//       <CardHeader>
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//       </CardHeader>
//       <CardContent className="h-[280px]">{children}</CardContent>
//     </Card>
//   );
// }

import { Card } from "@/components/ui/card";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Card className="flex flex-col h-[360px] p-4">
      {/* Title */}
      <h3 className="text-sm font-semibold text-muted-foreground mb-2">
        {title}
      </h3>

      {/* Chart Area */}
      <div className="flex-1 w-full">{children}</div>
    </Card>
  );
}
