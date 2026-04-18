"use client";

import { ExternalLink, ShoppingBag } from "lucide-react";
import AffiliateProductsGrid from "@/components/affiliate/AffiliateProductsGrid";
import AffiliateProductsSkeleton from "@/components/affiliate/AffiliateProductsSkeleton";
import { useAffiliateProducts } from "@/components/affiliate/useAffiliateProducts";

const statusCopy = {
  loading: "Loading feed",
  ready: "Live feed",
  empty: "No products",
  error: "Feed unavailable",
  missing_config: "Feed not configured",
};

export default function AffiliateShopCatalog() {
  const { items, status, isLoading } = useAffiliateProducts();
  const categories = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean)),
  ).slice(0, 8);

  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[12px] text-white/72">
            <ShoppingBag className="h-3.5 w-3.5" />
            {isLoading ? "Loading..." : `${items.length} products`}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[12px] text-white/72">
            <ExternalLink className="h-3.5 w-3.5" />
            Affiliate links
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[12px] text-white/72">
            {statusCopy[status]}
          </span>
        </div>

        {categories.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/[0.08] bg-black/18 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/64"
              >
                {category}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {isLoading ? (
        <AffiliateProductsSkeleton count={8} />
      ) : items.length > 0 ? (
        <AffiliateProductsGrid products={items} context="shop_page" />
      ) : (
        <div className="rounded-[1.6rem] border border-dashed border-white/12 bg-white/[0.02] px-6 py-7 text-sm leading-7 text-white/58">
          {status === "empty"
            ? "The feed is connected, but there are no products right now."
            : status === "missing_config"
              ? "Set NEXT_PUBLIC_API_BASE_URL to load the Guardian product feed here."
              : "The product feed could not be loaded right now."}
        </div>
      )}

      <p className="text-xs leading-6 text-white/42">
        External product links may earn Movmash a commission.
      </p>
    </section>
  );
}
