export interface AffiliateProduct {
  id: string;
  name: string;
  price: string;
  images: string[];
  category: string;
  badge: string;
  rating: string;
  meta: string;
  href: string;
  surface: string;
  glow: string;
}

export type AffiliateFeedStatus =
  | "loading"
  | "ready"
  | "empty"
  | "error"
  | "missing_config";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const spotlightProductsPath = "/api/products";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toStringValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

function getApiOrigin(): string | null {
  if (!apiBaseUrl) return null;

  try {
    return new URL(apiBaseUrl).origin;
  } catch {
    return null;
  }
}

export function getAffiliateProductsEndpoint(): string | null {
  if (typeof window !== "undefined") {
    return spotlightProductsPath;
  }

  if (apiBaseUrl) {
    return `${apiBaseUrl.replace(/\/$/, "")}/api/v1/products`;
  }

  return spotlightProductsPath;
}

export function toRenderableAffiliateImageUrl(value: string): string {
  const raw = value.trim();
  if (!raw) return "";

  if (typeof window === "undefined") {
    return raw;
  }

  const apiOrigin = getApiOrigin();

  if (raw.startsWith("//")) {
    return `${window.location.protocol}${raw}`;
  }

  if (raw.startsWith("/")) {
    return apiOrigin ? `${apiOrigin}${raw}` : `${window.location.origin}${raw}`;
  }

  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(raw);
  if (!hasScheme) {
    if (!apiOrigin) return raw;
    return `${apiOrigin.replace(/\/$/, "")}/${raw.replace(/^\/+/, "")}`;
  }

  try {
    const parsed = new URL(raw);
    if (!LOCAL_HOSTS.has(parsed.hostname)) return parsed.toString();

    if (apiOrigin) {
      const target = new URL(apiOrigin);
      parsed.protocol = target.protocol;
      parsed.hostname = target.hostname;
      parsed.port = target.port;
      return parsed.toString();
    }

    parsed.hostname = window.location.hostname;
    if (!parsed.port && window.location.port) {
      parsed.port = window.location.port;
    }
    return parsed.toString();
  } catch {
    return raw;
  }
}

function normalizeImageList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => toStringValue(item).trim())
      .map((item) => toRenderableAffiliateImageUrl(item))
      .filter((item) => item.length > 0);
  }

  const oneImage = toStringValue(value).trim();
  return oneImage ? [toRenderableAffiliateImageUrl(oneImage)] : [];
}

export function normalizeAffiliateProducts(payload: unknown): AffiliateProduct[] {
  let rawProducts: unknown[] = [];

  if (Array.isArray(payload)) {
    rawProducts = payload;
  } else if (isRecord(payload)) {
    if (Array.isArray(payload.data)) {
      rawProducts = payload.data;
    } else if (isRecord(payload.data) && Array.isArray(payload.data.items)) {
      rawProducts = payload.data.items;
    } else if (Array.isArray(payload.items)) {
      rawProducts = payload.items;
    }
  }

  return rawProducts
    .filter((item): item is Record<string, unknown> => isRecord(item))
    .map((item) => ({
      id: toStringValue(item.id),
      name: toStringValue(item.name),
      price: toStringValue(item.price),
      images: normalizeImageList(item.images),
      category: toStringValue(item.category),
      badge: toStringValue(item.badge),
      rating: toStringValue(item.rating),
      meta: toStringValue(item.meta),
      href: toStringValue(item.href),
      surface: toStringValue(item.surface),
      glow: toStringValue(item.glow),
    }))
    .filter((item) => item.id && item.name && item.href);
}

/**
 * Server-side product fetch, for pages that must ship real content in their HTML.
 *
 * useAffiliateProducts only fetches after mount, which left /watch-party-shop server-rendering
 * nothing but a skeleton: Googlebot saw "Loading feed" where the catalogue should be and filed
 * the URL as a Soft 404 for four months. Pages call this, render the result directly, and pass
 * it to the hook as initial state so there is no skeleton flash on hydration either.
 *
 * Returns [] on any failure — a shop page with no grid is still a valid page, and the client
 * hook retries after mount regardless.
 */
export async function fetchAffiliateProducts(): Promise<AffiliateProduct[]> {
  if (!apiBaseUrl) return [];

  try {
    const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/api/v1/products`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 1800 },
    });

    if (!response.ok) return [];

    return normalizeAffiliateProducts(await response.json());
  } catch {
    return [];
  }
}
