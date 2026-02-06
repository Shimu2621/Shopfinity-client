/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/admin/SpecificationPage.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  useGetProductSpecificationsQuery,
  useDeleteProductSpecificationMutation,
} from "@/redux/api/productSpecification/productSpecificationApi";
import { IProductSpecification } from "@/types/product/product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Trash2,
  Edit,
  ExternalLink,
  Settings,
  Package,
  Eye,
  Search,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { AuroraText } from "@/components/magicui/aurora-text";

const SpecificationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch all product specifications
  const {
    data: specs = [],
    isLoading,
    isError,
  } = useGetProductSpecificationsQuery();

  const [deleteSpec] = useDeleteProductSpecificationMutation();

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
        <div className="flex items-center justify-between p-8 rounded-lg shadow  bg-blue-100">
          <div className="flex flex-col">
            <span className="text-gray-600">Total Specifications</span>
            <span className="text-2xl font-bold text-blue-600">
              {specs.length}
            </span>
          </div>
          <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex items-center justify-between bg-green-100 p-8 rounded-lg shadow">
          <div className=" flex flex-col">
            <span className="text-gray-600">Current Page</span>
            <span className="text-2xl font-bold text-green-600">
              {currentPage} of {totalPages || 1}
            </span>
          </div>
          <Eye className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex items-center justify-between bg-purple-100 p-8 rounded-lg shadow">
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
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by Product ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-0 bg-muted/50 focus:bg-background transition-colors w-full"
                />
              </div>
              <Button className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <Plus className="h-4 w-4 mr-2" />
                Add Specification
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Specifications Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
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
                <tr key={spec.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{spec._id}</td>
                  <td className="px-4 py-2">{spec.productId}</td>
                  <td className="px-4 py-2 font-semibold">{spec.key}</td>
                  <td className="px-4 py-2">{spec.value}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      className="p-2 text-blue-500 hover:bg-gray-100 rounded"
                      title="View"
                    >
                      <ExternalLink size={18} />
                    </button>
                    <button
                      className="p-2 text-yellow-500 hover:bg-gray-100 rounded"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="p-2 text-red-500 hover:bg-gray-100 rounded"
                      title="Delete"
                      onClick={() => handleDelete(spec.id)}
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

      {/* Pagination */}
      <div className="flex justify-end space-x-2 mt-4">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SpecificationPage;
