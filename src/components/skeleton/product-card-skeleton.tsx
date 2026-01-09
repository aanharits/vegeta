"use client";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardSkeletonProps {
    count?: number;
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({
    count = 4,
}) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={`skeleton-${index}`}
                    className="w-full flex flex-col gap-3 p-4 border border-gray-200 rounded-xl bg-white"
                >
                    {/* Image placeholder */}
                    <div className="w-full aspect-square relative">
                        <Skeleton className="w-full h-full rounded-lg" />
                    </div>

                    {/* Product name */}
                    <Skeleton className="h-6 w-3/4 rounded-md" />

                    {/* Price */}
                    <Skeleton className="h-5 w-1/2 rounded-md" />

                    {/* Rating & sold */}
                    <div className="flex gap-2 items-center">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-24 rounded-md" />
                    </div>

                    {/* Button */}
                    <Skeleton className="h-10 w-full rounded-md mt-1" />
                </div>
            ))}
        </>
    );
};

export { ProductCardSkeleton };
