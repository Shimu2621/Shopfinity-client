"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  useGetAllBrandsQuery,
  useDeleteBrandMutation,
} from "@/redux/api/brand/brandApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Trash2,
  Pencil,
  Package,
  FileText,
  BarChart3,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { IBrand } from "@/types/brand/brand";

export default function BrandPage() {
  // ✅ Pagination State
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ API CALL WITH PARAMS
  const { data, isLoading } = useGetAllBrandsQuery({
    page,
    limit,
    searchTerm,
  });

  const [deleteBrand] = useDeleteBrandMutation();

  const brands = data?.data || [];
  const total = data?.meta?.total || 0;

  const handleDelete = async (id: string) => {
    try {
      await deleteBrand(id).unwrap();
      toast.success("Brand deleted successfully");
    } catch {
      toast.error("Failed to delete brand");
    }
  };

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied!");
  };

  return (
    <div className="p-6 space-y-8">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Package className="w-8 h-8 text-blue-500" />
          Brand Management
        </h1>
        <p className="text-muted-foreground">
          Manage and organize product brands while linking them to relevant
          categories to maintain a structured and scalable catalogs
        </p>
      </motion.div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-500/10 to-blue-100 shadow-lg">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p>Total Brands</p>
              <h2 className="text-3xl font-bold">{total}</h2>
            </div>
            <Package className="w-10 h-10 text-blue-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/10 to-green-100 shadow-lg">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p>Current Page</p>
              <h2 className="text-3xl font-bold">{page}</h2>
            </div>
            <FileText className="w-10 h-10 text-green-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500/10 to-purple-100 shadow-lg">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p>Items Per Page</p>
              <h2 className="text-3xl font-bold">{limit}</h2>
            </div>
            <BarChart3 className="w-10 h-10 text-purple-500" />
          </CardContent>
        </Card>
      </div>

      {/* ================= SEARCH ================= */}
      <Card>
        <CardContent className="p-4 flex justify-between gap-4">
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search brands..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => {
                setPage(1); // reset page on search
                setSearchTerm(e.target.value);
              }}
            />
          </div>

          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Brand
          </Button>
        </CardContent>
      </Card>

      {/* ================= TABLE ================= */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Categories</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={4} className="text-center p-6">
                    Loading...
                  </td>
                </tr>
              )}

              {!isLoading &&
                brands.map((brand: IBrand, index: number) => (
                  <motion.tr
                    key={brand._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-muted/50"
                  >
                    {/* ID */}
                    <td className="p-4 text-xs flex items-center gap-2">
                      {brand._id}
                      <Copy
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => copyToClipboard(brand._id)}
                      />
                    </td>

                    {/* Name */}
                    <td className="p-4 font-medium">{brand.name}</td>

                    {/* Categories */}
                    <td className="p-4">
                      {brand.categoryIds?.length ? (
                        <div className="flex gap-2 flex-wrap">
                          {brand.categoryIds?.map(
                            (cat: { _id: string; name: string }) => (
                              <Badge
                                key={cat._id}
                                className="border border-gray-200 bg-white text-black"
                              >
                                {cat.name || "Category"}
                              </Badge>
                            ),
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          No Category
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-2">
                      <Button size="sm" variant="outline">
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(brand._id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-end gap-2">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </Button>

        <Button
          disabled={page * limit >= total}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
