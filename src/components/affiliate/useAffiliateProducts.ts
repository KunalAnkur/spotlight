"use client";

import { startTransition, useEffect, useState } from "react";
import {
  type AffiliateFeedStatus,
  type AffiliateProduct,
  getAffiliateProductsEndpoint,
  normalizeAffiliateProducts,
} from "@/lib/affiliate-products";

/**
 * `initialItems` lets a server component hand over a feed it already fetched, so the markup
 * ships with real products instead of a skeleton. The effect below still refreshes after
 * mount — it just starts from "ready" rather than "loading" when seeded, which keeps the grid
 * from flashing back to placeholders on hydration.
 */
export function useAffiliateProducts(limit?: number, initialItems?: AffiliateProduct[]) {
  const seeded = initialItems && initialItems.length > 0;
  const [items, setItems] = useState<AffiliateProduct[]>(() =>
    seeded ? (typeof limit === "number" ? initialItems.slice(0, limit) : initialItems) : [],
  );
  const [status, setStatus] = useState<AffiliateFeedStatus>(() => {
    if (seeded) return "ready";
    return getAffiliateProductsEndpoint() ? "loading" : "missing_config";
  });

  useEffect(() => {
    const endpoint = getAffiliateProductsEndpoint();

    if (!endpoint) {
      setItems([]);
      setStatus("missing_config");
      return;
    }

    const controller = new AbortController();
    let isActive = true;

    if (!seeded) {
      startTransition(() => {
        setStatus("loading");
      });
    }

    const loadProducts = async () => {
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Product feed request failed with status ${response.status}`);
        }

        const payload = (await response.json()) as unknown;
        const normalizedItems = normalizeAffiliateProducts(payload);

        if (!isActive) {
          return;
        }

        setItems(typeof limit === "number" ? normalizedItems.slice(0, limit) : normalizedItems);
        setStatus(normalizedItems.length > 0 ? "ready" : "empty");
      } catch (error) {
        if (!isActive || controller.signal.aborted) {
          return;
        }

        console.error("[affiliate-products] Failed to load product feed", error);

        // A failed refresh should not empty a grid the server already filled — the seeded
        // products are stale at worst, whereas clearing them puts the page back to the blank
        // state that got it flagged as a Soft 404.
        if (!seeded) {
          setItems([]);
        }
        setStatus(seeded ? "ready" : "error");
      }
    };

    void loadProducts();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [limit, seeded]);

  return {
    items,
    status,
    isLoading: status === "loading",
  };
}
