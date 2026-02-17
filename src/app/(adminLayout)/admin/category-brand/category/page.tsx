"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/api/category/categoryApi";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, Copy } from "lucide-react";
import { ICategory } from "@/types";

const schema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  icon: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CategoryPage() {
  const { data, isLoading } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = useMemo(() => data?.data ?? [], [data]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ICategory | null>(null);

  const stats = useMemo(
    () => ({
      total: categories.length,
      page: 1,
      limit: categories.length,
    }),
    [categories],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", description: "", icon: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (editing) {
        await updateCategory({ id: editing._id, data: values }).unwrap();
        toast.success("Category updated");
      } else {
        await createCategory(values).unwrap();
        toast.success("Category created");
      }
      setOpen(false);
      setEditing(null);
      form.reset();
    } catch (e: unknown) {
      const error = e as { data?: { message?: string } };
      toast.error(error?.data?.message ?? "Failed");
    }
  };

  const handleEdit = (cat: ICategory) => {
    setEditing(cat);
    form.reset({
      name: cat.name,
      description: cat.description ?? undefined,
      icon: cat.icon ?? undefined,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await deleteCategory(id);
    toast.success("Deleted");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-sky-600">Category Management</h1>
        <p className="text-muted-foreground">
          Organize your products with categories and subcategories
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Stat title="Total Categories" value={stats.total} />
        <Stat title="Current Page" value={`${stats.page} of 1`} />
        <Stat title="Items Per Page" value={stats.limit} />
      </div>

      {/* Add Button */}
      <div className="flex justify-start">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-sky-600 hover:bg-sky-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "Create"} Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Input placeholder="Name" {...form.register("name")} />
              <Input placeholder="Icon (optional)" {...form.register("icon")} />
              <Input
                placeholder="Description"
                {...form.register("description")}
              />
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Subcategories</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6}>Loading...</TableCell>
                </TableRow>
              ) : (
                categories.map((cat: ICategory) => (
                  <TableRow key={cat._id}>
                    <TableCell className="font-mono text-xs flex items-center gap-2">
                      {cat._id.slice(0, 8)}
                      <Copy
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(cat._id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{cat.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{cat.slug}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {cat.description}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" /> View (
                        {cat.children?.length || 0})
                      </Button>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(cat)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(cat._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string | number }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <p className="text-muted-foreground text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
}
