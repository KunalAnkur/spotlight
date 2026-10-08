/**
 * What `create-post-translation` writes when a post is translated outside the Studio.
 *
 * The Studio's "Translations" button copies a post and links the copy to the original. The
 * script does the same with the translated text already in place, so these pin the two things
 * that must not drift from the button: the copy keeps the original's structure, cover, author
 * and categories, and the link has the exact shape the plugin writes.
 *
 *   npx sanity exec scripts/post-translation.test.ts
 */
import assert from 'node:assert/strict'

import {buildTranslation, type TranslationInput} from './post-translation'
import {runChecks} from './run-checks'

const cover = {_type: 'reference', _ref: 'image-abc-1200x800-png'}
const screenshot = {_type: 'reference', _ref: 'image-def-800x600-png'}

/** A published English post, as the API returns it. */
const english = {
  _id: 'post-watch-together',
  _type: 'post',
  _rev: 'rev-1',
  _createdAt: '2026-08-24T15:00:37Z',
  _updatedAt: '2026-10-01T20:47:13Z',
  language: 'en',
  title: 'How to Watch Together',
  slug: {_type: 'slug', current: 'how-to-watch-together'},
  author: {_type: 'reference', _ref: 'author-1'},
  categories: [{_key: 'c1', _type: 'reference', _ref: 'category-watch-party'}],
  mainImage: {_type: 'image', alt: 'A watch party room', asset: cover, hotspot: {x: 0.4, y: 0.5}},
  publishedAt: '2026-08-24T10:00:00.000Z',
  updatedAt: '2026-08-24T16:06:29Z',
  excerpt: 'An English excerpt.',
  seoTitle: 'An English search title',
  seoDescription: 'An English description.',
  primaryKeyword: 'watch together',
  featuredSnippetAnswer: 'An English answer.',
  relatedLandingPage: '/watch-together',
  faq: [{_key: 'f1', _type: 'object', question: 'An English question?', answer: 'An answer.'}],
  body: [
    {_key: 'b1', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's1', _type: 'span', marks: [], text: 'An intro.'}]},
    {_key: 'b2', _type: 'block', style: 'h2', markDefs: [], children: [{_key: 's2', _type: 'span', marks: [], text: 'A heading'}]},
    {_key: 'b3', _type: 'block', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [{_key: 's3', _type: 'span', marks: [], text: 'A point'}]},
    {_key: 'b4', _type: 'image', alt: 'A screenshot', caption: 'Step one', asset: screenshot},
  ],
}

const turkish: TranslationInput = {
  language: 'tr',
  title: 'Birlikte Nasıl İzlenir',
  slug: 'birlikte-nasil-izlenir',
  mainImageAlt: 'Bir izleme partisi odası',
  body: ['Bir giriş.', '## Bir başlık', '- Bir madde', {alt: 'Bir ekran görüntüsü', caption: 'Birinci adım'}],
}

const ids = {translationId: 'new-doc', metadataId: 'new-meta', now: '2026-10-04T09:00:00.000Z'}

const build = (input: Partial<TranslationInput> = {}, source: object = english) =>
  buildTranslation(source as Parameters<typeof buildTranslation>[0], {...turkish, ...input}, ids)

/** The text of one block, with its bold and its links written back as markdown. */
const blockAt = (index: number, input?: Partial<TranslationInput>) =>
  (build(input).draft.body as Record<string, any>[])[index]

