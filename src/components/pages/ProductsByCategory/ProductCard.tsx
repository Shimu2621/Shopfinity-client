"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden shadow-lg">
      <div className="relative aspect-square">
        <Image
          src={product.images?.[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
        />

        {product.featured && (
          <Badge className="absolute top-2 left-2">Featured</Badge>
        )}
      </div>

      <CardContent className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold line-clamp-2">{product.name}</h3>

        <p className="text-lg font-bold mt-2">${product.price}</p>

        <div className="flex gap-2 mt-auto">
          <Button size="icon">
            <ShoppingCart className="w-4 h-4" />
          </Button>

          <Link href={`/products/${product._id}`}>
            <Button size="icon" variant="secondary">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
