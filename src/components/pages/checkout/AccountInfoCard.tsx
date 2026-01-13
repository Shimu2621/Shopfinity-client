"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { useGetMeQuery } from "@/redux/api/user/userApi";

const AccountInfoCard = () => {
  const { data } = useGetMeQuery();
  const user = data?.user;

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <User className="w-5 h-5" />
          <span>Account Information</span>
        </div>

        <div className="flex items-center justify-between bg-muted/40 rounded-lg p-4 border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-rose-600 flex items-center justify-center text-white font-semibold">
              {initials}
            </div>

            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Badge variant="secondary">Verified</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfoCard;
