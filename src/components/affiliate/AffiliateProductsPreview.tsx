"use client";

import AffiliateProductsGrid from "@/components/affiliate/AffiliateProductsGrid";
import AffiliateProductsSkeleton from "@/components/affiliate/AffiliateProductsSkeleton";
import { useAffiliateProducts } from "@/components/affiliate/useAffiliateProducts";

const feedMessages = {
  loading: "Loading live room products...",
  ready: "Live room products are loaded from the same backend feed.",
  empty: "The product feed is connected, but there are no products right now.",
  error: "Products could not be loaded right now.",
  missing_config: "Set NEXT_PUBLIC_API_BASE_URL to load the room product feed here too.",
};

export default function AffiliateProductsPreview() {
  const { items, status, isLoading } = useAffiliateProducts(4);

  return (
    <div className="space-y-4">
      {isLoading ? (
        <AffiliateProductsSkeleton count={4} variant="compact" />
      ) : items.length > 0 ? (
        <AffiliateProductsGrid
          products={items}
          context="home_preview"
          variant="compact"
        />
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.02] px-5 py-6 text-sm leading-7 text-white/58">
          {feedMessages[status]}
        </div>
      )}

      <p className="text-xs leading-6 text-white/44">
        Affiliate disclosure: some outbound product links can earn Movmash a commission.
      </p>
    </div>
  );
}
