"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/LocaleProvider";
import { pageSnapshot, reportClientError } from "@/lib/client-error";

/**
 * What a page shows when it breaks in the browser — for a visitor, and for Google's renderer.
 *
 * Without this, Next swaps the whole document for its built-in "Application error" screen: no
 * title, no canonical, the same few words on every Next.js site. One script file failing to
 * load is enough, and that is how Google came to file /tr/games, /es/games and
 * /ar/long-distance-date-night (October 2026) as copies of an unrelated betting site.
 *
 * This boundary sits inside the [locale] layout, so <head> survives untouched. The body keeps
 * the page as the server sent it, read from #page-root before React replaces it: still
 * readable and indexable, only without its interactive parts. The error is reported to
 * /api/client-error, so the next one can be read in Vercel's logs instead of guessed.
 */
export default function PageError({ error }: { error: Error & { digest?: string } }) {
  const t = useT("error");
  const [html] = useState(pageSnapshot);

  useEffect(() => {
    reportClientError(error, "page");
  }, [error]);

  if (html) return <div className="contents" dangerouslySetInnerHTML={{ __html: html }} />;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="font-parkinsans text-2xl font-semibold tracking-tight text-white">{t("title")}</h1>
      <p className="max-w-md text-sm leading-7 text-white/62">{t("body")}</p>
      <Button type="button" onClick={() => window.location.reload()}>
        {t("retry")}
      </Button>
    </main>
  );
}
