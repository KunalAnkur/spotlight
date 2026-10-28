import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // /api/client-error is where a page that broke in the browser reports itself
        // (src/lib/client-error.ts). Google's renderer only calls what this file allows, and
        // its reports are the ones worth having; the longer, more specific rule wins.
        allow: ['/', '/api/client-error'],
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

