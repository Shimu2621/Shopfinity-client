/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/admin/SpecificationPage.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  useGetProductSpecificationsQuery,
  useDeleteProductSpecificationMutation,
  useUpdateProductSpecificationMutation,
  useCreateProductSpecificationMutation,
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
  const [updateSpec, { isLoading: isUpdating }] =
    useUpdateProductSpecificationMutation();
  const [createSpec, { isLoading: isCreating }] =
    useCreateProductSpecificationMutation();

  const [addOpen, setAddOpen] = useState(false);

  const [addForm, setAddForm] = useState({
    productId: "",
    key: "",
    value: "",
  });

  const [editForm, setEditForm] = useState<{
    productId: string;
    key: string;
    value: string;
  } | null>(null);

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

  const handleUpdate = async () => {
    if (!editSpec || !editForm) return;

    try {
      await updateSpec({
        id: editSpec.id,
        data: {
          productId: editForm.productId,
          key: editForm.key,
          value: editForm.value,
        },
      }).unwrap();

      toast.success("Specification updated successfully");

      setEditSpec(null);
      setEditForm(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update specification");
    }
  };

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

    let start = Math.max(1, currentPage - 2);
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
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Organize and manage product specifications to deliver clear, detailed
          information that helps customers make confident purchasing decisions.
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
              <Button
                onClick={() => setAddOpen(true)}
                className="text-white shadow-lg hover:shadow-xl transition-all duration-300 bg-rose-700 hover:bg-rose-900"
              >
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
                      onClick={() => {
                        setEditSpec(spec);
                        setEditForm({
                          productId: spec.productId,
                          key: spec.key,
                          value: spec.value,
                        });
                      }}
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
        <DialogContent
          className="
    max-w-lg
    backdrop-blur-xl
    bg-white/60 dark:bg-black/50
    border border-white/30 dark:border-white/10
    shadow-2xl
    rounded-2xl
  "
        >
          <DialogHeader className="border-b border-white/20 pb-4">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Settings className="h-5 w-5 text-primary" />
              Edit Specification
            </DialogTitle>
          </DialogHeader>

          {editForm && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Product ID *</Label>
                <Input
                  value={editForm.productId}
                  onChange={(e) =>
                    setEditForm((prev) =>
                      prev ? { ...prev, productId: e.target.value } : prev,
                    )
                  }
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label>Specification Key *</Label>
                <Input
                  value={editForm.key}
                  onChange={(e) =>
                    setEditForm((prev) =>
                      prev ? { ...prev, key: e.target.value } : prev,
                    )
                  }
                  placeholder="e.g., Color"
                />
              </div>

              <div className="space-y-2">
                <Label>Specification Value *</Label>
                <Input
                  value={editForm.value}
                  onChange={(e) =>
                    setEditForm((prev) =>
                      prev ? { ...prev, value: e.target.value } : prev,
                    )
                  }
                  placeholder="e.g., Red"
                />
              </div>
            </div>
          )}

          <DialogFooter className="border-t border-white/20 pt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setEditSpec(null);
                setEditForm(null);
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="
    bg-gradient-to-r from-primary to-primary/80
    hover:from-primary/90 hover:to-primary/70
    shadow-lg
  "
            >
              {isUpdating ? "Updating..." : "Update Specification"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent
          className="
      max-w-lg
      backdrop-blur-xl
      bg-white/60 dark:bg-black/50
      border border-white/30 dark:border-white/10
      shadow-2xl
      rounded-2xl
    "
        >
          <DialogHeader className="border-b border-white/20 pb-4">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Plus className="h-5 w-5 text-primary" />
              Add Specification
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Product ID *</Label>
              <Input
                value={addForm.productId}
                onChange={(e) =>
                  setAddForm({ ...addForm, productId: e.target.value })
                }
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label>Specification Key *</Label>
              <Input
                value={addForm.key}
                onChange={(e) =>
                  setAddForm({ ...addForm, key: e.target.value })
                }
                placeholder="e.g., Color"
              />
            </div>

            <div className="space-y-2">
              <Label>Specification Value *</Label>
              <Input
                value={addForm.value}
                onChange={(e) =>
                  setAddForm({ ...addForm, value: e.target.value })
                }
                placeholder="e.g., Red"
              />
            </div>
          </div>

          <DialogFooter className="border-t border-white/20 pt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setAddOpen(false);
                setAddForm({ productId: "", key: "", value: "" });
              }}
            >
              Cancel
            </Button>

            <Button
              disabled={isCreating}
              onClick={async () => {
                if (!addForm.productId || !addForm.key || !addForm.value) {
                  toast.error("All fields are required");
                  return;
                }

                try {
                  await createSpec(addForm).unwrap();
                  toast.success("Specification added successfully");

                  setAddOpen(false);
                  setAddForm({ productId: "", key: "", value: "" });
                } catch (error: any) {
                  toast.error(
                    error?.data?.message || "Failed to add specification",
                  );
                }
              }}
              className="
          bg-gradient-to-r from-primary to-primary/80
          hover:from-primary/90 hover:to-primary/70
          shadow-lg
        "
            >
              {isCreating ? "Adding..." : "Add Specification"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent
          className="
    max-w-sm
    backdrop-blur-xl
    bg-white/60 dark:bg-black/50
    border border-white/30 dark:border-white/10
    shadow-2xl
    rounded-2xl
  "
        >
          <DialogHeader className="border-b border-white/20 pb-4">
            <DialogTitle className="flex items-center gap-2 text-xl text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete Specification
            </DialogTitle>
          </DialogHeader>

          <div className="mt-3 text-sm text-muted-foreground">
            <p>Are you sure you want to delete this specification?</p>
            <p className="mt-2 font-medium text-red-500">
              This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              className="shadow-lg"
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
