import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

export function ShimmerSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-shimmer bg-gradient-to-r from-muted via-gray-700 to-muted bg-[length:1000px_100%]",
        "rounded-md",
        className
      )}
    />
  );
}
