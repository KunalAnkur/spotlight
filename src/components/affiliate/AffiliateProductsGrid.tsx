import { cn } from "@/lib/utils";
import type { AffiliateProduct } from "@/lib/affiliate-products";
import AffiliateProductCard from "@/components/affiliate/AffiliateProductCard";

interface AffiliateProductsGridProps {
  products: AffiliateProduct[];
  context: "home_preview" | "shop_page";
  variant?: "compact" | "full";
  className?: string;
}

export default function AffiliateProductsGrid({
  products,
  context,
  variant = "full",
  className,
}: AffiliateProductsGridProps) {
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
      {products.map((product, index) => (
        <AffiliateProductCard
          key={`${product.id}-${index}`}
          product={product}
          position={index}
          context={context}
          variant={variant}
        />
      ))}
    </div>
  );
}
