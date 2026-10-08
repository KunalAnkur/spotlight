import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { postSlugsQuery } from '@/sanity/lib/queries'
import retiredPosts from '@/content/retired-posts.json'
import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/config'
import { postLanguagePaths, type PostVersion } from '@/lib/blog'
import { languageAlternates, pageUrl, staticLanguagePaths, type LanguagePaths } from '@/lib/metadata'

// Without this the sitemap is generated once at build time and then served unchanged until
// the next deploy — a post published in Sanity stayed out of it for weeks, which is the one
// place Google is told the post exists. The blog pages already revalidate; the index of them
// has to as well.
export const revalidate = 3600

// Retired posts are still documents in Sanity, but their URLs 308 to the article that
// replaced them. A sitemap should list destinations, never redirects.
const retiredSlugs = new Set(retiredPosts.map(({ from }) => from.replace('/blog/', '')))

/**
 * When each static page's content last actually changed.
 *
 * This used to read file mtimes, which does not survive deployment: Vercel checks the repo
 * out fresh, so every file carries the build timestamp and all nine pages claimed to change
 * on every deploy. Google discounts lastmod values it finds unreliable, so that noise was
 * costing us the signal on the pages that genuinely had changed.
 *
 * Update the date here when you meaningfully change a page's content. Leaving it stale is
 * the correct behaviour for a page that has not changed.
 */
const PAGE_LAST_MODIFIED: Record<string, string> = {
  '/': '2026-10-01',
  '/blog': '2026-10-04',
  '/games': '2026-10-06',
  '/about': '2026-03-30',
  '/contact': '2026-03-30',
  '/watch-together': '2026-10-06',
  '/long-distance-date-night': '2026-10-06',
  '/watch-party-shop': '2026-08-24',
  '/legal': '2026-08-23',
}

function lastModifiedFor(path: string) {
  const value = PAGE_LAST_MODIFIED[path]
  return value ? new Date(value) : undefined
}

const STATIC_PAGES: (Pick<MetadataRoute.Sitemap[number], 'changeFrequency' | 'priority'> & { path: string })[] = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.9 },
  { path: '/games', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/watch-together', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/long-distance-date-night', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/watch-party-shop', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/legal', changeFrequency: 'yearly', priority: 0.3 },
]

interface SitemapPost {
  slug: string
  language: string
  versions?: (PostVersion | null)[] | null
  updatedAt?: string
  _updatedAt?: string
  publishedAt?: string
}

/** One entry per language a page exists in, each naming the others. */
function entriesFor(
  paths: LanguagePaths,
  entry: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>,
): MetadataRoute.Sitemap {
  const languages = languageAlternates(paths)

  return locales.flatMap((locale) => {
    const path = paths[locale]
    if (!path) return []

    return [{ ...entry, url: pageUrl(path, locale), ...(languages ? { alternates: { languages } } : {}) }]
  })
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch blog posts from Sanity
  let posts: SitemapPost[] = []
  try {
    posts = await client.fetch<SitemapPost[]>(postSlugsQuery)
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    // Continue without blog posts if there's an error
  }
  posts = posts.filter(
    (post) => post.slug && isLocale(post.language) && !(post.language === defaultLocale && retiredSlugs.has(post.slug)),
  )

  // The blog index is a page in every language that has a post, and in English always.
  const blogLanguages: LanguagePaths = Object.fromEntries(
    [defaultLocale, ...posts.map((post) => post.language)].filter(isLocale).map((language) => [language, '/blog']),
  )

  // A translated page is listed once per language, and every entry names all of them. An
  // untranslated page is listed in English only: its other-language copies are noindex.
  const staticPages = STATIC_PAGES.flatMap(({ path, ...page }) =>
    entriesFor(path === '/blog' ? blogLanguages : staticLanguagePaths(path), {
      ...page,
      lastModified: lastModifiedFor(path),
    }),
  )

  // A post is listed under its own language, naming its translations. The date is the one an
  // editor set ("SEO Updated At") when there is one: Sanity's own _updatedAt moves on every
  // technical patch, and a migration should not make a post look freshly edited.
  const blogPosts = posts.map((post) => {
    const languages = languageAlternates(postLanguagePaths(post))

    return {
      url: pageUrl(`/blog/${post.slug}`, post.language as Locale),
      lastModified: post.updatedAt || post._updatedAt || post.publishedAt || undefined,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      ...(languages ? { alternates: { languages } } : {}),
    }
  })

  return [...staticPages, ...blogPosts]
}
