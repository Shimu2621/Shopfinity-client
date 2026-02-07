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
import { IProduct, UpdateProductPayload } from "@/types";
import { useEffect, useState } from "react";

type EditProductForm = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId?: string;
  brandId?: string;
};

interface Props {
  product: IProduct;
  onUpdate: (id: string, data: UpdateProductPayload) => Promise<void>;
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

  const form = useForm<EditProductForm>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.category?.id ?? "",
      brandId: product.brand?.id ?? "",
    },
  });

  const { register, handleSubmit, setValue, reset } = form;

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        stock: product.stock,
        categoryId: product.category?.id ?? "",
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: EditProductForm) => {
    try {
      setLoading(true);

      await onUpdate(product._id, {
        name: data.name,
        price: Number(data.price),
        stock: Number(data.stock),
        categoryId: data.categoryId,
      });

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
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <Input {...register("name", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Price</label>
            <Input type="number" {...register("price", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium">Stock</label>
            <Input type="number" {...register("stock", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <Select
              defaultValue={product.category?.id}
              onValueChange={(value) => setValue("categoryId", value)}
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

          <div>
            <label className="text-sm font-medium">Brand</label>

            <Select
              value={form.watch("brandId")}
              onValueChange={(value) => setValue("brandId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>

              <SelectContent>
                {/* Replace with API data later */}
                <SelectItem value="brand_id_1">Apple</SelectItem>
                <SelectItem value="brand_id_2">Samsung</SelectItem>
                <SelectItem value="brand_id_3">Sony</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
