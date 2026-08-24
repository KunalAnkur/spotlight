import { NextResponse, type NextRequest } from 'next/server'
import { LOCALE_COOKIE, defaultLocale, isLocale } from '@/i18n/config'

/**
 * Puts the active locale into the path without ever showing it in the URL.
 *
 * Pages live under app/[locale]/, which is what lets Next statically prerender one copy per
 * language. This rewrites /watch-together to /en/watch-together (or /tr/...) based on the
 * NEXT_LOCALE cookie, so visitors keep clean canonical URLs and the static build survives.
 *
 * Googlebot does not send cookies, so a crawl always resolves to the English variant — which
 * is exactly the English-only-SEO behaviour we want. Non-default variants also carry noindex
 * from the layout, so a directly-requested /tr/... cannot compete with its English twin.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Already locale-prefixed: someone hit /tr/... directly. Leave it alone rather than
  // producing /tr/tr/...
  const firstSegment = pathname.split('/')[1]
  if (isLocale(firstSegment)) {
    return NextResponse.next()
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const locale = cookieLocale && isLocale(cookieLocale) ? cookieLocale : defaultLocale

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  url.search = search

  return NextResponse.rewrite(url)
}

export const config = {
  /**
   * Everything except Next internals, API routes, the metadata routes that must stay at the
   * domain root (robots.txt, sitemap.xml, the manifest), and anything with a file extension.
   * Sitemap and robots are locale-agnostic by design — there is one English index of the site.
   */
  matcher: [
    '/((?!_next/|api/|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|.*\\.[\\w]+$).*)',
  ],
}
