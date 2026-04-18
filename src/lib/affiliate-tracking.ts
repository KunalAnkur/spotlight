import type { AffiliateProduct } from "@/lib/affiliate-products";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

type AffiliateTrackingContext = "home_preview" | "shop_page";

function getHostname(value: string) {
  try {
    return new URL(value).hostname;
  } catch {
    return undefined;
  }
}

export function trackAffiliateProductClick({
  product,
  context,
  position,
}: {
  product: AffiliateProduct;
  context: AffiliateTrackingContext;
  position: number;
}) {
  if (typeof window === "undefined") {
    return;
  }

  const eventParams = {
    event_category: "affiliate",
    event_label: product.name,
    affiliate_context: context,
    product_id: product.id,
    product_name: product.name,
    product_category: product.category || undefined,
    product_badge: product.badge || undefined,
    product_price: product.price || undefined,
    destination_domain: getHostname(product.href),
    position,
  };

  window.gtag?.("event", "affiliate_product_opened", eventParams);
  window.dataLayer?.push({
    event: "affiliate_product_opened",
    ...eventParams,
  });
}
