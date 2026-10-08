/**
 * Locales for the marketing site.
 *
 * Deliberately mirrors costume/i18n/config.ts — the two apps ship the same four languages.
 * Here the language comes from the address (/tr, /es, /ar; English is unprefixed), never from
 * a cookie: a search engine keeps one copy per address.
 */
export const locales = ['en', 'tr', 'es', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const languageNames: Record<Locale, { name: string; nativeName: string; flag: string }> = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
};

/** What Open Graph calls each language. */
export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  es: 'es_ES',
  ar: 'ar_AR',
};

/**
 * How a date is written in each language. Arabic keeps Western digits and the Gregorian
 * calendar, like every other number on the page: a bare "ar" leaves both to the server's ICU.
 */
export const dateLocales: Record<Locale, string> = {
  en: 'en-US',
  tr: 'tr-TR',
  es: 'es',
  ar: 'ar-u-nu-latn-ca-gregory',
};

/**
 * Pages whose copy is translated, and so the only ones search engines are shown in every
 * language. Anything not listed still renders under /tr, /es and /ar so the menus stay in the
 * visitor's language, but the body is English: it keeps noindex and a canonical on the English
 * address until its copy is translated and its path is added here.
 */
export const translatedPaths: readonly string[] = [
  '/',
  '/watch-together',
  '/long-distance-date-night',
  '/games',
];

const rtlLocales: Locale[] = ['ar'];

export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirFor(locale: Locale): 'ltr' | 'rtl' {
  return isRtlLocale(locale) ? 'rtl' : 'ltr';
}

/**
 * The address of a page in a given language. English keeps the bare path, the others are
 * prefixed: "/games" → "/tr/games". Home and its anchors become "/tr" and "/tr#faq" rather
 * than "/tr/…", which Next would answer with a redirect. Links that leave the site
 * (https://app.movmash.com/…) pass through untouched.
 */
export function localizePath(locale: Locale, path: string): string {
  if (locale === defaultLocale || !path.startsWith('/')) return path;
  return `/${locale}${path === '/' || path.startsWith('/#') ? path.slice(1) : path}`;
}

/**
 * The same page without its language: "/tr/games" → "/games". "/en" is stripped too. Visitors
 * never see it, but it is what usePathname() reports while a page is rendered on the server,
 * because the middleware rewrites bare addresses onto /en.
 */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  return isLocale(first) ? `/${rest.join('/')}` : pathname;
}
