import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale } from '@/i18n/config'

/**
 * The address decides the language: bare paths are English, and /tr, /es and /ar are pages of
 * their own. Nothing else does — no cookie, no browser setting — because a search engine keeps
 * one copy per address, and an address that changes language with the visitor leaves it
 * nothing to keep for the other languages.
 *
 * Pages live under app/[locale]/ so Next can prerender one copy per language, which is why the
 * bare English paths are rewritten onto /en. /en itself is never shown: asked for directly, it
 * redirects to the bare path so English has a single address.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split('/')[1]
  const url = request.nextUrl.clone()

  if (firstSegment === defaultLocale) {
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }

  if (isLocale(firstSegment)) {
    return NextResponse.next()
  }

  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  /**
   * Everything except Next internals, API routes, the metadata routes that must stay at the
   * domain root (robots.txt, sitemap.xml, the manifest), and anything with a file extension.
   * Sitemap and robots stay at the root: one sitemap lists every language.
   */
  matcher: [
    '/((?!_next/|api/|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|.*\\.[\\w]+$).*)',
  ],
}
