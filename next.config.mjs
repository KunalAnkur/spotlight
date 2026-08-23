import { readFileSync } from 'node:fs'

/**
 * Retired blog posts. Each was thin content that duplicated a stronger article, so the URL
 * is consolidated into the post that replaced it rather than left to 404.
 *
 * The list is JSON rather than inline so the sitemap can read the same file and stop
 * advertising these slugs — they still exist in Sanity, and listing a URL that 308s is what
 * Search Console reports as "Page with redirect".
 */
const retiredPosts = JSON.parse(
  readFileSync(new URL('./src/content/retired-posts.json', import.meta.url), 'utf8'),
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    externalDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  async redirects() {
    return [
      // The legal pages live as tabs on /legal. These used to be server components calling
      // redirect(), which Vercel served as a cached 307 with no Location header — a dead end
      // that Googlebot reported as "Redirect error". Config redirects emit a clean 308.
      {
        source: '/privacy',
        destination: '/legal?tab=privacy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/legal?tab=terms',
        permanent: true,
      },
      {
        source: '/cookies',
        destination: '/legal?tab=cookies',
        permanent: true,
      },
      ...retiredPosts.map(({ from, to }) => ({
        source: from,
        destination: to,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
