import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import ar from '@/i18n/messages/ar.json';
import en from '@/i18n/messages/en.json';
import es from '@/i18n/messages/es.json';
import tr from '@/i18n/messages/tr.json';

export type Messages = typeof en;

const messagesByLocale: Record<Locale, Messages> = {
  en,
  tr: tr as Messages,
  es: es as Messages,
  ar: ar as Messages,
};

/**
 * Server-side translation. No React context and no "use client" anywhere in this file, which
 * is the entire point: spotlight's landing components are server components, and moving their
 * copy behind a client-only provider would strip ~6,500 words out of the server HTML. That is
 * exactly what got /watch-party-shop filed as a Soft 404.
 *
 * Missing keys fall back to English rather than rendering the raw key, so a partial
 * translation degrades to English copy instead of "nav.features" leaking into the page.
 */
function lookup(messages: Messages, path: string): string | undefined {
  let result: unknown = messages;

  for (const key of path.split('.')) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return typeof result === 'string' ? result : undefined;
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => params[key]?.toString() ?? `{${key}}`);
}

export function resolveLocale(value?: string): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

export function getMessages(locale: Locale): Messages {
  return messagesByLocale[locale] ?? en;
}

export type Translator = (key: string, params?: Record<string, string | number>) => string;

export function getTranslations(locale: Locale, namespace?: string): Translator {
  const messages = getMessages(locale);

  return (key, params) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const value = lookup(messages, fullKey) ?? lookup(en, fullKey) ?? fullKey;
    return interpolate(value, params);
  };
}
