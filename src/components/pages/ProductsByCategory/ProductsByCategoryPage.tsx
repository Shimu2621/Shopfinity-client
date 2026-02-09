"use client";

import { useParams } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/redux/api/category/categoryApi";
import { useGetAllBrandsQuery } from "@/redux/api/brand/brandApi";
import { useGetFilterOptionsQuery } from "@/redux/api/filterOption/filterOptionApi";
import { useGetAllProductsQuery } from "@/redux/api/product/productApi";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductsByCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [, categoryId] = slug.split("~");

  // Categories
  const { data: categoryData } = useGetAllCategoriesQuery();
  const category = categoryData?.data.find((c) => c._id === categoryId);

  // Brands
  const { data: brands } = useGetAllBrandsQuery(
    categoryId ? { categoryId } : undefined,
  );

  // Filters (wait for category)
  const { data: filters } = useGetFilterOptionsQuery(
    categoryId ? { categoryId } : undefined,
  );

  // Products
  const { data: productData, isLoading } = useGetAllProductsQuery(
    categoryId
      ? {
          categoryId,
          page: currentPage,
          limit: itemsPerPage,
        }
      : undefined,
  );

  if (!category) return null;

  const products = productData?.products ?? [];
  const total = productData?.total ?? 0;
  const limit = productData?.limit ?? itemsPerPage;
  const totalPages = Math.ceil(total / limit);

  // const currentProducts: IProduct[] = products;

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    if (page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number.parseInt(value));
    setCurrentPage(1);
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{category.name} Products</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Filters */}
        <aside className="col-span-12 md:col-span-3 space-y-6">
          {/* Brand Filter */}
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-3">Brand</h3>
            {brands?.data.map((brand) => (
              <label key={brand._id} className="flex gap-2 text-sm">
                <input type="checkbox" />
                {brand.name}
              </label>
            ))}
          </div>

          {/* Dynamic Filters */}
          {filters?.data.map((filter) => (
            <div key={filter._id} className="bg-white rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-3">{filter.name}</h3>

              {filter.type === "checkbox" &&
                filter.options?.map((opt) => (
                  <label key={opt} className="flex gap-2 text-sm">
                    <input type="checkbox" />
                    {opt}
                  </label>
                ))}

              {filter.type === "range" && (
                <input type="range" className="w-full" />
              )}
            </div>
          ))}
        </aside>

        {/* Products */}
        <main className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? "Loading products..."
            : products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </main>

        {/* Pagination Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-16 border-t">
          {/* Items per page selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="48">48</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">per page</span>
          </div>

          {/* Results info */}
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, total)} of {total} results
          </div>

          {/* Pagination buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {/* Page numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className="w-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
