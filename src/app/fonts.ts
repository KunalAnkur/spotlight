import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * The body font, self-hosted by next/font: downloaded at build time, served from our own
 * origin and preloaded, so text needs no request to Google before it can paint.
 *
 * It used to arrive through an `@import` at the top of globals.css. That is the slowest way
 * to load a font — the browser cannot even discover the request until our own stylesheet
 * has downloaded, and nothing renders until both have. On a phone that was costing close
 * to a second of blank screen, and it is why the site failed Core Web Vitals on mobile.
 *
 * `subsets` only decides what is preloaded; the other ranges (latin-ext for Turkish) are
 * still declared and load on demand for the pages that use them.
 */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

/**
 * The heading font. Not in the next/font catalogue shipped with this Next version, so it
 * still comes from Google — but as a stylesheet that loads without blocking render (see
 * the <head> in the root layout) rather than through the same `@import`.
 */
export const PARKINSANS_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&display=swap";