runChecks([
  [
    'the translation is a new unpublished post in its own language',
    () => {
      const {draft} = build()

      assert.equal(draft._id, 'drafts.new-doc')
      assert.equal(draft._type, 'post')
      assert.equal(draft.language, 'tr')
      assert.equal(draft.title, 'Birlikte Nasıl İzlenir')
      assert.deepEqual(draft.slug, {_type: 'slug', current: 'birlikte-nasil-izlenir'})
      // Sanity's own bookkeeping belongs to the original, not to the copy.
      for (const field of ['_rev', '_createdAt', '_updatedAt']) assert.equal(field in draft, false, field)
    },
  ],
  [
    'it keeps the original author, categories and cover, with the cover described in its own language',
    () => {
      const {draft} = build()

      assert.deepEqual(draft.author, english.author)
      assert.deepEqual(draft.categories, english.categories)
      assert.deepEqual(draft.mainImage, {...english.mainImage, alt: 'Bir izleme partisi odası'})
    },
  ],
  [
    'the body keeps the structure of the original: same headings, lists and pictures in the same places',
    () => {
      const body = build().draft.body as Record<string, any>[]

      assert.deepEqual(
        body.map((block) => [block._key, block._type, block.style, block.listItem, block.level]),
        english.body.map((block: Record<string, any>) => [block._key, block._type, block.style, block.listItem, block.level]),
      )
      assert.deepEqual(body.slice(0, 3).map((block) => block.children[0].text), ['Bir giriş.', 'Bir başlık', 'Bir madde'])
      assert.deepEqual(body[3], {...english.body[3], alt: 'Bir ekran görüntüsü', caption: 'Birinci adım'})
    },
  ],
  [
    'bold text and links survive, and a link is stored the way the editor stores it',
    () => {
      const block = blockAt(0, {
        body: ['**Önemli:** oda [Movmash](https://movmash.com/tr) üzerinde açılır.', ...turkish.body.slice(1)],
      })
      const [link] = block.markDefs

      assert.deepEqual(
        block.children.map((span: Record<string, any>) => [span._type, span.text, span.marks]),
        [
          ['span', 'Önemli:', ['strong']],
          ['span', ' oda ', []],
          ['span', 'Movmash', [link._key]],
          ['span', ' üzerinde açılır.', []],
        ],
      )
      assert.deepEqual(link, {_key: link._key, _type: 'link', href: 'https://movmash.com/tr'})
      assert.equal(new Set(block.children.map((span: Record<string, any>) => span._key)).size, 4, 'span keys repeat')
    },
  ],
  [
    'an empty paragraph stays an empty paragraph, with the one empty span the editor expects',
    () => {
      const block = blockAt(0, {body: ['', ...turkish.body.slice(1)]})

      assert.deepEqual(
        block.children.map((span: Record<string, any>) => [span._type, span.text, span.marks]),
        [['span', '', []]],
      )
    },
  ],
  [
    'a block of the wrong kind is refused, naming where',
    () => {
      // A paragraph where the original has its heading.
      assert.throws(() => build({body: ['Bir giriş.', 'Bir başlık', '- Bir madde', {alt: 'x'}]}), /block 2.*h2.*normal/)
      assert.throws(() => build({body: ['Bir giriş.', '## Bir başlık', '- Bir madde', 'Resim yerine yazı']}), /block 4.*image/)
    },
  ],
  [
    'a body with a block missing is refused',
    () => {
      assert.throws(() => build({body: turkish.body.slice(0, 3)}), /4 blocks.*3/)
    },
  ],
  [
    'no English text is left behind in a field the translation did not fill',
    () => {
      const {draft} = build()

      for (const field of ['excerpt', 'seoTitle', 'seoDescription', 'primaryKeyword', 'featuredSnippetAnswer', 'faq']) {
        assert.equal(field in draft, false, `${field} still holds the English text`)
      }
    },
  ],
  [
    'the fields it did fill are written, and questions get the keys the Studio needs',
    () => {
      const {draft} = build({
        excerpt: 'Bir özet.',
        seoTitle: 'Bir arama başlığı',
        seoDescription: 'Bir açıklama.',
        primaryKeyword: 'birlikte izleme',
        featuredSnippetAnswer: 'Kısa bir cevap.',
        relatedLandingPage: '/',
        faq: [{question: 'Bir soru?', answer: 'Bir cevap.'}],
      })
      const [question] = draft.faq as Record<string, any>[]

      assert.equal(draft.excerpt, 'Bir özet.')
      assert.equal(draft.seoTitle, 'Bir arama başlığı')
      assert.equal(draft.seoDescription, 'Bir açıklama.')
      assert.equal(draft.primaryKeyword, 'birlikte izleme')
      assert.equal(draft.featuredSnippetAnswer, 'Kısa bir cevap.')
      assert.equal(draft.relatedLandingPage, '/')
      assert.deepEqual(question, {_key: question._key, _type: 'object', question: 'Bir soru?', answer: 'Bir cevap.'})
      assert.match(question._key, /^[0-9a-f]{12}$/)
    },
  ],
  [
    'the related landing page is the original one unless the translation names another',
    () => {
      assert.equal(build().draft.relatedLandingPage, '/watch-together')
    },
  ],
  [
    'its dates are its own, and the date search engines see is pinned from the start',
    () => {
      const {draft} = build()

      assert.equal(draft.publishedAt, ids.now)
      assert.equal(draft.updatedAt, ids.now)
    },
  ],
  [
    'the two versions are linked exactly the way the Studio button links them',
    () => {
      const reference = (language: string, id: string) => ({
        _key: language,
        _type: 'internationalizedArrayReferenceValue',
        value: {_type: 'reference', _ref: id, _weak: true, _strengthenOnPublish: {type: 'post'}},
      })
      const {metadata} = build()

      assert.deepEqual(metadata, {
        _id: 'new-meta',
        // Only used when the post has no translations yet.
        document: {
          _id: 'new-meta',
          _type: 'translation.metadata',
          schemaTypes: ['post'],
          translations: [reference('en', 'post-watch-together')],
        },
        // Added to the list either way.
        translation: reference('tr', 'new-doc'),
      })
    },
  ],
  [
    'a post without a language counts as English, as it does on the site',
    () => {
      const {language: _language, ...unmarked} = english

      assert.equal(build({}, unmarked).metadata.document.translations[0]._key, 'en')
    },
  ],
  [
    'a link that is not a full web address is refused, because the Studio would refuse it too',
    () => {
      assert.throws(() => build({body: ['[Ana sayfa](/tr)', ...turkish.body.slice(1)]}), /block 1.*\/tr/)
    },
  ],
  [
    'unfinished bold is refused rather than published as asterisks',
    () => {
      assert.throws(() => build({body: ['**Önemli: yarım kalmış', ...turkish.body.slice(1)]}), /block 1.*\*\*/)
    },
  ],
  [
    'text longer than the Studio allows is refused',
    () => {
      assert.throws(() => build({seoTitle: 'x'.repeat(71)}), /seoTitle.*70/)
      assert.throws(() => build({seoDescription: 'x'.repeat(181)}), /seoDescription.*180/)
      assert.throws(() => build({excerpt: 'x'.repeat(221)}), /excerpt.*220/)
      assert.throws(() => build({featuredSnippetAnswer: 'x'.repeat(321)}), /featuredSnippetAnswer.*320/)
    },
  ],
  [
    'translating into the language the post is already in is refused',
    () => {
      assert.throws(() => build({language: 'en'}), /already.*en/)
    },
  ],
])
