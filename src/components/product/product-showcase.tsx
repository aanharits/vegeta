"use client";
import Link from "next/link";

// components
import { ProductCard } from "@/components/product/product-card";
import { ProductCardSkeleton } from "@/components/skeleton";

// utils
import { cn } from "@/lib/utils";

import { Product } from "@prisma/client";

interface ShowcaseProps {
  gridConfig?: string;
  products: Product[];
  isLoading?: boolean;
}

const ProductShowcase: React.FC<ShowcaseProps> = ({
  gridConfig,
  products,
  isLoading,
}: ShowcaseProps) => {
  const gridClass = gridConfig || "grid-cols-4";
  // Determine skeleton count based on grid config
  const skeletonCount = gridConfig === "grid-cols-3" ? 6 : 4;

  if (isLoading) {
    return (
      <div className={cn("grid gap-6", gridClass)}>
        <ProductCardSkeleton count={skeletonCount} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={cn("grid gap-6 animate-fadeIn", gridClass)}>
        {products?.map((product, index) => (
          <Link key={`productCard${index}`} href={`/product/detail/${product.id}`}>
            <ProductCard details={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export { ProductShowcase };

