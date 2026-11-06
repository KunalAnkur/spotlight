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

/**
 * The address decides the language: bare paths are English, and /tr, /es and /ar are pages of
 * their own. Nothing else does (no cookie, no browser setting), because a search engine keeps
 * one copy per address.
 *
 * Pages live under app/[locale]/ so Next can prerender one copy per language, which is why the
 * bare English paths are rewritten onto /en. /en itself is never shown: asked for directly, it
 * redirects to the bare path so English has a single address.
 *
 * This used to be src/middleware.ts. Middleware runs as a Vercel Function on every page view,
 * and with every page now prerendered it was most of the site's remaining CPU use. Config
 * rewrites and redirects are applied by Vercel's router without running any code.
 *
 * Paths left alone: the other languages, /api, Next internals, and anything with a file
 * extension (robots.txt, sitemap.xml, icons, the manifest).
 */
const UNPREFIXED_PATH =
  '/:path((?!(?:en|tr|es|ar)(?:/|$))(?!api/)(?!_next/)(?!.*\\.\\w+$).+)'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/', destination: '/en' },
      { source: UNPREFIXED_PATH, destination: '/en/:path' },
    ]
  },
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
      // English has one address, the bare one (see UNPREFIXED_PATH above).
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
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
