"use client";

import { useParams } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/redux/api/category/categoryApi";
import { useGetAllBrandsQuery } from "@/redux/api/brand/brandApi";
import { useGetFilterOptionsQuery } from "@/redux/api/filterOption/filterOptionApi";
import { useGetAllProductsQuery } from "@/redux/api/product/productApi";
import ProductCard from "./ProductCard";

export default function ProductsByCategoryPage() {
  const { slug } = useParams<{ slug: string }>();

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
    categoryId ? { categoryId } : undefined,
  );

  if (!category) return null;

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
            : productData?.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </main>
      </div>
    </section>
  );
}
