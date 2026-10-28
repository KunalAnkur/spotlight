import {at, defineMigration, setIfMissing} from 'sanity/migrate'

/**
 * The home carousel's blog card, worded in each language its post is published in.
 *
 * The app already sends a reader to the post in their own language (costume's
 * lib/discover/feed.ts), but a card's words are typed per slide and fall back to English: a
 * Turkish reader saw an English headline and "Read more" on a card that opens a Turkish article.
 *
 * Keyed by the slide, not by its post: these are the card's own words, not the post's title.
 *
 * Only fills a box that is still empty, so it never overwrites one typed in the Studio and is
 * safe to run again. The next blog card is translated in the Studio, where its English is
 * written; add it here only if that was missed.
 *
 *   npx sanity migration run translate-read-slide              (dry run, changes nothing)
 *   npx sanity migration run translate-read-slide --no-dry-run
 */
const WORDS: Record<string, Record<string, Record<string, string>>> = {
  // "Virtual Date Ideas for Long-Distance Relationships That Actually Work" → ldr-date-night-ideas
  'a4b99797-d71e-481e-b68a-7d733ff423a6': {
    title: {
      tr: 'Uzak Mesafe İlişkisinde Gerçekten İşe Yarayan Sanal Buluşma Fikirleri',
      es: 'Ideas para citas virtuales a distancia que de verdad funcionan',
      ar: 'أفكار مواعيد افتراضية للعلاقات عن بعد تنجح فعلًا',
    },
    ctaLabel: {tr: 'Devamını oku', es: 'Leer más', ar: 'اقرأ المزيد'},
    meta: {tr: '2 dk', es: '2 min', ar: 'دقيقتان'},
  },
}

export default defineMigration({
  title: "Word the home carousel's blog card in every blog language",
  documentTypes: ['discoverSlide'],
  migrate: {
    document(doc) {
      const words = WORDS[doc._id.replace(/^drafts\./, '')]
      if (!words) return undefined

      return Object.entries(words).flatMap(([field, translations]) => [
        at(field, setIfMissing({_type: 'localeString'})),
        ...Object.entries(translations).map(([language, text]) =>
          at([field, language], setIfMissing(text)),
        ),
      ])
    },
  },
})
