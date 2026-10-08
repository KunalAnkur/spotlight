/**
 * Builds the documents for one translation of a post, without touching Sanity.
 *
 * It produces what the Studio's "Translations" button produces — a draft copy of the post in
 * the new language, and the entry that links the two — except the copy already holds the
 * translated text. `create-post-translation.ts` is the script that reads a post, calls this
 * and writes the result; keeping this half pure is what lets it be checked without a dataset.
 */
import {randomBytes} from 'node:crypto'

/** A picture in the body: the asset stays the original's, the words around it are translated. */
export interface TranslatedImage {
  alt?: string
  caption?: string
}

export interface TranslationInput {
  language: string
  title: string
  slug: string
  /** The cover is shared with the original; only its description is per language. */
  mainImageAlt?: string
  excerpt?: string
  seoTitle?: string
  seoDescription?: string
  primaryKeyword?: string
  featuredSnippetAnswer?: string
  /** Defaults to the original's. Point it elsewhere while that page is not translated. */
  relatedLandingPage?: string
  faq?: {question: string; answer: string}[]
  /**
   * One entry per block of the original, in the same order. Text is a string — prefixed
   * `## `, `### `, `#### `, `> ` or `- ` for anything but a paragraph, with `**bold**` and
   * `[links](https://…)` inside. A picture is an object.
   *
   * The order and kind of blocks must match the original. That is deliberate: a translation
   * that drops a heading or moves a screenshot is nearly always a slip, and this is where a
   * slip is cheap to catch.
   */
  body: (string | TranslatedImage)[]
}

type Doc = Record<string, any> & {_id: string; _type: string}

/** Not chosen here, so a dry run and the write that follows it can be given the same ones. */
export interface TranslationIds {
  translationId: string
  /** The post's existing `translation.metadata` document, or a fresh id when it has none. */
  metadataId: string
  /** ISO 8601. Becomes the translation's publish date and its "SEO Updated At". */
  now: string
}

/** Posts written before the blog had languages carry none and are read as English everywhere. */
const DEFAULT_LANGUAGE = 'en'

/** The lengths the Studio enforces, from `src/sanity/schemaTypes/postType.ts`. */
const LIMITS = {
  excerpt: 220,
  seoTitle: 70,
  seoDescription: 180,
  primaryKeyword: 120,
  featuredSnippetAnswer: 320,
} as const

/** Everything that is text in a language. None of it may be inherited from the original. */
const TRANSLATED_FIELDS = [...Object.keys(LIMITS), 'faq', 'body', 'title', 'slug', 'language'] as const

const PREFIXES: [prefix: string, kind: string][] = [
  ['#### ', 'h4'],
  ['### ', 'h3'],
  ['## ', 'h2'],
  ['> ', 'blockquote'],
  ['- ', 'bullet'],
]

/** The same shape of key the Studio generates for array items. */
const newKey = () => randomBytes(6).toString('hex')

