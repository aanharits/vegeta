"use client";
import { Skeleton } from "@/components/ui/skeleton";

interface CheckoutItemSkeletonProps {
    count?: number;
}

const CheckoutItemSkeleton: React.FC<CheckoutItemSkeletonProps> = ({
    count = 3,
}) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={`checkout-skeleton-${index}`} className="w-full">
                    <div className="flex gap-6 items-center">
                        {/* Checkbox */}
                        <Skeleton className="w-6 h-6 rounded-md" />

                        {/* Product Image */}
                        <div className="p-1 border rounded-lg">
                            <Skeleton className="w-[80px] h-[80px] rounded-lg" />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-1 flex-col justify-center gap-2">
                            <Skeleton className="h-5 w-40 rounded-md" />
                            <Skeleton className="h-6 w-28 rounded-md" />
                        </div>

                        {/* Stepper */}
                        <Skeleton className="h-10 w-32 rounded-md" />

                        {/* Delete Button */}
                        <Skeleton className="h-9 w-16 rounded-md" />
                    </div>
                </div>
            ))}
        </>
    );
};

const CheckoutSummarySkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-3 border p-3 rounded-xl">
            {/* Title */}
            <Skeleton className="h-6 w-36 rounded-md" />

            {/* Total Belanja */}
            <Skeleton className="h-5 w-28 rounded-md" />

            {/* Price rows */}
            <div className="flex justify-between">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
            </div>
            <div className="flex justify-between">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
            </div>
            <div className="flex justify-between">
                <Skeleton className="h-4 w-36 rounded-md" />
                <Skeleton className="h-4 w-16 rounded-md" />
            </div>

            <div className="w-full separator" />

            {/* Biaya Transaksi */}
            <Skeleton className="h-5 w-32 rounded-md" />
            <div className="flex justify-between">
                <Skeleton className="h-4 w-36 rounded-md" />
                <Skeleton className="h-4 w-16 rounded-md" />
            </div>

            <div className="w-full separator" />

            {/* Total */}
            <div className="flex justify-between">
                <Skeleton className="h-6 w-28 rounded-md" />
                <Skeleton className="h-6 w-32 rounded-md" />
            </div>
        </div>
    );
};

export { CheckoutItemSkeleton, CheckoutSummarySkeleton };
