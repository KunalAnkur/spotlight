import {at, defineMigration, setIfMissing} from 'sanity/migrate'

/**
 * The blog's categories, named in each language the blog is written in.
 *
 * A category is one document for every language; only its name is translated, in
 * `titleTranslations` (see categoryType.ts). Until that is filled a translated post shows its
 * category in English — on the post, on its card, and in the keywords search engines read.
 *
 * Lower case, like the English titles: the post page capitalises them itself. The names are
 * the words people search with ("ver juntos", "المشاهدة الجماعية"), not word-for-word
 * translations of "watch party".
 *
 * Only fills a name that is still empty, so it never overwrites one typed in the Studio and
 * is safe to run again. Add a language here when its first post is written.
 *
 *   npx sanity migration run translate-category-titles              (dry run, changes nothing)
 *   npx sanity migration run translate-category-titles --no-dry-run
 */
const TITLES: Record<string, Record<string, string>> = {
  'watch-party': {tr: 'izleme partisi', es: 'ver juntos', ar: 'المشاهدة الجماعية'},
  'long-distance-relationship': {
    tr: 'uzak mesafe ilişkisi',
    es: 'relación a distancia',
    ar: 'العلاقة عن بعد',
  },
  'play-together': {tr: 'birlikte oyun', es: 'jugar juntos', ar: 'اللعب معًا'},
}

export default defineMigration({
  title: 'Name the blog categories in every blog language',
  documentTypes: ['category'],
  migrate: {
    document(doc) {
      const titles = TITLES[(doc.slug as {current?: string} | undefined)?.current ?? '']
      if (!titles) return undefined

      return [
        at('titleTranslations', setIfMissing({})),
        ...Object.entries(titles).map(([language, title]) =>
          at(['titleTranslations', language], setIfMissing(title)),
        ),
      ]
    },
  },
})
