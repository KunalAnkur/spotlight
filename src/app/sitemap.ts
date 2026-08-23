import { existsSync, statSync } from 'fs'
import { join } from 'path'
import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { postSlugsQuery } from '@/sanity/lib/queries'
import retiredPosts from '@/content/retired-posts.json'

// Retired posts are still documents in Sanity, but their URLs 308 to the article that
// replaced them. A sitemap should list destinations, never redirects.
const retiredSlugs = new Set(retiredPosts.map(({ from }) => from.replace('/blog/', '')))

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com'

function getFileLastModified(relativePath: string) {
  const filePath = join(process.cwd(), relativePath)

  if (!existsSync(filePath)) {
    return undefined
  }

  return statSync(filePath).mtime
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: getFileLastModified('src/app/page.tsx'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: getFileLastModified('src/app/blog/page.tsx'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: getFileLastModified('src/app/games/page.tsx'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: getFileLastModified('src/app/about/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: getFileLastModified('src/app/contact/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/watch-together`,
      lastModified: getFileLastModified('src/app/watch-together/page.tsx'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/long-distance-date-night`,
      lastModified: getFileLastModified('src/app/long-distance-date-night/page.tsx'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/watch-party-shop`,
      lastModified: getFileLastModified('src/app/watch-party-shop/page.tsx'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: getFileLastModified('src/app/legal/page.tsx'),
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
