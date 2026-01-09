"use client";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton: React.FC = () => {
    return (
        <div className="w-content flex pt-5 gap-12">
            {/* Product Image */}
            <div className="border p-2 rounded-xl">
                <Skeleton className="w-[376px] h-[376px] rounded-lg" />
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-4 flex-1">
                {/* Category */}
                <Skeleton className="h-5 w-24 rounded-md" />

                {/* Product Name */}
                <Skeleton className="h-10 w-3/4 rounded-md" />

                {/* Rating */}
                <div className="flex gap-2 items-center">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-32 rounded-md" />
                </div>

                {/* Price */}
                <Skeleton className="h-10 w-48 rounded-md" />

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-5/6 rounded-md" />
                    <Skeleton className="h-4 w-4/6 rounded-md" />
                </div>

                {/* Actions */}
                <div className="flex gap-4 items-center mt-4">
                    <Skeleton className="h-10 w-32 rounded-md" />
                    <Skeleton className="h-10 w-44 rounded-md" />
                    <Skeleton className="h-10 w-36 rounded-md" />
                </div>
            </div>
        </div>
    );
};

export { ProductDetailSkeleton };
