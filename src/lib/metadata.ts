import type { Metadata } from "next";
import {
  defaultLocale,
  locales,
  localizePath,
  ogLocales,
  translatedPaths,
  type Locale,
} from "@/i18n/config";

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";

const defaultSocialImagePath = "/assets/social-preview.jpg";

export function toAbsoluteUrl(path: string) {
  return new URL(path, baseUrl).toString();
}

/** The full address of a page in one language. The home page carries no trailing slash. */
export function pageUrl(path: string, locale: Locale = defaultLocale) {
  const localized = localizePath(locale, path);
  return localized === "/" ? baseUrl : `${baseUrl}${localized}`;
}

/**
 * The path a page has in each language it exists in, without the language prefix. A blog post
 * has a different one per language, since every translation carries its own slug.
 */
export type LanguagePaths = Partial<Record<Locale, string>>;

/** A static page: the same path in every language once its copy is translated, English only until then. */
export function staticLanguagePaths(path: string): LanguagePaths {
  const published = translatedPaths.includes(path) ? locales : [defaultLocale];
  return Object.fromEntries(published.map((locale) => [locale, path]));
}

/**
 * hreflang: one address per language the page exists in, plus English as the fallback for
 * visitors whose language we do not have. Every version must list the same set, itself
 * included, or search engines ignore the annotation. A page that exists in one language has
 * nothing to annotate, and one with no English version has no fallback to name.
 */
export function languageAlternates(
  paths: LanguagePaths,
): Partial<Record<Locale | "x-default", string>> | undefined {
  const versions = locales.flatMap((locale) => {
    const path = paths[locale];
    return path ? [[locale, pageUrl(path, locale)]] : [];
  });
  if (versions.length < 2) return undefined;

  const english = paths[defaultLocale];
  return {
    ...Object.fromEntries(versions),
    ...(english ? { "x-default": pageUrl(english) } : {}),
  };
}

export function robotsFor(index: boolean): Metadata["robots"] {
  return {
    index,
    follow: true,
    googleBot: {
      index,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
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
  locale,
  languagePaths = staticLanguagePaths(path),
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string | string[];
  image?: ReturnType<typeof createSocialImage>;
  openGraphType?: "website" | "article";
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
  /** The language being rendered. */
  locale?: Locale;
  /**
   * Where this page lives in each language it exists in. Left out, the page is a static one:
   * the same path everywhere once it is in translatedPaths. A blog post passes its own.
   */
  languagePaths?: LanguagePaths;
}): Metadata {
  // A page is published in a language only when it exists in it. Otherwise /tr/… is the
  // English page with translated menus: the canonical stays on the English address and the
  // layout's noindex for other languages stands.
  const localizedPath = locale ? languagePaths[locale] : undefined;
  const publishedLocale = localizedPath ? locale : undefined;
  const url = localizedPath
    ? pageUrl(localizedPath, publishedLocale)
    : pageUrl(languagePaths[defaultLocale] ?? path);
  const otherLocales = locales.filter((other) => other !== publishedLocale && languagePaths[other]);
  const hreflang = publishedLocale ? languageAlternates(languagePaths) : undefined;
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
      locale: openGraphConfig?.locale ?? ogLocales[publishedLocale ?? defaultLocale],
      ...(publishedLocale && otherLocales.length > 0
        ? { alternateLocale: otherLocales.map((other) => ogLocales[other]) }
        : {}),
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
      ...(hreflang ? { languages: hreflang } : {}),
    },
    ...(publishedLocale ? { robots: robotsFor(true) } : {}),
  };
}
