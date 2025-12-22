import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'], // Disallow Sanity Studio and API routes
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

