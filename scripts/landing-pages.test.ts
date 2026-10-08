/**
 * The landing pages (watch together, date night, games) in every language.
 *
 * A translation supplies words for a page whose structure stays with the English original, so
 * two things can go wrong without anything looking broken: a list that is one item short, and
 * a sentence nobody translated. Both would only show up to a visitor reading that language.
 *
 *   npx sanity exec scripts/landing-pages.test.ts
 */
import assert from 'node:assert/strict'

import {getGamesPage} from '@/content/games-page'
import {getIntentLandingPage, type IntentLandingPageSlug} from '@/content/intent-landing-pages'
import * as ar from '@/content/landing-translations/ar'
import * as es from '@/content/landing-translations/es'
import * as tr from '@/content/landing-translations/tr'
import {locales, type Locale} from '@/i18n/config'

import {runChecks} from './run-checks'

const translated = locales.filter((locale) => locale !== 'en')
const intentSlugs: IntentLandingPageSlug[] = ['watch-together', 'long-distance-date-night']

/** Names that are the same in every language. */
const sameEverywhere = new Set([
  'YouTube', 'Vimeo', 'Twitch', 'Dailymotion', 'Netflix', 'Disney+', 'Prime Video', 'Max', 'Hulu', 'Crunchyroll',
])

/** Each page as plain data, in one language. Icons are components, not words, so they are left out. */
const pagesIn = (locale: Locale): Record<string, unknown> => ({
  ...Object.fromEntries(intentSlugs.map((slug) => [slug, getIntentLandingPage(slug, locale)])),
  games: getGamesPage(locale),
})

/** Every string in a value with the path that leads to it: "faqs.2.answer". */
function strings(value: unknown, path = ''): [path: string, text: string][] {
  if (typeof value === 'string') return [[path, value]]
  if (!value || typeof value !== 'object') return []

  return Object.entries(value).flatMap(([key, child]) =>
    key === 'icon' ? [] : strings(child, path ? `${path}.${key}` : key),
  )
}

/** Where a visitor is sent, not something they read. */
const isAddress = (path: string) => /(^|\.)(slug|href|ctaHref|secondaryCtaHref)$/.test(path)

runChecks([
  [
    'every language supplies the whole page: the same fields, and as many items in every list',
    () => {
      // Looked at as written, before a translation is laid over the English page: there a
      // list that is one item short is quietly completed in English, and an extra item dropped.
      const written: Record<string, typeof tr> = {tr, es, ar}
      const paths = (value: unknown) =>
        strings(value)
          .map(([path]) => path)
          .filter((path) => !isAddress(path) && !path.startsWith('labels.'))
          .sort()

      for (const locale of translated) {
        for (const slug of intentSlugs) {
          assert.deepEqual(
            paths(written[locale].intentPages[slug]),
            paths(getIntentLandingPage(slug, 'en')),
            `${locale} ${slug}`,
          )
        }
        assert.deepEqual(paths(written[locale].intentLabels), paths(getIntentLandingPage('watch-together', 'en').labels), `${locale} labels`)
        assert.deepEqual(paths(written[locale].gamesPage), paths(getGamesPage('en')), `${locale} games`)
      }
    },
  ],
  [
    'nothing a visitor reads is left in English',
    () => {
      const english = pagesIn('en')

      for (const locale of translated) {
        for (const [name, page] of Object.entries(pagesIn(locale))) {
          const original = new Map(strings(english[name]))
          const untranslated = strings(page)
            .filter(([path, text]) => !isAddress(path) && !sameEverywhere.has(text) && original.get(path) === text)
            .map(([path]) => path)

          assert.deepEqual(untranslated, [], `${locale} ${name}`)
        }
      }
    },
  ],
  [
    'an Arabic page is written in Arabic letters and Western digits',
    () => {
      for (const [name, page] of Object.entries(pagesIn('ar'))) {
        const offending = strings(page)
          .filter(([path, text]) => !isAddress(path) && !sameEverywhere.has(text))
          .filter(([, text]) => !/[ء-ي]/.test(text) || /[٠-٩]/.test(text))
          .map(([path]) => path)

        assert.deepEqual(offending, [], name)
      }
    },
  ],
  [
    'links inside a translated page stay in its language; the button into the app is left alone',
    () => {
      for (const locale of translated) {
        for (const slug of intentSlugs) {
          const page = getIntentLandingPage(slug, locale)

          assert.equal(page.ctaHref, getIntentLandingPage(slug, 'en').ctaHref)
          for (const href of [page.secondaryCtaHref, ...page.exploreLinks.map((link) => link.href)]) {
            assert.match(href, new RegExp(`^/${locale}(?:[/#]|$)`), `${locale} ${slug}`)
          }
        }
      }
    },
  ],
  [
    'a search result shows the whole title and description: 60 and 160 characters at most',
    () => {
      for (const locale of translated) {
        for (const [name, page] of Object.entries(pagesIn(locale))) {
          const {metadataTitle, metadataDescription} = page as {metadataTitle: string; metadataDescription: string}

          // The layout appends " | Movmash" to every title.
          assert.ok(metadataTitle.length + ' | Movmash'.length <= 60, `${locale} ${name} title: ${metadataTitle.length}`)
          assert.ok(metadataDescription.length <= 160, `${locale} ${name} description: ${metadataDescription.length}`)
        }
      }
    },
  ],
  [
    'a sentence that carries links names only links the page can fill in',
    () => {
      for (const locale of locales) {
        const {broader, broaderWithoutGuide, play, cardLabel} = getGamesPage(locale)
        const slots = (text: string) => Array.from(text.matchAll(/\{(\w+)\}/g), (match) => match[1]).sort()

        assert.deepEqual(slots(broader), ['guide', 'watch'], `${locale} broader`)
        assert.deepEqual(slots(broaderWithoutGuide), ['watch'], `${locale} broaderWithoutGuide`)
        assert.deepEqual(slots(play), ['name'], `${locale} play`)
        assert.deepEqual(slots(cardLabel), ['name'], `${locale} cardLabel`)
      }
    },
  ],
])
