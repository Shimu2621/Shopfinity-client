/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/admin/AllProductsPage.tsx
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/product/productApi";
import { IProduct, UpdateProductPayload } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
// import { toast } from "react-hot-toast";
import { Eye, Edit, Trash2, Copy, Search, Package } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import EditProductDialog from "@/components/admin/products/EditProductDialog";
import AddProductDialog from "@/components/admin/products/AddProductDialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: IProduct;
}

const AllProductsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Fetch products with pagination
  const { data, isLoading } = useGetAllProductsQuery({
    page: Number(page),
    limit: Number(limit),
  });
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete product");
        console.error("Failed to delete product");
      }
    }
  };

  // Filter products based on search input
  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];
    return data.products.filter(
      (p: IProduct) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand?.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, data?.products]);

  const handleCopyId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      toast.success("Product ID copied!");
    } catch {
      toast.error("Failed to copy ID");
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

  const handleUpdateProduct = async (
    id: string,
    data: UpdateProductPayload,
  ) => {
    console.log("UPDATE ID:", id);
    console.log("UPDATE DATA:", data);

    try {
      await updateProduct({
        id,
        data,
      }).unwrap();

      toast.success("Product Updated!");
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600 border border-red-200">
          Out of stock
        </span>
      );
    }

    if (stock <= 10) {
      return (
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-600 border border-orange-200">
          {stock} left
        </span>
      );
    }

    if (stock <= 30) {
      return (
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
          {stock} in stock
        </span>
      );
    }

    return (
      <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
        {stock} available
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-50 dark:bg-gray-950 dark:border dark:border-gray-800 p-6 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-8 w-8 text-rose-700" />
            Product Management
          </h1>
          <p className="text-gray-600">Manage your product catalog with ease</p>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-rose-700 hover:bg-rose-800 text-white"
        >
          + Add Product
        </Button>
      </div>

      {/* Search */}
      <motion.div variants={itemVariants}>
        <Card className="shadow-md p-0">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products by name, category, or brand..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border dark:border-gray-800 ">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Brand</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">
                        {product._id.slice(0, 8)}...
                      </span>

                      <button
                        onClick={() => handleCopyId(product._id)}
                        className="p-1 rounded-md hover:bg-gray-100 transition"
                      >
                        <Copy size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-2 flex items-center gap-2">
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-gray-500 text-sm truncate max-w-[150px]">
                        {product.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {product.category?.name ?? "N/A"}
                  </td>
                  <td className="px-4 py-2">{product.brand?.name ?? "N/A"}</td>
                  <td className="px-4 py-2">
                    ${product.price.toFixed(2)}
                    {product.isDiscountActive && product.discountPercentage && (
                      <p className="text-green-500 text-sm">
                        {product.discountPercentage}% off
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <Badge variant="secondary">
                      {" "}
                      {getStockBadge(product.stock)} in stock
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-1 flex-wrap">
                      {product.featured && (
                        <Badge variant="outline">Featured</Badge>
                      )}
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </td>

                  <td className="px-4 py-2 flex gap-2">
                    <Link href={`/products/${product._id}`}>
                      <Button size="icon" variant="ghost" className="h-10 w-10">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsEditOpen(true);
                      }}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <EditProductDialog
          key={selectedProduct._id}
          product={selectedProduct}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onUpdate={handleUpdateProduct}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <p>
          Page {page} of {Math.ceil((data?.total || 0) / limit)}
        </p>
        <Button
          disabled={page === Math.ceil((data?.total || 0) / limit)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllProductsPage;
