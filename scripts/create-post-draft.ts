/**
 * Creates a new English post as a draft from a JSON file, so an article can be written and
 * reviewed as text rather than typed block by block into the Studio.
 *
 *   npx sanity exec scripts/create-post-draft.ts --with-user-token -- post.json
 *   npx sanity exec scripts/create-post-draft.ts --with-user-token -- post.json --write
 *   npx sanity exec scripts/create-post-draft.ts --with-user-token -- post.json --update --write
 *
 * The first form only reads, and reports what it would create. `--write` creates it — as a
 * draft, so nothing reaches the site until somebody presses Publish in the Studio.
 *
 * `--update` replaces the text of a draft this script made earlier. It refuses once the post
 * has been published: from then on the Studio is where it is edited.
 *
 * No picture is attached. The post has to be given a main image in the Studio before it is
 * published — the article page and the blog cards both expect one.
 *
 * `post.json` is a `PostDraftInput` (below). `body` is a list of lines in a small subset of
 * Markdown, one block per line: `## ` and `### ` headings, `- ` bullets, `**bold**`, and
 * `[text](https://…)` links. Anything richer is added in the Studio afterwards.
 */
import {randomUUID} from 'node:crypto'
import {readFileSync} from 'node:fs'

import {getCliClient} from 'sanity/cli'

import {apiVersion} from '@/sanity/env'

interface PostDraftInput {
  slug: string
  title: string
  seoTitle: string
  seoDescription: string
  primaryKeyword: string
  relatedLandingPage: '/' | '/watch-together' | '/long-distance-date-night'
  excerpt: string
  featuredSnippetAnswer: string
  /** Slug of a published post whose author and categories this one should share. */
  like: string
  faq: {question: string; answer: string}[]
  body: string[]
}

/** The schema's own limits (postType.ts). Past these the Studio refuses to publish. */
const LIMITS = {
  excerpt: 220,
  seoTitle: 70,
  seoDescription: 180,
  primaryKeyword: 120,
  featuredSnippetAnswer: 320,
} as const

/** What the layout appends to every page title; search results show roughly 60 characters. */
const TITLE_SUFFIX = ' | Movmash'
const SEARCH_TITLE_LENGTH = 60
const SEARCH_DESCRIPTION_LENGTH = 160

const SITE = 'https://movmash.com'

const [file, ...flags] = process.argv.slice(2)

// `raw`, so that drafts count: a slug held by an unpublished post is still taken.
const client = getCliClient({apiVersion}).withConfig({perspective: 'raw'})

const key = () => randomUUID().replace(/-/g, '').slice(0, 12)

type Span = {_key: string; _type: 'span'; marks: string[]; text: string}
type MarkDef = {_key: string; _type: 'link'; href: string}

/** `**bold**` and `[text](href)` within one line, in the shape the Studio writes them. */
function inline(text: string): {children: Span[]; markDefs: MarkDef[]} {
  const children: Span[] = []
  const markDefs: MarkDef[] = []
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g
  let cursor = 0

  const push = (value: string, marks: string[] = []) => {
    if (value) children.push({_key: key(), _type: 'span', marks, text: value})
  }

  for (const match of Array.from(text.matchAll(pattern))) {
    push(text.slice(cursor, match.index))
    if (match[1] !== undefined) {
      push(match[1], ['strong'])
    } else {
      const def: MarkDef = {_key: key(), _type: 'link', href: match[3]}
      markDefs.push(def)
      push(match[2], [def._key])
    }
    cursor = (match.index ?? 0) + match[0].length
  }
  push(text.slice(cursor))

  return {children, markDefs}
}

