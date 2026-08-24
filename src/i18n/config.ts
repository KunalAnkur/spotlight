/**
 * Locales for the marketing site.
 *
 * Deliberately mirrors costume/i18n/config.ts — the two apps ship the same four languages and
 * a visitor moving from movmash.com to app.movmash.com should not change language on the way.
 * The NEXT_LOCALE cookie is shared for the same reason.
 */
export const locales = ['en', 'tr', 'es', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const LOCALE_COOKIE = 'NEXT_LOCALE';

export const languageNames: Record<Locale, { name: string; nativeName: string; flag: string }> = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
};

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