export function buildTranslation(source: Doc, input: TranslationInput, ids: TranslationIds) {
  const sourceLanguage = source.language ?? DEFAULT_LANGUAGE
  if (input.language === sourceLanguage) {
    throw new Error(`The post is already in "${sourceLanguage}".`)
  }

  for (const [field, max] of Object.entries(LIMITS)) {
    const length = input[field as keyof typeof LIMITS]?.length ?? 0
    if (length > max) throw new Error(`${field} is ${length} characters; the Studio allows ${max}.`)
  }

  // What survives the copy: author, categories, the cover asset and anything else that is
  // not language. Sanity's own bookkeeping belongs to the original.
  const kept = Object.fromEntries(
    Object.entries(source).filter(
      ([field]) =>
        !['_rev', '_createdAt', '_updatedAt'].includes(field) &&
        !(TRANSLATED_FIELDS as readonly string[]).includes(field),
    ),
  )

  const optional = Object.fromEntries(
    Object.keys(LIMITS).flatMap((field) => {
      const value = input[field as keyof typeof LIMITS]?.trim()
      return value ? [[field, value]] : []
    }),
  )

  const draft: Doc = {
    ...kept,
    _id: `drafts.${ids.translationId}`,
    _type: source._type,
    language: input.language,
    title: input.title,
    slug: {_type: 'slug', current: input.slug},
    ...(source.mainImage ? {mainImage: describe(source.mainImage, {alt: input.mainImageAlt})} : {}),
    // A translation is published when it is published, not when its original was. Pinning
    // the editorial date keeps a later bulk patch from changing what search engines are told.
    publishedAt: ids.now,
    updatedAt: ids.now,
    ...optional,
    ...(input.relatedLandingPage ? {relatedLandingPage: input.relatedLandingPage} : {}),
    ...(input.faq?.length
      ? {faq: input.faq.map((item) => ({_key: newKey(), _type: 'object', ...item}))}
      : {}),
    body: translateBody(source.body ?? [], input.body),
  }

  // The shape `createReference` gives a translation in @sanity/document-internationalization:
  // weak, because the new post is still a draft, and marked for the Studio to firm up once
  // what it points at is published.
  const reference = (language: string, id: string) => ({
    _key: language,
    _type: 'internationalizedArrayReferenceValue',
    value: {_type: 'reference', _ref: id, _weak: true, _strengthenOnPublish: {type: source._type}},
  })

  return {
    draft,
    metadata: {
      _id: ids.metadataId,
      document: {
        _id: ids.metadataId,
        _type: 'translation.metadata',
        schemaTypes: [source._type],
        translations: [reference(sourceLanguage, source._id.replace(/^drafts\./, ''))],
      },
      translation: reference(input.language, ids.translationId),
    },
  }
}

/** A picture with the original's asset and crop, and words only if the translation has them. */
function describe(image: Record<string, any>, words: TranslatedImage) {
  const {alt: _alt, caption: _caption, ...asset} = image

  return {
    ...asset,
    ...(words.alt?.trim() ? {alt: words.alt.trim()} : {}),
    ...(words.caption?.trim() ? {caption: words.caption.trim()} : {}),
  }
}

function translateBody(original: Record<string, any>[], translated: TranslationInput['body']) {
  if (original.length !== translated.length) {
    throw new Error(`The original has ${original.length} blocks, the translation has ${translated.length}.`)
  }

  return original.map((block, index) => {
    const entry = translated[index]
    const place = `block ${index + 1}`

    const expected = block._type === 'block' ? (block.listItem ?? block.style ?? 'normal') : block._type
    const [kind, text] = typeof entry === 'string' ? kindOf(entry) : ['image', '']
    if (kind !== expected) {
      throw new Error(`${place}: the original is "${expected}", the translation is "${kind}".`)
    }

    if (typeof entry !== 'string') return describe(block, entry)

    return {...block, ...inline(text, place)}
  })
}

function kindOf(entry: string): [kind: string, text: string] {
  const match = PREFIXES.find(([prefix]) => entry.startsWith(prefix))

  return match ? [match[1], entry.slice(match[0].length)] : ['normal', entry]
}

/** `**bold**` and `[text](href)` into the spans and mark definitions Portable Text stores. */
function inline(text: string, place: string) {
  const children: Record<string, unknown>[] = []
  const markDefs: Record<string, unknown>[] = []

  // `split` with one capture group alternates: plain, bold, plain, bold…
  text.split(/\*\*(.+?)\*\*/).forEach((part, index) => {
    const decorators = index % 2 ? ['strong'] : []

    for (const piece of part.split(/(\[[^\]]+\]\([^)]+\))/)) {
      if (!piece) continue

      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(piece)
      if (!link) {
        if (piece.includes('**')) throw new Error(`${place}: unfinished ** in "${piece}".`)
        children.push({_key: newKey(), _type: 'span', marks: decorators, text: piece})
        continue
      }

      const [, label, href] = link
      // The editor's link field is a `url`: relative addresses do not pass its validation.
      if (!/^https?:\/\//.test(href)) throw new Error(`${place}: "${href}" is not a full web address.`)

      const key = newKey()
      markDefs.push({_key: key, _type: 'link', href})
      children.push({_key: newKey(), _type: 'span', marks: [...decorators, key], text: label})
    }
  })

  // A paragraph the author left empty is still a block, and a block needs a span to hold.
  if (children.length === 0) children.push({_key: newKey(), _type: 'span', marks: [], text: ''})

  return {children, markDefs}
}
