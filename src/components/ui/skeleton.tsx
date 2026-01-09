import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer",
        className
      )}
      {...props}
    />
  )
}

// Skeleton wrapper with fade-in transition when content loads
function SkeletonContainer({
  isLoading,
  skeleton,
  children,
}: {
  isLoading: boolean
  skeleton: React.ReactNode
  children: React.ReactNode
}) {
  if (isLoading) {
    return <>{skeleton}</>
  }

  return (
    <div className="animate-fadeIn">
      {children}
    </div>
  )
}

export { Skeleton, SkeletonContainer }