function toBlocks(lines: string[]) {
  return lines.map((line) => {
    const heading = /^(#{2,3}) (.+)$/.exec(line)
    const bullet = /^- (.+)$/.exec(line)
    const text = heading?.[2] ?? bullet?.[1] ?? line

    return {
      _key: key(),
      _type: 'block',
      style: heading ? (heading[1].length === 2 ? 'h2' : 'h3') : 'normal',
      ...(bullet ? {listItem: 'bullet', level: 1} : {}),
      ...inline(text),
    }
  })
}

/** Links into our own blog have to point at something a reader can actually open. */
async function findBrokenInternalLinks(lines: string[], ownSlug: string): Promise<string[]> {
  const hrefs = new Set<string>()
  for (const line of lines) {
    for (const match of Array.from(line.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g))) hrefs.add(match[1])
  }

  const blogSlugs = Array.from(hrefs)
    .filter((href) => href.startsWith(`${SITE}/blog/`))
    .map((href) => href.slice(`${SITE}/blog/`.length).replace(/[/?#].*$/, ''))
    .filter((slug) => slug && slug !== ownSlug)

  if (blogSlugs.length === 0) return []

  const published = await client.fetch<string[]>(
    `*[_type == "post" && !(_id in path("drafts.**")) && coalesce(language, "en") == "en" && slug.current in $slugs].slug.current`,
    {slugs: blogSlugs},
  )
  return blogSlugs.filter((slug) => !published.includes(slug))
}

async function main() {
  if (!file) throw new Error('Which post? Pass the path of its .json file after "--".')
  if (!client.config().token) throw new Error('Run this with --with-user-token: it has to see drafts.')

  const input = JSON.parse(readFileSync(file, 'utf8')) as PostDraftInput
  const update = flags.includes('--update')

  for (const [field, limit] of Object.entries(LIMITS)) {
    const value = input[field as keyof typeof LIMITS]
    if (!value) throw new Error(`"${field}" is empty.`)
    if (value.length > limit) throw new Error(`"${field}" is ${value.length} characters; the limit is ${limit}.`)
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) throw new Error(`"${input.slug}" is not a usable slug.`)
  if (!input.body?.length) throw new Error('The post has no body.')
  if (input.faq.some((item) => !item.question?.trim() || !item.answer?.trim())) {
    throw new Error('Every FAQ entry needs both a question and an answer.')
  }

  const id = `post-${input.slug}`
  const draftId = `drafts.${id}`

  const taken = await client.fetch<{_id: string}[]>(
    `*[_type == "post" && slug.current == $slug && coalesce(language, "en") == "en"]{_id}`,
    {slug: input.slug},
  )
  const publishedAlready = taken.some((post) => !post._id.startsWith('drafts.'))
  const ourDraft = taken.some((post) => post._id === draftId)
  const someoneElses = taken.some((post) => post._id !== draftId && post._id !== id)

  if (publishedAlready) throw new Error(`"${input.slug}" is already published. Edit it in the Studio.`)
  if (someoneElses) throw new Error(`Another post already uses the slug "${input.slug}".`)
  if (ourDraft && !update) throw new Error(`A draft of "${input.slug}" exists. Pass --update to replace its text.`)
  if (!ourDraft && update) throw new Error(`There is no draft of "${input.slug}" to update.`)

  const like = await client.fetch<{author?: unknown; categories?: {_ref: string}[]} | null>(
    `*[_type == "post" && !(_id in path("drafts.**")) && slug.current == $slug && coalesce(language, "en") == "en"][0]{author, categories}`,
    {slug: input.like},
  )
  if (!like?.author) throw new Error(`No published post "${input.like}" to take the author and categories from.`)

  const broken = await findBrokenInternalLinks(input.body, input.slug)
  if (broken.length) throw new Error(`These blog links point at posts that are not published: ${broken.join(', ')}`)

  const draft = {
    _id: draftId,
    _type: 'post',
    language: 'en',
    title: input.title,
    slug: {_type: 'slug', current: input.slug},
    author: like.author,
    categories: (like.categories ?? []).map((category) => ({
      _key: key(),
      _type: 'reference',
      _ref: category._ref,
    })),
    publishedAt: new Date().toISOString(),
    excerpt: input.excerpt,
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    primaryKeyword: input.primaryKeyword,
    relatedLandingPage: input.relatedLandingPage,
    featuredSnippetAnswer: input.featuredSnippetAnswer,
    faq: input.faq.map((item) => ({_key: key(), _type: 'object', ...item})),
    body: toBlocks(input.body),
  }

  const words = input.body.join(' ').split(/\s+/).filter(Boolean).length
  const searchTitle = `${input.seoTitle}${TITLE_SUFFIX}`

  console.log(`${update ? 'Update' : 'New'} draft: ${draftId}`)
  console.log(`  URL once published: ${SITE}/blog/${input.slug}`)
  console.log(`  ${draft.body.length} blocks, about ${words} words, ${draft.faq.length} FAQ entries`)
  console.log(`  search title (${searchTitle.length}): ${searchTitle}`)
  console.log(`  search description (${input.seoDescription.length})`)
  if (searchTitle.length > SEARCH_TITLE_LENGTH) {
    console.log(`  note: the title is over ${SEARCH_TITLE_LENGTH} characters and will be cut short in results`)
  }
  if (input.seoDescription.length > SEARCH_DESCRIPTION_LENGTH) {
    console.log(`  note: the description is over ${SEARCH_DESCRIPTION_LENGTH} characters and will be cut short in results`)
  }
  console.log('  no main image: add one in the Studio before publishing')

  if (!flags.includes('--write')) {
    console.log(`\nDry run: nothing was written. Add --write to ${update ? 'replace' : 'create'} the draft.`)
    return
  }

  if (update) {
    // Keep whatever was added in the Studio that this file does not describe — the picture,
    // above all — and the date the draft was first given.
    const current = await client.getDocument(draftId)
    await client.createOrReplace({
      ...draft,
      ...(current?.mainImage ? {mainImage: current.mainImage} : {}),
      ...(current?.publishedAt ? {publishedAt: current.publishedAt} : {}),
    } as Parameters<typeof client.createOrReplace>[0])
    console.log(`\nReplaced ${draftId}. It is a draft: the site shows it once it is published.`)
    return
  }

  await client.create(draft as Parameters<typeof client.create>[0])
  console.log(`\nCreated ${draftId} as a draft. It is not on the site until it is published.`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
