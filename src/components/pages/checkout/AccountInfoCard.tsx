"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { useAppSelector } from "@/redux/hooks/hooks";

const AccountInfoCard = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return null;

  const initials =
    user.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <User className="w-5 h-5" />
          <span>Account Information</span>
        </div>

        <div className="flex items-center justify-between bg-muted/40 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-rose-600 flex items-center justify-center text-white font-semibold">
              {initials}
            </div>

            {/* User Info */}
            <div>
              <p className="font-medium leading-tight">{user.name || "User"}</p>
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
