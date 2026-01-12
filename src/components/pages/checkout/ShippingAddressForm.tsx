"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetProfileQuery,
  useUpdateUserMutation,
} from "@/redux/api/user/userApi";
import { MapPin } from "lucide-react";

interface ShippingAddressFormProps {
  userId: string;
}

const ShippingAddressForm = ({ userId }: ShippingAddressFormProps) => {
  const { data, isLoading } = useGetProfileQuery(userId, {
    skip: !userId,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (data?.user) {
      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "Not provided",
        address: data.user.address || "Not provided",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateUser({
        id: userId,
        data: formData,
      }).unwrap();

      alert("Shipping address updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update address");
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <MapPin className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Shipping Information</h3>
        </div>

        {isLoading ? (
          <p className="text-sm">Loading shipping info...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <Input
              name="address"
              placeholder="Shipping Address"
              value={formData.address}
              onChange={handleChange}
              className="md:col-span-2"
            />
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Address"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingAddressForm;
