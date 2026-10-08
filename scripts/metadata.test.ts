/**
 * What search engines are told about a page that exists in some languages and not others.
 *
 * A blog post is translated one language at a time, each version under its own slug, so these
 * are the cases the served site cannot show until such posts exist.
 *
 *   npx sanity exec scripts/metadata.test.ts
 */
import assert from 'node:assert/strict'

import {createPageMetadata, languageAlternates} from '@/lib/metadata'

import {runChecks} from './run-checks'

const site = 'https://movmash.com'
const page = {title: 'A post', description: 'About something.'}

/** One post, written in English and translated into Turkish under its own slug. */
const enAndTr = {en: '/blog/watch-movies-together', tr: '/blog/birlikte-film-izle'}
const enAndTrLinks = {
  en: `${site}/blog/watch-movies-together`,
  tr: `${site}/tr/blog/birlikte-film-izle`,
  'x-default': `${site}/blog/watch-movies-together`,
}

runChecks([
  [
    'the Turkish version of a post is its own page and names the English one',
    () => {
      const meta = createPageMetadata({...page, path: enAndTr.tr, locale: 'tr', languagePaths: enAndTr})

      assert.equal(meta.alternates?.canonical, `${site}/tr/blog/birlikte-film-izle`)
      assert.deepEqual(meta.alternates?.languages, enAndTrLinks)
      assert.equal((meta.robots as {index: boolean}).index, true)
      assert.equal((meta.openGraph as {locale: string}).locale, 'tr_TR')
      assert.deepEqual((meta.openGraph as {alternateLocale: string[]}).alternateLocale, ['en_US'])
    },
  ],
  [
    'the English version names the same set, so the pair confirms each other',
    () => {
      const meta = createPageMetadata({...page, path: enAndTr.en, locale: 'en', languagePaths: enAndTr})

      assert.equal(meta.alternates?.canonical, `${site}/blog/watch-movies-together`)
      assert.deepEqual(meta.alternates?.languages, enAndTrLinks)
    },
  ],
  [
    'a post that exists in one language gets no hreflang at all',
    () => {
      const meta = createPageMetadata({
        ...page,
        path: '/blog/only-english',
        locale: 'en',
        languagePaths: {en: '/blog/only-english'},
      })

      assert.equal(meta.alternates?.canonical, `${site}/blog/only-english`)
      assert.equal(meta.alternates?.languages, undefined)
    },
  ],
  [
    'a post with no English version has no x-default, since there is no fallback to name',
    () => {
      const paths = {tr: '/blog/dizi-gecesi', es: '/blog/noche-de-series'}
      const meta = createPageMetadata({...page, path: paths.tr, locale: 'tr', languagePaths: paths})

      assert.deepEqual(meta.alternates?.languages, {
        tr: `${site}/tr/blog/dizi-gecesi`,
        es: `${site}/es/blog/noche-de-series`,
      })
    },
  ],
  [
    'a language the page does not exist in defers to the English page and stays unindexed',
    () => {
      const meta = createPageMetadata({...page, path: '/blog', locale: 'es', languagePaths: {en: '/blog'}})

      assert.equal(meta.alternates?.canonical, `${site}/blog`)
      assert.equal(meta.alternates?.languages, undefined)
      assert.equal(meta.robots, undefined, 'the layout decides: noindex for a non-English locale')
      assert.equal((meta.openGraph as {locale: string}).locale, 'en_US')
    },
  ],
  [
    'a translated static page still lists all four languages under the same path',
    () => {
      const meta = createPageMetadata({...page, path: '/', locale: 'ar'})

      assert.equal(meta.alternates?.canonical, `${site}/ar`)
      assert.deepEqual(meta.alternates?.languages, {
        en: site,
        tr: `${site}/tr`,
        es: `${site}/es`,
        ar: `${site}/ar`,
        'x-default': site,
      })
    },
  ],
  [
    'an untranslated static page is English only, whatever language it is rendered in',
    () => {
      const meta = createPageMetadata({...page, path: '/legal', locale: 'tr'})

      assert.equal(meta.alternates?.canonical, `${site}/legal`)
      assert.equal(meta.alternates?.languages, undefined)
      assert.equal(meta.robots, undefined)
    },
  ],
  [
    'hreflang needs at least two languages to be worth stating',
    () => {
      assert.equal(languageAlternates({en: '/blog'}), undefined)
      assert.deepEqual(languageAlternates({en: '/blog', ar: '/blog'}), {
        en: `${site}/blog`,
        ar: `${site}/ar/blog`,
        'x-default': `${site}/blog`,
      })
    },
  ],
])
