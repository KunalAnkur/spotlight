/**
 * Fetch options for data that is read once, when the site is built, and never again until
 * the next deploy.
 *
 * Every page on this site used to re-render on a timer (blog posts and every page linking to
 * a guide every 60s, the shop every 30 min, plans hourly). Each re-render is a Vercel Function
 * run, and together they used up most of the team's Fluid Active CPU. Nothing here changes
 * often enough to justify that, so pages are now fully static: content edited in Sanity, a
 * price change in guardian or a new product shows up on the next deploy.
 *
 * Only `cache` is set: Next warns when a fetch names both it and `next.revalidate`.
 *
 * A fetch's own `next.revalidate` overrides the page's `revalidate = false` (the lowest value
 * wins), so a single fetch with a timer quietly turns its whole page back into ISR. Use this
 * for every server-side fetch instead of writing cache options by hand.
 */
export const BUILD_ONLY = { cache: "force-cache" } as const;
