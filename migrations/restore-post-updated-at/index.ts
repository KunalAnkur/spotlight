import {at, defineMigration, setIfMissing} from 'sanity/migrate'

/**
 * `set-post-language` touched every post, which moved Sanity's own `_updatedAt` to the day it
 * ran (2026-10-01). A post with no "SEO Updated At" falls back to `_updatedAt` for the date
 * search engines are shown, so these six started claiming they were modified that day.
 *
 * This pins each of them to the time it was really last changed, read from document history.
 * Only these ids, and only where the field is still empty, so it is safe to run again.
 *
 *   npx sanity migration run restore-post-updated-at              (dry run, changes nothing)
 *   npx sanity migration run restore-post-updated-at --no-dry-run
 */
const LAST_REAL_CHANGE: Record<string, string> = {
  'post-best-watch-party-sites': '2026-08-24T16:06:29Z',
  'post-how-to-watch-movies-together-online': '2026-08-24T16:06:29Z',
  'post-online-jigsaw-puzzle-with-friends': '2026-08-24T16:06:29Z',
  'post-play-connect-4-online-with-friends': '2026-08-24T16:06:29Z',
  'post-play-tic-tac-toe-online-with-friends': '2026-08-24T16:06:29Z',
  'post-watch-local-files-together-online': '2026-08-24T16:06:29Z',
}

export default defineMigration({
  title: 'Restore the real last-modified date on posts the language migration touched',
  documentTypes: ['post'],
  filter: '!defined(updatedAt)',
  migrate: {
    document(doc) {
      const lastRealChange = LAST_REAL_CHANGE[doc._id]
      return lastRealChange ? at('updatedAt', setIfMissing(lastRealChange)) : undefined
    },
  },
})
