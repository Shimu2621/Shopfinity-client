"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Mail, User, Phone, Home, Edit } from "lucide-react";
import { useGetProfileQuery } from "@/redux/api/user/userApi";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ShippingAddressFormProps {
  userId: string;
}

const ShippingAddressForm = ({ userId }: ShippingAddressFormProps) => {
  const { data, isLoading } = useGetProfileQuery(userId, { skip: !userId });
  // const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (data?.user) {
      setFormData({
        name: data.user.name || "Not provided",
        email: data.user.email || "Not provided",
        phone: data.user.phone || "Not provided",
        address: data.user.address || "Not provided",
      });
    }
  }, [data]);

  // const handleSubmit = async () => {
  //   try {
  //     await updateUser({ id: userId, data: formData }).unwrap();
  //     alert("Shipping address updated successfully");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to update address");
  //   }
  // };

  return (
    <Card className="w-full">
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Home className="h-5 w-5" /> Shipping Information
          </h3>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bg-rose-700 text-white hover:bg-rose-900 hover:text-white"
          >
            <Link href="/profile">
              <Edit className="h-4 w-4 mr-2 text-white hover:text-white" />
              Edit Profile
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <p className="text-sm text-gray-500">Loading shipping info!...</p>
        ) : (
          <div className="space-y-4">
            {/* User Name */}
            <div className="flex items-center gap-3 p-3 rounded-md bg-muted/40 border">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="text-sm font-medium">{formData.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 p-3 rounded-md bg-muted/40 border">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="text-sm font-medium">{formData.email}</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-3 p-3 rounded-md bg-muted/40 border">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="text-sm font-medium">{formData.phone}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="flex items-center gap-3 p-3 rounded-md bg-muted/40 border">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Home className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Shipping Address
                </p>
                <span className="text-sm font-medium">{formData.address}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingAddressForm;
