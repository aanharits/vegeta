"use client";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductHistorySkeletonProps {
    count?: number;
}

const ProductHistorySkeleton: React.FC<ProductHistorySkeletonProps> = ({
    count = 3,
}) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={`history-skeleton-${index}`} className="w-full">
                    <div className="mt-6">
                        <div className="border rounded-xl p-4 flex flex-col gap-4">
                            <div className="flex gap-6">
                                {/* Product Image */}
                                <div className="p-1 border rounded-xl overflow-hidden">
                                    <Skeleton className="w-[80px] h-[80px] rounded-lg" />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 flex flex-col gap-2">
                                    <Skeleton className="h-6 w-48 rounded-md" />
                                    <Skeleton className="h-4 w-32 rounded-md" />
                                    <Skeleton className="h-4 w-36 rounded-md" />
                                </div>

                                {/* Transaction Info */}
                                <div className="flex w-auto">
                                    <div className="w-[226px] flex flex-col gap-2 border-r pr-4">
                                        <div className="flex gap-4 items-center">
                                            <Skeleton className="h-4 w-24 rounded-md" />
                                            <Skeleton className="h-5 w-16 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="w-[172px] pl-[22px] pr-[13px] flex flex-col gap-2">
                                        <Skeleton className="h-4 w-20 rounded-md" />
                                        <Skeleton className="h-6 w-28 rounded-md" />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4">
                                <Skeleton className="h-10 w-40 rounded-md" />
                                <Skeleton className="h-10 w-24 rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export { ProductHistorySkeleton };
