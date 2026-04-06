"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { categoryIconMap, categoryColors } from "@/lib/category-icons";
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/api/category/categoryApi";
import { ICategory } from "@/types";
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
import { Layers, FileText, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, Copy, Search, Star } from "lucide-react";

import {
  Headphones,
  Tv,
  Camera,
  Smartphone,
  Video,
  Gamepad2,
  Watch,
  Book,
  Tablet,
  Shirt,
  Laptop,
  Package,
} from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";

// Define color palette
const colors = [
  "bg-pink-100 text-pink-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-yellow-100 text-yellow-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
  "bg-red-100 text-red-600",
  "bg-teal-100 text-teal-600",
  "bg-orange-100 text-orange-600",
  "bg-teal-100 text-teal-600",
];

const categoryIconMap: Record<string, React.ElementType> = {
  Headphone: Headphones,
  TV: Tv,
  Cameras: Camera,
  Mobile: Smartphone,
  "Action Camera": Video,
  "Gaming Console": Gamepad2,
  Accessories: Package,
  Watch: Watch,
  Books: Book,
  Laptop: Laptop,
  Fashion: Shirt,
  Tablets: Tablet,
};

/* ---------------- schema ---------------- */
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

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ICategory | null>(null);
  const [viewing, setViewing] = useState<ICategory | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  const rawCategories = useMemo(() => data?.data ?? [], [data]);

  /* ---------------- search filter ---------------- */
  const filtered = useMemo(() => {
    return rawCategories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [rawCategories, search]);

  /* ---------------- pagination ---------------- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const categories = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

  /* ---------------- form ---------------- */
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

  /* ---------------- stats ---------------- */
  const stats = {
    total: rawCategories.length,
    page: `${page} / ${totalPages}`,
    limit,
  };

  return (
    <div className="p-6 space-y-6">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500">
            <Star className="h-8 w-8 text-white" />
          </div>

          <AuroraText className="text-4xl md:text-5xl font-bold">
            Category Management
          </AuroraText>
        </div>
        <p className="text-muted-foreground">
          Structure your product catalog with categories and subcategories to
          improve organizations, and overall shopping experiences
        </p>
      </motion.div>

      {/* stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Stat
          title="Total Categories"
          value={stats.total}
          icon={Layers}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <Stat
          title="Current Page"
          value={stats.page}
          icon={FileText}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <Stat
          title="Items Per Page"
          value={stats.limit}
          icon={BarChart3}
          color="bg-gradient-to-br from-green-500 to-emerald-600"
        />
      </div>

      {/* toolbar */}
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search category..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-rose-700 hover:bg-black text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "Create"} Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Input placeholder="Name" {...form.register("name")} />
              <Input placeholder="Icon URL" {...form.register("icon")} />
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

      {/* table */}
      <Card className="border shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Subcategories</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7}>Loading...</TableCell>
                </TableRow>
              ) : (
                categories.map((cat, index) => (
                  <TableRow key={cat._id}>
                    <TableCell className="font-mono text-xs flex items-center gap-2 pt-6">
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
                    <TableCell>
                      {(() => {
                        const IconComponent =
                          categoryIconMap[cat.name] || Package;

                        return (
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-full ${
                              colors[index % colors.length]
                            }`}
                          >
                            <IconComponent className="w-6 h-6" />
                          </div>
                        );
                      })()}
                    </TableCell>

                    <TableCell className="text-muted-foreground max-w-[200px] truncate">
                      {cat.description}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewing(cat)}
                      >
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

      {/* pagination */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      {/* subcategory drawer */}
      <Sheet open={!!viewing} onOpenChange={() => setViewing(null)}>
        <SheetContent className="w-[380px]">
          <SheetHeader>
            <SheetTitle>{viewing?.name} Subcategories</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            {viewing?.children?.length ? (
              viewing.children.map((sub) => (
                <div key={sub._id} className="border rounded-lg p-3">
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-xs text-muted-foreground">{sub.slug}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No subcategories</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Stat({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <Card className="border shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm mb-1">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </CardContent>
    </Card>
  );
}
