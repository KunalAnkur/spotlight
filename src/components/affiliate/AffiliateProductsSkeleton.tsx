import { cn } from "@/lib/utils";

interface AffiliateProductsSkeletonProps {
  count?: number;
  variant?: "compact" | "full";
  className?: string;
}

export default function AffiliateProductsSkeleton({
  count = 4,
  variant = "full",
  className,
}: AffiliateProductsSkeletonProps) {
  return (
    <div
      className={cn(
        "grid gap-2.5 sm:gap-3 md:gap-4",
        variant === "compact"
          ? "grid-cols-2 lg:grid-cols-4"
          : "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-white/[0.09] bg-gradient-to-b from-white/[0.055] to-white/[0.018] md:rounded-2xl"
        >
          <div
            className={cn(
              "animate-pulse border-b border-white/[0.07] bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)]",
              variant === "compact" ? "h-[72px] md:h-28" : "h-[112px] md:h-36",
            )}
          />
          <div className="space-y-2 px-3 py-3">
            <div className="h-4 w-3/5 animate-pulse rounded-full bg-white/10" />
            <div className="h-5 w-4/5 animate-pulse rounded-full bg-white/12" />
            <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/8" />
          </div>
        </div>
      ))}
    </div>
  );
}
