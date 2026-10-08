import { defaultLocale, isLocale, localizePath, type Locale } from "@/i18n/config";
import type { LanguagePaths } from "@/lib/metadata";
import { client } from "@/sanity/lib/client";
import { blogLanguagesQuery, guideVersionsQuery } from "@/sanity/lib/queries";

/** One language version of a post, as postVersions in the queries returns it. */
export interface PostVersion {
  language: string;
  slug: string | null;
}

/**
 * Where a post lives in each language it is published in, itself included. Each translation
 * has its own slug, so unlike a static page the path differs per language.
 */
export function postLanguagePaths(post: {
  slug: string;
  language: string;
  versions?: (PostVersion | null)[] | null;
}): LanguagePaths {
  const paths: LanguagePaths = {};

  for (const version of [...(post.versions ?? []), post]) {
    if (version?.slug && isLocale(version.language)) {
      paths[version.language] = `/blog/${version.slug}`;
    }
  }

  return paths;
}

/**
 * The blog index exists in a language once that language has a post. Until then /tr/blog is
 * an empty page, which is not worth showing a search engine. English always has one.
 */
export async function blogLanguagePaths(): Promise<LanguagePaths> {
  let languages: string[] = [];

  try {
    languages = await client.fetch<string[]>(blogLanguagesQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Error fetching blog languages:", error);
  }

  return Object.fromEntries(
    [defaultLocale, ...languages].filter(isLocale).map((language) => [language, "/blog"]),
  );
}

/**
 * The guides a page links to, as they exist in one language.
 *
 * A page names its guides by their English address. In another language a guide is offered
 * only once its translation is published, and at that translation's own address. Until then
 * it is left out: the alternatives are an English article on a Turkish page, or a link to
 * nothing. Publishing the translation is all it takes for the link to appear.
 */
export async function guidesIn<Guide extends { href: string }>(locale: Locale, guides: Guide[]): Promise<Guide[]> {
  if (locale === defaultLocale || guides.length === 0) return guides;

  let posts: { slug: string; versions?: (PostVersion | null)[] | null }[] = [];

  try {
    posts = await client.fetch(
      guideVersionsQuery,
      { slugs: guides.map(({ href }) => href.replace("/blog/", "")) },
      { next: { revalidate: 60 } },
    );
  } catch (error) {
    console.error("Error fetching translated guides:", error);
  }

  const translated = new Map(
    posts.map((post) => [`/blog/${post.slug}`, postLanguagePaths({ ...post, language: defaultLocale })[locale]]),
  );

  return guides.flatMap((guide) => {
    const path = translated.get(guide.href);
    return path ? [{ ...guide, href: localizePath(locale, path) }] : [];
  });
}
