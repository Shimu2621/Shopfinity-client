"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateProductMutation } from "@/redux/api/product/productApi";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddProductDialog = ({ open, onOpenChange }: Props) => {
  const [createProduct] = useCreateProductMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    images: "",
    featured: false,
    isDiscountActive: false,
    discountPercentage: 0,
    categoryId: "",
    brandId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target;

    setForm((prev) => ({
      ...prev,
      [target.name]:
        target.type === "checkbox"
          ? (target as HTMLInputElement).checked
          : target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        discountPercentage: Number(form.discountPercentage),
        images: form.images
          ? form.images.split(",").map((img) => img.trim())
          : [],
      };

      await createProduct(payload).unwrap();

      toast.success("Product created successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Product Name"
            name="name"
            onChange={handleChange}
          />

          <textarea
            placeholder="Description"
            name="description"
            className="w-full border rounded-md p-2"
            onChange={handleChange}
          />

          <Input
            placeholder="Price"
            type="number"
            name="price"
            onChange={handleChange}
          />

          <Input
            placeholder="Stock"
            type="number"
            name="stock"
            onChange={handleChange}
          />

          <Input
            placeholder="Image URLs (comma separated)"
            name="images"
            onChange={handleChange}
          />

          <Input
            placeholder="Category ID"
            name="categoryId"
            onChange={handleChange}
          />

          <Input
            placeholder="Brand ID"
            name="brandId"
            onChange={handleChange}
          />

          <div className="flex items-center gap-2">
            <input type="checkbox" name="featured" onChange={handleChange} />
            <label>Featured Product</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isDiscountActive"
              onChange={handleChange}
            />
            <label>Active Discount</label>
          </div>

          {form.isDiscountActive && (
            <Input
              placeholder="Discount %"
              type="number"
              name="discountPercentage"
              onChange={handleChange}
            />
          )}

          <Button
            onClick={handleSubmit}
            className="w-full bg-rose-700 hover:bg-rose-800"
          >
            Create Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
