/**
 * Saves a reworked version of a published post as a draft, from a .json file: the site keeps
 * showing the published text until somebody presses Publish in the Studio.
 *
 *   npx sanity exec scripts/post-draft.ts --with-user-token -- post.json
 *   npx sanity exec scripts/post-draft.ts --with-user-token -- post.json --write
 *
 * The first form only reads, and reports what the draft would be. `--write` saves it.
 *
 *   npx sanity exec scripts/post-draft.ts --with-user-token -- --publish <post id> --write
 *
 * publishes that draft, with "SEO Updated At" set to now: the date the site gives Google as the
 * post's last change. Without --write it only says what it would publish.
 *
 * `post.json` is the whole post as it should read: the published document (what
 * `*[_id == "<id>"][0]` returns) with its text changed. An image whose asset is
 * `{"upload": "<file>"}` is uploaded on --write; the path is relative to the .json file.
 *
 * The address and the language cannot change here: a new slug would move the page, and the
 * language belongs to the post's translations (create-post-translation.ts handles those).
 */
import {createReadStream, existsSync, readFileSync} from 'node:fs'
import {basename, dirname, resolve} from 'node:path'

import {getCliClient} from 'sanity/cli'

import {pageUrl} from '@/lib/metadata'
import {apiVersion} from '@/sanity/env'

/** What the layout appends to every page title; search results show roughly 60 characters. */
const TITLE_SUFFIX = ' | Movmash'
const SEARCH_TITLE_LENGTH = 60
const SEARCH_DESCRIPTION_LENGTH = 160

const [file, ...flags] = process.argv.slice(2)

// `raw`, so that an existing draft of the post is seen.
const client = getCliClient({apiVersion}).withConfig({perspective: 'raw'})

type Doc = Record<string, any>

async function main() {
  if (!file) throw new Error('Which post? Pass the path of its .json file after "--".')
  if (!client.config().token) throw new Error('Run this with --with-user-token: it has to see drafts.')
  if (file === '--publish') return publish(flags[0])

  const post = JSON.parse(readFileSync(file, 'utf8')) as Doc
  const id: string = post._id ?? ''
  if (!id || id.startsWith('drafts.')) throw new Error('The file needs the published post\'s _id.')

  const [published, draft] = await Promise.all([
    client.fetch<Doc | null>(`*[_id == $id][0]`, {id}),
    client.fetch<Doc | null>(`*[_id == $id][0]{_id, _updatedAt}`, {id: `drafts.${id}`}),
  ])
  if (!published) throw new Error(`No published post has the id "${id}".`)
  if (published.slug?.current !== post.slug?.current) throw new Error('The slug changed; that would move the page.')
  if ((published.language ?? 'en') !== (post.language ?? 'en')) throw new Error('The language changed.')
  if (draft) {
    // Somebody may be editing it in the Studio; saving over it would lose that.
    throw new Error(`"${post.slug.current}" already has a draft (saved ${draft._updatedAt}). Publish or discard it first.`)
  }

  const uploads = collectUploads(post)
  const missing = uploads.filter((upload) => !existsSync(upload.path))
  if (missing.length) throw new Error(`Image not found: ${missing.map((upload) => upload.path).join(', ')}`)

  const images = (post.body as Doc[]).filter((block) => block._type === 'image')
  const withoutAlt = images.filter((image) => !image.alt?.trim())
  if (withoutAlt.length) throw new Error(`${withoutAlt.length} image(s) in the body have no alternative text.`)

  report(published, post, uploads.length)

  if (!flags.includes('--write')) {
    console.log('\nDry run: nothing was written. Add --write to upload the images and save the draft.')
    return
  }

  for (const upload of uploads) {
    const asset = await client.assets.upload('image', createReadStream(upload.path), {
      filename: basename(upload.path),
    })
    upload.target.asset = {_type: 'reference', _ref: asset._id}
    console.log(`Uploaded ${basename(upload.path)} → ${asset._id}`)
  }

  const {_rev, _createdAt, _updatedAt, ...fields} = post
  await client.create({...fields, _id: `drafts.${id}`} as Parameters<typeof client.create>[0])
  console.log(`\nSaved drafts.${id}. It is a draft: the site shows it once it is published.`)
}

