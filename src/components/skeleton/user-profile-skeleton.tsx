"use client";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfileSkeleton: React.FC = () => {
    return (
        <div className="m-5 p-5 flex flex-col flex-[1] border rounded-xl items-center gap-2">
            {/* Avatar */}
            <div className="flex justify-center pt-3 pb-2">
                <Skeleton className="w-[71px] h-[71px] rounded-[20px]" />
            </div>

            {/* Name */}
            <Skeleton className="h-5 w-32 rounded-md" />

            {/* Badge */}
            <div className="flex items-center gap-2">
                <Skeleton className="w-[14px] h-[20px] rounded-sm" />
                <Skeleton className="h-4 w-24 rounded-md" />
            </div>

            <div className="w-[100%] separator mt-3" />

            {/* Stats */}
            <div className="w-[100%] gap-3 flex flex-col">
                <div className="mt-6">
                    <Skeleton className="h-4 w-32 rounded-md mb-2" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                </div>
                <div>
                    <Skeleton className="h-4 w-28 rounded-md mb-2" />
                    <Skeleton className="h-6 w-28 rounded-md" />
                </div>
                <div className="mt-3">
                    <Skeleton className="h-4 w-24 rounded-md mb-2" />
                    <Skeleton className="h-6 w-24 rounded-md" />
                </div>
            </div>

            <div className="w-[100%] separator mt-6 mb-3" />
        </div>
    );
};

export { UserProfileSkeleton };
