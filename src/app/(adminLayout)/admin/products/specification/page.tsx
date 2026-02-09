/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/admin/SpecificationPage.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  useGetProductSpecificationsQuery,
  useDeleteProductSpecificationMutation,
} from "@/redux/api/productSpecification/productSpecificationApi";
import { IProductSpecification } from "@/types/product/product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Trash2,
  Edit,
  ExternalLink,
  Settings,
  Package,
  Eye,
  Search,
  Plus,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Label } from "@/components/ui/label";

const SpecificationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();
  const [editSpec, setEditSpec] = useState<IProductSpecification | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteSpec] = useDeleteProductSpecificationMutation();

  // Fetch all product specifications
  const {
    data: specs = [],
    isLoading,
    isError,
  } = useGetProductSpecificationsQuery();

  // Filter by search term
  const filteredSpecs = specs.filter((spec) =>
    spec.productId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredSpecs.length / itemsPerPage);
  const paginatedSpecs = filteredSpecs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this specification?")) return;
    try {
      await deleteSpec(id).unwrap();
      toast.success("Specification deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete");
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredSpecs.length);

  const getPaginationPages = () => {
    const pages = [];
    const maxVisible = 5;

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPaginationPages();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-rose-500 via-purple to-blue-500">
            <Settings className="h-8 w-8 text-white" />
          </div>
          <AuroraText className="text-4xl md:text-5xl font-bold">
            Product Specifications
          </AuroraText>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Manage detailed specifications for your products to help customers
          make informed decisions
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center justify-between p-8 rounded-lg shadow  bg-blue-100 dark:bg-black dark:border dark:border-gray-700">
          <div className="flex flex-col">
            <span className="text-gray-600">Total Specifications</span>
            <span className="text-2xl font-bold text-blue-600">
              {specs.length}
            </span>
          </div>
          <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex items-center justify-between bg-green-100 p-8 rounded-lg shadow dark:bg-black dark:border dark:border-gray-700">
          <div className=" flex flex-col">
            <span className="text-gray-600">Current Page</span>
            <span className="text-2xl font-bold text-green-600">
              {currentPage} of {totalPages || 1}
            </span>
          </div>
          <Eye className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex items-center justify-between bg-purple-100 p-8 rounded-lg shadow dark:bg-black dark:border dark:border-gray-700">
          <div className="flex flex-col">
            <span className="text-gray-600">Per Page</span>
            <span className="text-2xl font-bold text-purple-600">
              {itemsPerPage} items
            </span>
          </div>
          <Settings className="h-8 w-8 text-purple-600 dark:text-purple-400" />
        </div>
      </div>

      {/* Search and Add */}
      <motion.div variants={itemVariants}>
        <Card className="shadow-lg border-0 py-0">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by Product ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-0 bg-muted/50 focus:bg-background transition-colors w-full"
                />
              </div>
              <Button className="text-white shadow-lg hover:shadow-xl transition-all duration-300 bg-rose-700 hover:bg-rose-900 ">
                <Plus className="h-4 w-4 mr-2 text-white" />
                Add Specification
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Specifications Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full  rounded-lg shadow">
          <thead className="bg-yellow-50 dark:bg-black rounded-lg">
            <tr>
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Product ID</th>
              <th className="text-left px-4 py-2">Key</th>
              <th className="text-left px-4 py-2">Value</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-red-500">
                  Failed to load specifications
                </td>
              </tr>
            ) : paginatedSpecs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No specifications found
                </td>
              </tr>
            ) : (
              paginatedSpecs.map((spec: IProductSpecification) => (
                <tr key={spec.id} className="border-t ">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">
                        {spec.id.slice(0, 14)}
                      </span>

                      <button
                        onClick={() => handleCopy(spec.id)}
                        className="text-gray-700 hover:text-primary transition"
                        title="Copy ID"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">
                        {spec.productId.slice(0, 14)}
                      </span>

                      <button
                        onClick={() => handleCopy(spec.productId)}
                        className="text-gray-700 hover:text-primary transition"
                        title="Copy Product ID"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-2 font-semibold">{spec.key}</td>
                  <td className="px-4 py-2">{spec.value}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      className="p-2 text-blue-500 hover:bg-gray-100 rounded"
                      title="View Product"
                      onClick={() => router.push(`/products/${spec.productId}`)}
                    >
                      <ExternalLink size={18} />
                    </button>

                    <button
                      className="p-2 text-yellow-500 hover:bg-gray-100 rounded"
                      title="Edit Specification"
                      onClick={() => setEditSpec(spec)}
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      className="p-2 text-red-500 hover:bg-gray-100 rounded"
                      title="Delete"
                      onClick={() => setDeleteId(spec.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={!!editSpec} onOpenChange={() => setEditSpec(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="flex items-center space-x-2 text-xl">
              <Settings className="h-6 w-6 text-primary" />
              <span>
                {editSpec ? "Edit Specification" : "Add New Specification"}
              </span>
            </DialogTitle>
          </DialogHeader>

          {editSpec && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Product ID *</Label>
                <Input
                  value={editSpec.productId}
                  placeholder="Enter Product ID"
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Specification Key *
                </Label>
                <Input
                  value={editSpec.key}
                  placeholder="e.g., Color, Material, Size"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Specification Value *
                </Label>
                <Input
                  value={editSpec.value}
                  placeholder="e.g., Red, Cotton, Large"
                />
              </div>
            </div>
          )}

          <DialogFooter className="border-t pt-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              {editSpec
                ? "Update Specification"
                : `Add Specification${editSpec.length > 1 ? "s" : ""}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Specification</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this specification? This action
            cannot be undone.
          </p>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (!deleteId) return;
                await handleDelete(deleteId);
                setDeleteId(null);
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
        {/* Left */}
        <span className="text-sm text-muted-foreground">
          Show {itemsPerPage} per page
        </span>

        {/* Center */}
        <span className="text-sm text-muted-foreground">
          Showing {startItem} to {endItem} of {filteredSpecs.length} results
        </span>

        {/* Right */}
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>

          {pages[0] > 1 && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(1)}
              >
                1
              </Button>
              <span className="px-1">…</span>
            </>
          )}

          {pages.map((page) => (
            <Button
              key={page}
              size="sm"
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          {pages[pages.length - 1] < totalPages && (
            <>
              <span className="px-1">…</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </Button>
            </>
          )}

          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecificationPage;
