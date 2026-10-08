/**
 * Creates one translation of a post as a draft, linked to its original — what the Studio's
 * "Translations" button does, with the translated text already in place.
 *
 *   npx sanity exec scripts/create-post-translation.ts --with-user-token -- translation.json
 *   npx sanity exec scripts/create-post-translation.ts --with-user-token -- translation.json --write
 *   npx sanity exec scripts/create-post-translation.ts --with-user-token -- translation.json --update --write
 *
 * The first form only reads, and reports what it would create. `--write` creates it — as a
 * draft, so nothing reaches the site until somebody presses Publish in the Studio. Deploy the
 * site and the app before that (MOVMASH.md §2.11, "Publishing order").
 *
 * `--update` is for a translation that already exists: its text is replaced from the file, as
 * a draft again, and its link to the original is left alone. Edits made to it in the Studio
 * since are overwritten, so the file is the thing to edit.
 *
 * `translation.json` is a `TranslationInput` (see post-translation.ts) plus `source`, the slug
 * of the post being translated, and optionally `sourceLanguage` when that is not English.
 */
import {randomUUID} from 'node:crypto'
import {readFileSync} from 'node:fs'

import {getCliClient} from 'sanity/cli'

import {defaultLocale, isLocale} from '@/i18n/config'
import {pageUrl} from '@/lib/metadata'
import {apiVersion} from '@/sanity/env'

import {buildTranslation, type TranslationInput} from './post-translation'

/** What the layout appends to every page title; search results show roughly 60 characters. */
const TITLE_SUFFIX = ' | Movmash'
const SEARCH_TITLE_LENGTH = 60
const SEARCH_DESCRIPTION_LENGTH = 160

const [file, ...flags] = process.argv.slice(2)

// `raw`, so that drafts count: a slug held by an unpublished post is still taken.
const client = getCliClient({apiVersion}).withConfig({perspective: 'raw'})

async function main() {
  if (!file) throw new Error('Which translation? Pass the path of its .json file after "--".')
  if (!client.config().token) throw new Error('Run this with --with-user-token: it has to see drafts.')

  const {source: sourceSlug, sourceLanguage = defaultLocale, ...input} = JSON.parse(
    readFileSync(file, 'utf8'),
  ) as TranslationInput & {source: string; sourceLanguage?: string}

  if (!isLocale(input.language)) throw new Error(`"${input.language}" is not a language of the site.`)

  const originals = await client.fetch<Record<string, any>[]>(
    `*[_type == "post" && slug.current == $slug && coalesce(language, "en") == $language]`,
    {slug: sourceSlug, language: sourceLanguage},
  )
  const source = originals.find((post) => !post._id.startsWith('drafts.'))
  if (!source) throw new Error(`No published "${sourceLanguage}" post has the slug "${sourceSlug}".`)
  if (originals.some((post) => post._id === `drafts.${source._id}`)) {
    // The site shows the published version, and that is what readers will compare against.
    throw new Error(`"${sourceSlug}" has unpublished changes. Publish or discard them first.`)
  }

  const existing = await client.fetch<{_id: string; versions: {language: string; id: string}[]} | null>(
    `*[_type == "translation.metadata" && references($id)][0]{
      _id,
      "versions": translations[]{"language": _key, "id": value._ref}
    }`,
    {id: source._id},
  )
  const current = existing?.versions.find((version) => version.language === input.language)
  const update = flags.includes('--update')

  if (current && !update) {
    throw new Error(`"${sourceSlug}" already has a "${input.language}" translation. Pass --update to replace its text.`)
  }
  if (!current && update) {
    throw new Error(`"${sourceSlug}" has no "${input.language}" translation to update.`)
  }

  const slugTaken = await client.fetch<boolean>(
    `defined(*[
      _type == "post" && slug.current == $slug && coalesce(language, "en") == $language &&
      !(_id in [$self, "drafts." + $self])
    ][0]._id)`,
    {slug: input.slug, language: input.language, self: current?.id ?? ''},
  )
  if (slugTaken) throw new Error(`Another "${input.language}" post already uses the slug "${input.slug}".`)

  const {draft, metadata} = buildTranslation(source as Parameters<typeof buildTranslation>[0], input, {
    translationId: current?.id ?? randomUUID(),
    metadataId: existing?._id ?? randomUUID(),
    now: new Date().toISOString(),
  })

  if (current) {
    // A translation that is already on the site keeps the day it was published; only its
    // "SEO Updated At" moves, because its text has.
    const published = await client.fetch<{publishedAt?: string} | null>(`*[_id == $id][0]{publishedAt}`, {
      id: current.id,
    })
    if (published?.publishedAt) draft.publishedAt = published.publishedAt
  }

  report(
    source,
    draft,
    current ? `unchanged, ${existing!._id}` : existing ? `added to ${existing._id}` : `new, ${metadata._id}`,
  )

  if (!flags.includes('--write')) {
    console.log(`\nDry run: nothing was written. Add --write to ${current ? 'replace' : 'create'} the draft.`)
    return
  }

  if (current) {
    await client.createOrReplace(draft as Parameters<typeof client.createOrReplace>[0])
    console.log(`\nReplaced ${draft._id}. It is a draft: the site shows it once it is published.`)
    return
  }

  // One transaction, the same three steps the Studio button takes: the copy, the metadata
  // document if the post had no translations yet, and the new entry in its list.
  await client
    .transaction()
    .create(draft)
    .createIfNotExists(metadata.document)
    .patch(metadata._id, (patch) =>
      patch
        .setIfMissing({translations: metadata.document.translations})
        .insert('after', 'translations[-1]', [metadata.translation]),
    )
    .commit()

  console.log(`\nCreated ${draft._id} as a draft. It is not on the site until it is published.`)
}

function report(source: Record<string, any>, draft: Record<string, any>, link: string) {
  const searchTitle = `${draft.seoTitle ?? draft.title}${TITLE_SUFFIX}`
  const description = draft.seoDescription ?? draft.excerpt ?? ''
  const blocks = draft.body as Record<string, any>[]
  const links = blocks.flatMap((block) => (block.markDefs ?? []).map((mark: {href: string}) => mark.href))
  const words = blocks
    .flatMap((block) => (block.children ?? []).map((span: {text: string}) => span.text))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length

  const lines: [label: string, value: string][] = [
    ['Original', `${source.title}  (${source._id})`],
    ['Translation', `${draft.language}  ${draft._id}`],
    ['Title', draft.title],
    ['Address', pageUrl(`/blog/${draft.slug.current}`, draft.language)],
    ['Search title', `${searchTitle}  (${searchTitle.length} characters${searchTitle.length > SEARCH_TITLE_LENGTH ? ' — may be cut off' : ''})`],
    ['Description', `${description}  (${description.length} characters${description.length > SEARCH_DESCRIPTION_LENGTH ? ' — may be cut off' : ''})`],
    ['Keyword', draft.primaryKeyword ?? '—'],
    ['Cover', `${draft.mainImage?.asset?._ref ?? '—'}  alt: ${draft.mainImage?.alt ?? '—'}`],
    ['Body', `${blocks.length} blocks, ${words} words`],
    ['Links', links.length ? links.join(', ') : '—'],
    ['Questions', String(draft.faq?.length ?? 0)],
    ['Related page', draft.relatedLandingPage ?? '—'],
    ['Linked by', `translation.metadata (${link})`],
  ]

  for (const [label, value] of lines) console.log(`${label.padEnd(13)} ${value}`)
}

main().catch((error) => {
  console.error(`\n${(error as Error).message}`)
  process.exit(1)
})
