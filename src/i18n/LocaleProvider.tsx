"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { defaultLocale, type Locale } from "@/i18n/config";
import type { Messages, Translator } from "@/i18n/server";

/**
 * Client-side access to the active locale, for the chrome only.
 *
 * Navbar, Footer, FAQSection and ContactForm are already "use client" for their own reasons,
 * so reading translations from context costs them nothing. Every *server* component takes the
 * locale as a prop and calls getTranslations directly instead — dragging them behind this
 * provider would turn them into client components and strip their copy out of the server HTML,
 * which is the whole reason /watch-party-shop was a Soft 404.
 */
interface LocaleContextValue {
  locale: Locale;
  messages: Messages;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

function lookup(messages: Messages, path: string): string | undefined {
  let result: unknown = messages;
  for (const key of path.split(".")) {
    if (result && typeof result === "object" && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return typeof result === "string" ? result : undefined;
}

export function useLocale(): Locale {
  return useContext(LocaleContext)?.locale ?? defaultLocale;
}

export function useT(namespace?: string): Translator {
  const context = useContext(LocaleContext);

  return useCallback(
    (key, params) => {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      const value = context ? lookup(context.messages, fullKey) : undefined;
      const template = value ?? fullKey;
      if (!params) return template;
      return template.replace(/\{(\w+)\}/g, (_, name) => params[name]?.toString() ?? `{${name}}`);
    },
    [context, namespace],
  );
}
