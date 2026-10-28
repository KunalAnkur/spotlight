"use client";

import { useEffect, useState } from "react";
import { documentSnapshot, reportClientError } from "@/lib/client-error";

/**
 * The words for when not even the page could be kept. They mirror `error.title` and
 * `error.retry` in the message files, repeated here because this screen renders when the
 * [locale] layout itself has failed — the translation provider failed with it — and this
 * component ships with every page, so it cannot carry the four message files.
 */
const copy = {
  en: { title: "This page didn't load properly.", retry: "Reload the page" },
  tr: { title: "Sayfa düzgün yüklenemedi.", retry: "Sayfayı yenile" },
  es: { title: "La página no se cargó bien.", retry: "Recargar la página" },
  ar: { title: "لم يتم تحميل الصفحة بشكل صحيح.", retry: "أعد تحميل الصفحة" },
};

/**
 * The last resort, for an error in the [locale] layout itself; [locale]/error.tsx covers the
 * usual case. Next's own version is the blank "Application error" document, which search
 * engines file as a copy of every other Next.js site showing it. This one rebuilds the head
 * tags they read — title, description, canonical, hreflang — and the page as the server sent it.
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  const [page] = useState(documentSnapshot);
  const text = copy[(page.lang in copy ? page.lang : "en") as keyof typeof copy];

  useEffect(() => {
    reportClientError(error, "root");
  }, [error]);

  return (
    <html lang={page.lang} dir={page.dir} className={page.className || undefined}>
      <head>
        {page.title ? <title>{page.title}</title> : null}
        {page.description ? <meta name="description" content={page.description} /> : null}
        {page.canonical ? <link rel="canonical" href={page.canonical} /> : null}
        {page.alternates.map(({ hrefLang, href }) => (
          <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
        ))}
        {page.stylesheets.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>
        {page.body ? (
          <div dangerouslySetInnerHTML={{ __html: page.body }} />
        ) : (
          <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#09090c] px-6 text-center text-white">
            <h1 className="text-2xl font-semibold">{text.title}</h1>
            <button type="button" onClick={() => window.location.reload()} className="underline underline-offset-4">
              {text.retry}
            </button>
          </main>
        )}
      </body>
    </html>
  );
}
