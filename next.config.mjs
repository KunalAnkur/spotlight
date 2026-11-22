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
  /**
   * These run in `beforeFiles`, not the default `afterFiles`, and the distinction is the whole
   * point: Next resolves a route's RSC payload (the `.rsc` file a <Link> prefetch asks for)
   * during the filesystem step, which `afterFiles` is too late for.
   *
   * As an afterFiles rule, `/blog/some-post` rendered fine but its prefetch —
   * `GET /blog/some-post?_rsc=...` with the RSC header — resolved to `/blog/some-post.rsc`,
   * which no rule matched (the source below skips anything with a file extension) and which
   * the router answered with /404. Every <Link> on a page fired one of those on view: the blog
   * index alone sent 25 failed prefetches per visit, none cacheable by the browser, so they
   * came back on the next visit and grew with every post added. They were a large and rising
   * share of the CDN requests on Vercel's Hobby plan.
   *
   * Running before the filesystem, the locale prefix is applied first, so the prefetch resolves
   * to `/en/blog/some-post.rsc`, which is prerendered.
   */
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/en' },
        { source: UNPREFIXED_PATH, destination: '/en/:path' },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
  output: 'standalone',
  experimental: {
    externalDir: true,
  },
  images: {
    /**
     * An optimized image is re-validated by the browser as often as its source tells it to,
     * and Next's floor for that is 60 seconds. /public was answering `max-age=0`, so the
     * optimizer passed that on and every <Image> on the page came back to the CDN on each
     * page view — 368 requests in a 12h window against ~6,000 for the whole site.
     *
     * A week is safe for everything served here: the files under /public change only on a
     * deploy, and a Sanity asset URL carries the asset's own hash, so new artwork is a new
     * URL rather than a changed one.
     */
    minimumCacheTTL: 604800,
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
  /**
   * Anything served out of /public gets `Cache-Control: public, max-age=0, must-revalidate`
   * from Next by default, so the browser re-asks for it on every page view. The icons are
   * referenced from <head> and the manifest, which means every visit to every page spent a
   * CDN request per icon re-confirming a file that had not changed — in one 12h window on
   * Vercel, /android-chrome-512x512.png alone accounted for 338 requests and
   * /manifest.webmanifest for 179, against ~6,000 for the whole site.
   *
   * A week of freshness with a month of stale-while-revalidate keeps them out of the request
   * count without pinning a stale icon: a rebrand reaches everyone within a week, and sooner
   * for anyone who has not visited in the meantime. /_next/static is left alone — Next already
   * sends `immutable` there, because those filenames carry a content hash.
   */
  async headers() {
    const cache = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=604800, stale-while-revalidate=2592000',
      },
    ]

    return [
      {
        source:
          '/:icon(favicon.ico|favicon-16x16.png|favicon-32x32.png|apple-touch-icon.png|android-chrome-192x192.png|android-chrome-512x512.png|manifest.webmanifest)',
        headers: cache,
      },
      { source: '/assets/:path*', headers: cache },
    ]
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
