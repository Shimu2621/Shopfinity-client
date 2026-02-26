"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateBrandMutation } from "@/redux/api/brand/brandApi";
import { useGetAllCategoriesQuery } from "@/redux/api/category/categoryApi";
import { toast } from "sonner";

export default function CreateBrandDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);

  const { data } = useGetAllCategoriesQuery(undefined);
  const categories = data?.data || [];

  const [createBrand] = useCreateBrandMutation();

  const handleSubmit = async () => {
    try {
      await createBrand({ name, categoryIds }).unwrap();
      toast.success("Brand Created!");
      setOpen(false);
    } catch {
      toast.error("Error creating brand");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Brand</Button>
      </DialogTrigger>

      <DialogContent className="backdrop-blur-xl bg-white/70">
        <DialogHeader>
          <DialogTitle>Create Brand</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Brand name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="space-y-2">
          {categories.map((cat: any) => (
            <label key={cat._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={cat._id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCategoryIds([...categoryIds, cat._id]);
                  } else {
                    setCategoryIds(categoryIds.filter((id) => id !== cat._id));
                  }
                }}
              />
              {cat.name}
            </label>
          ))}
        </div>

        <Button onClick={handleSubmit}>Create</Button>
      </DialogContent>
    </Dialog>
  );
}
