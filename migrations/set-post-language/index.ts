import {at, defineMigration, setIfMissing} from 'sanity/migrate'

/**
 * Posts written before the blog had languages carry no `language`. Every one of them is
 * English, and the translations plugin needs a language on a post before it can link a
 * translation to it.
 *
 * Safe to run again: it only fills the field where it is missing.
 *
 * Ran against production on 2026-10-01 before the `updatedAt` line below existed, which is why
 * `restore-post-updated-at` had to follow it.
 *
 *   npx sanity migration run set-post-language              (dry run, changes nothing)
 *   npx sanity migration run set-post-language --no-dry-run
 */
export default defineMigration({
  title: 'Mark posts that have no language as English',
  documentTypes: ['post'],
  filter: '!defined(language)',
  migrate: {
    document(doc) {
      return [
        at('language', setIfMissing('en')),
        // Any patch moves `_updatedAt`, and a post with no "SEO Updated At" shows `_updatedAt`
        // to search engines as its modified date. Pin the date it has now, so that marking the
        // language does not make an untouched post look freshly edited.
        at('updatedAt', setIfMissing(doc._updatedAt)),
      ]
    },
  },
})
