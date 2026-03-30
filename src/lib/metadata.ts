import type { Metadata } from "next";

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";

const defaultSocialImagePath = "/assets/social-preview.jpg";

export function toAbsoluteUrl(path: string) {
  return new URL(path, baseUrl).toString();
}

export function createSocialImage({
  url = defaultSocialImagePath,
  alt = "Movmash room interface with synced video, chat, and reactions",
  width = 1200,
  height = 630,
  type,
}: {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  type?: string;
} = {}) {
  const absoluteUrl = /^https?:\/\//.test(url) ? url : toAbsoluteUrl(url);
  const inferredType =
    type ||
    (absoluteUrl.endsWith(".png")
      ? "image/png"
      : absoluteUrl.endsWith(".jpg") || absoluteUrl.endsWith(".jpeg")
        ? "image/jpeg"
        : undefined);

  return {
    url: absoluteUrl,
    secureUrl: absoluteUrl,
    width,
    height,
    alt,
    ...(inferredType ? { type: inferredType } : {}),
  };
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords,
  image,
  openGraphType = "website",
  openGraph,
  twitter,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string | string[];
  image?: ReturnType<typeof createSocialImage>;
  openGraphType?: "website" | "article";
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
}): Metadata {
  const url = toAbsoluteUrl(path);
  const socialImage = image ?? createSocialImage();
  const resolvedKeywords = Array.isArray(keywords) ? keywords.join(", ") : keywords;
  const openGraphConfig = openGraph as
    | {
        title?: string;
        description?: string;
        url?: string | URL;
        type?: "website" | "article";
        locale?: string;
        siteName?: string;
        images?: Array<string | ReturnType<typeof createSocialImage>>;
      }
    | undefined;
  const twitterConfig = twitter as
    | {
        card?: "summary" | "summary_large_image" | "app" | "player";
        title?: string;
        description?: string;
        creator?: string;
        images?: string[];
      }
    | undefined;

  return {
    title,
    description,
    ...(resolvedKeywords ? { keywords: resolvedKeywords } : {}),
    openGraph: {
      ...openGraph,
      title: openGraphConfig?.title ?? title,
      description: openGraphConfig?.description ?? description,
      url: openGraphConfig?.url ?? url,
      type: openGraphConfig?.type ?? openGraphType,
      locale: openGraphConfig?.locale ?? "en_US",
      siteName: openGraphConfig?.siteName ?? "Movmash",
      images: openGraphConfig?.images ?? [socialImage],
    },
    twitter: {
      ...twitter,
      card: twitterConfig?.card ?? "summary_large_image",
      title: twitterConfig?.title ?? title,
      description: twitterConfig?.description ?? description,
      creator: twitterConfig?.creator ?? "@movmash",
      images: twitterConfig?.images ?? [socialImage.url],
    },
    alternates: {
      canonical: url,
    },
  };
}
