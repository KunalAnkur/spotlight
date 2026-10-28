/**
 * What the error screens ([locale]/error.tsx, app/global-error.tsx) need from the page they
 * replace, and the report they send about it.
 *
 * Both are read during the error screen's first render, before React commits it: at that
 * moment the document still holds the page as the server sent it.
 */

/** The page as the server sent it: everything the [locale] layout wraps in #page-root. */
export function pageSnapshot(): string {
  if (typeof document === "undefined") return "";
  return document.getElementById("page-root")?.innerHTML ?? "";
}

export interface DocumentSnapshot {
  lang: string;
  dir: string;
  /** The root element's classes: the layout puts its font variables there. */
  className: string;
  title: string;
  description: string;
  canonical: string;
  alternates: { hrefLang: string; href: string }[];
  stylesheets: string[];
  /** The layout's outer element, backdrop and page included; Next's own scripts left out. */
  body: string;
}

/** What search engines read from <head>, plus the visible page, for when the layout itself fails. */
export function documentSnapshot(): DocumentSnapshot {
  const empty = { lang: "en", dir: "ltr", className: "", title: "", description: "", canonical: "", alternates: [], stylesheets: [], body: "" };
  if (typeof document === "undefined") return empty;

  const head = document.head;
  const attribute = (selector: string, name: string) => head.querySelector(selector)?.getAttribute(name) ?? "";

  return {
    lang: document.documentElement.lang || location.pathname.split("/")[1] || "en",
    dir: document.documentElement.dir || "ltr",
    className: document.documentElement.className,
    title: document.title,
    description: attribute('meta[name="description"]', "content"),
    canonical: attribute('link[rel="canonical"]', "href"),
    alternates: Array.from(head.querySelectorAll('link[rel="alternate"][hreflang]'), (link) => ({
      hrefLang: link.getAttribute("hreflang") ?? "",
      href: link.getAttribute("href") ?? "",
    })),
    stylesheets: Array.from(head.querySelectorAll('link[rel="stylesheet"]'), (link) => link.getAttribute("href") ?? ""),
    body: document.body.querySelector(":scope > div")?.outerHTML ?? "",
  };
}

const reported = new Set<string>();

/**
 * Tells /api/client-error what broke, once per error and page load. The line lands in Vercel's
 * runtime logs, which the current plan keeps for an hour.
 *
 * A plain GET through fetch(), because the visitor this exists for is Google's renderer: it runs
 * fetch() and obeys robots.txt, which leaves this one address under /api/ open to it.
 */
export function reportClientError(error: Error & { digest?: string }, where: "page" | "root") {
  if (typeof window === "undefined") return;

  const key = `${where}:${error?.name}:${error?.message}`;
  if (reported.has(key)) return;
  reported.add(key);

  const query = new URLSearchParams({
    w: where,
    p: location.pathname,
    n: String(error?.name ?? "").slice(0, 80),
    m: String(error?.message ?? "").slice(0, 300),
    d: String(error?.digest ?? "").slice(0, 40),
  });
  fetch(`/api/client-error?${query}`, { cache: "no-store", keepalive: true }).catch(() => {});
}
