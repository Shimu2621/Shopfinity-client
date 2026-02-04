/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { IProduct } from "@/types";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   stock: number;
//   status: string;
//   category: string;
// }

interface Props {
  product: IProduct;
  onUpdate: (id: string, data: Partial<IProduct>) => Promise<void>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProductDialog({
  product,
  onUpdate,
  open,
  onOpenChange,
}: Props) {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: product.name,
      price: product.price,
      stock: product.stock,
      status: product.status ?? "active",
      category: product.category,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await onUpdate(product._id, data);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <Input
              {...register("name", { required: "Name is required" })}
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium">Price</label>
            <Input
              type="number"
              {...register("price", { required: true })}
            />
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm font-medium">Stock</label>
            <Input
              type="number"
              {...register("stock", { required: true })}
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Status</label>

            <Select
              defaultValue={product.status}
              onValueChange={(value) => setValue("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium">Category</label>

            <Select
              defaultValue={product.category}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <Button className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