/** What the Studio's Publish button does, plus the date: the draft replaces the post, then goes. */
async function publish(id: string | undefined) {
  if (!id || id.startsWith('drafts.')) throw new Error('Pass the published post\'s id after --publish.')
  const draft = await client.fetch<Doc | null>(`*[_id == $id][0]`, {id: `drafts.${id}`})
  if (!draft) throw new Error(`"${id}" has no draft to publish.`)

  const {_rev, _createdAt, _updatedAt, ...fields} = draft
  const post = {...fields, _id: id, updatedAt: new Date().toISOString()}
  console.log(`Post          ${post.title}  (${id})`)
  console.log(`Address       ${pageUrl(`/blog/${post.slug.current}`, post.language ?? 'en')}`)
  console.log(`Updated at    ${draft.updatedAt ?? '—'} → ${post.updatedAt}`)

  if (!flags.includes('--write')) {
    console.log('\nDry run: nothing was published. Add --write to publish.')
    return
  }
  await client
    .transaction()
    .createOrReplace(post as Parameters<typeof client.createOrReplace>[0])
    .delete(`drafts.${id}`)
    .commit()
  console.log(`\nPublished ${id}. The page shows it within a minute; the sitemap within an hour.`)
}

/** Every image in the post that still points at a local file, with the object to fix on upload. */
function collectUploads(post: Doc) {
  const base = dirname(resolve(file))
  const images = [post.mainImage, ...((post.body as Doc[]) ?? [])].filter(
    (block): block is Doc => typeof block?.asset?.upload === 'string',
  )
  return images.map((image) => ({target: image, path: resolve(base, image.asset.upload as string)}))
}

function report(published: Doc, post: Doc, uploads: number) {
  const searchTitle = `${post.seoTitle ?? post.title}${TITLE_SUFFIX}`
  const description = post.seoDescription ?? post.excerpt ?? ''
  const blocks = post.body as Doc[]
  const before = new Set((published.body as Doc[]).map((block) => block._key))
  const added = blocks.filter((block) => !before.has(block._key)).length
  const removed = (published.body as Doc[]).length - (blocks.length - added)
  const links = blocks.flatMap((block) => (block.markDefs ?? []).map((mark: {href: string}) => mark.href))
  const words = (doc: Doc) =>
    (doc.body as Doc[])
      .flatMap((block) => (block.children ?? []).map((span: {text: string}) => span.text))
      .join(' ')
      .split(/\s+/)
      .filter(Boolean).length

  const lines: [label: string, value: string][] = [
    ['Post', `${post.title}  (${post._id})`],
    ['Address', pageUrl(`/blog/${post.slug.current}`, post.language ?? 'en')],
    ['Search title', `${searchTitle}  (${searchTitle.length} characters${searchTitle.length > SEARCH_TITLE_LENGTH ? ' — may be cut off' : ''})`],
    ['Description', `${description}  (${description.length} characters${description.length > SEARCH_DESCRIPTION_LENGTH ? ' — may be cut off' : ''})`],
    ['Body', `${blocks.length} blocks (${added} new, ${removed} removed), ${words(published)} → ${words(post)} words`],
    ['Images', `${blocks.filter((block) => block._type === 'image').length} in the body, ${uploads} to upload`],
    ['Links', links.length ? links.join(', ') : '—'],
    ['Questions', `${published.faq?.length ?? 0} → ${post.faq?.length ?? 0}`],
  ]

  for (const [label, value] of lines) console.log(`${label.padEnd(13)} ${value}`)
}

main().catch((error) => {
  console.error(`\n${(error as Error).message}`)
  process.exit(1)
})
