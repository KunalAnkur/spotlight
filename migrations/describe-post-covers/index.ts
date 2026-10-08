import {at, defineMigration, set} from 'sanity/migrate'

/**
 * Real descriptions for six post covers that still carried a placeholder ("testimage",
 * "ldr-img") or a copy of the title.
 *
 * Nobody saw those while the site used the post title as the cover's alt text. It now uses
 * what the editor wrote (BlogCard.tsx, blog/[slug]/page.tsx), so a placeholder would be read
 * out to screen-reader users and indexed with the image.
 *
 * Each cover is only rewritten while it still holds the exact text listed here, so a
 * description edited in the Studio is never overwritten and running this again does nothing.
 * Every one of these posts has "SEO Updated At" set, so the date search engines see is
 * not affected.
 *
 *   npx sanity migration run describe-post-covers              (dry run, changes nothing)
 *   npx sanity migration run describe-post-covers --no-dry-run
 */
const COVERS: Record<string, {from: string; to: string}> = {
  'watch-movies-together-online-free': {
    from: 'ldr-img',
    to: 'Illustration of a couple in two separate phone screens, sending hearts to each other',
  },
  'how-to-watch-netflix-together-long-distance': {
    from: 'How to watch Netflix together long distance in 2025',
    to: 'Three friends in three different living rooms laughing at the same show',
  },
  'best-apps-for-ldr-couples': {
    from: 'Best apps for LDR couples in 2025',
    to: 'A smiling couple using their phones side by side',
  },
  'how-to-host-a-youtube-watch-party': {
    from: 'youtube watch together ',
    to: 'A woman and a man in different places smiling at their screens, with the words “Together, anywhere.” across the picture',
  },
  'why-watching-together-is-important-in-long-distance-relationships': {
    from: 'testimage',
    to: 'A red heart-shaped pin stuck in a blue map',
  },
  'how-long-distance-couples-can-feel-close-even-when-miles-apart': {
    from: 'testimage',
    to: 'A hand next to a written definition of a long-distance relationship',
  },
}

export default defineMigration({
  title: 'Describe the six post covers that still hold placeholder alt text',
  documentTypes: ['post'],
  filter: `slug.current in ${JSON.stringify(Object.keys(COVERS))}`,
  migrate: {
    document(doc) {
      const cover = COVERS[(doc.slug as {current?: string} | undefined)?.current ?? '']
      const current = (doc.mainImage as {alt?: string} | undefined)?.alt

      return cover && current === cover.from ? at('mainImage.alt', set(cover.to)) : undefined
    },
  },
})
