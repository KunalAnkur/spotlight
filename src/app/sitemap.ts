import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { postSlugsQuery } from '@/sanity/lib/queries'
import retiredPosts from '@/content/retired-posts.json'

// Retired posts are still documents in Sanity, but their URLs 308 to the article that
// replaced them. A sitemap should list destinations, never redirects.
const retiredSlugs = new Set(retiredPosts.map(({ from }) => from.replace('/blog/', '')))

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com'

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
  '/': '2026-08-23',
  '/blog': '2026-08-23',
  '/games': '2026-08-25',
  '/about': '2026-03-30',
  '/contact': '2026-03-30',
  '/watch-together': '2026-08-26',
  '/long-distance-date-night': '2026-08-26',
  '/watch-party-shop': '2026-08-24',
  '/legal': '2026-08-23',
}

function lastModifiedFor(path: string) {
  const value = PAGE_LAST_MODIFIED[path]
  return value ? new Date(value) : undefined
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastModifiedFor('/'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastModifiedFor('/blog'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: lastModifiedFor('/games'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastModifiedFor('/about'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastModifiedFor('/contact'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/watch-together`,
      lastModified: lastModifiedFor('/watch-together'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/long-distance-date-night`,
      lastModified: lastModifiedFor('/long-distance-date-night'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/watch-party-shop`,
      lastModified: lastModifiedFor('/watch-party-shop'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: lastModifiedFor('/legal'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Fetch blog post slugs from Sanity
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const slugs = await client.fetch<{ slug: string; _updatedAt?: string; publishedAt?: string }[]>(postSlugsQuery)
    blogPosts = slugs
      .filter((item) => item.slug && !retiredSlugs.has(item.slug))
      .map((item) => ({
        url: `${baseUrl}/blog/${item.slug}`,
        lastModified: item._updatedAt || item.publishedAt || undefined,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    // Continue without blog posts if there's an error
  }

  return [...staticPages, ...blogPosts]
}
