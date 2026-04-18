"use client";

import { startTransition, useEffect, useState } from "react";
import {
  type AffiliateFeedStatus,
  type AffiliateProduct,
  getAffiliateProductsEndpoint,
  normalizeAffiliateProducts,
} from "@/lib/affiliate-products";

export function useAffiliateProducts(limit?: number) {
  const [items, setItems] = useState<AffiliateProduct[]>([]);
  const [status, setStatus] = useState<AffiliateFeedStatus>(() =>
    getAffiliateProductsEndpoint() ? "loading" : "missing_config",
  );

  useEffect(() => {
    const endpoint = getAffiliateProductsEndpoint();

    if (!endpoint) {
      setItems([]);
      setStatus("missing_config");
      return;
    }

    const controller = new AbortController();
    let isActive = true;

    startTransition(() => {
      setStatus("loading");
    });

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
        setItems([]);
        setStatus("error");
      }
    };

    void loadProducts();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [limit]);

  return {
    items,
    status,
    isLoading: status === "loading",
  };
}
