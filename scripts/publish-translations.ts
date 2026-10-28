/**
 * Publish every translated post that is still a draft, all at once.
 *
 * The Studio publishes one document at a time. A whole language published that way spends a
 * while half-live: a Turkish blog with three posts on it, pages naming translations that are
 * not there yet. This does to each draft what the Publish button does, in one transaction, so
 * they appear together or not at all.
 *
 * Run it only once the language-aware code is live on both the site and the app: older code
 * lists a translated post in the English blog and among the app's English guides.
 *
 *   npx sanity exec scripts/publish-translations.ts --with-user-token              (shows the plan, changes nothing)
 *   npx sanity exec scripts/publish-translations.ts --with-user-token -- --write
 *
 * English drafts are never touched: an edit in progress is its author's to publish.
 */
import {getCliClient} from 'sanity/cli'

import {apiVersion} from '@/sanity/env'

import {planPublication, type DraftPost, type PublishedPost, type TranslationGroup} from './publish-plan'

// Drafts and published documents side by side, exactly as stored.
const client = getCliClient({apiVersion}).withConfig({perspective: 'raw', useCdn: false})
const write = process.argv.includes('--write')

const datasetQuery = `{
  "drafts": *[_type == "post" && _id in path("drafts.**")]{
    _id, title, "language": coalesce(language, "en"), "slug": slug.current
  },
  "published": *[_type == "post" && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && defined(slug.current)]{
    _id, "language": coalesce(language, "en"), "slug": slug.current, publishedAt
  },
  "groups": *[_type == "translation.metadata"]{
    _id, "versions": translations[]{"key": _key, "ref": value._ref}
  }
}`

async function main() {
  if (!client.config().token) {
    throw new Error('Run this with --with-user-token: drafts are only visible to a signed-in user.')
  }

  const dataset = await client.fetch<{drafts: DraftPost[]; published: PublishedPost[]; groups: TranslationGroup[]}>(
    datasetQuery,
  )
  const {publications, problems, untouched} = planPublication({...dataset, now: new Date()})

  if (untouched.length > 0) console.log(`Left alone (not a translation): ${untouched.join(', ')}\n`)

  if (problems.length > 0) {
    console.log(`Nothing can be published until these are fixed:\n  ${problems.join('\n  ')}`)
    process.exit(1)
  }

  if (publications.length === 0) {
    console.log('No drafted translation to publish.')
    return
  }

  for (const language of Array.from(new Set(publications.map((publication) => publication.language)))) {
    const posts = publications.filter((publication) => publication.language === language)

    console.log(`${language}  ${posts.length} posts, newest first`)
    for (const post of posts) {
      console.log(`  ${post.publishedAt}  /${language}/blog/${post.slug}   ← ${post.original}`)
    }
  }

  if (!write) {
    console.log(`\nDry run: nothing was published. Add --write to publish these ${publications.length} posts.`)
    return
  }

  // The date a reader and a search engine see is the day the post went live, not the day
  // its draft was typed. Set on the drafts first: if publishing then fails, nothing shows.
  const dates = client.transaction()
  for (const {draftId, publishedAt} of publications) {
    dates.patch(draftId, {set: {publishedAt, updatedAt: publishedAt}})
  }
  await dates.commit()

  const actions = publications.map(({draftId, publishedId}) => ({
    actionType: 'sanity.action.document.publish' as const,
    draftId,
    publishedId,
  }))

  // Asked first without doing it: a refusal here leaves every draft a draft.
  await client.action(actions, {dryRun: true})
  await client.action(actions)

  const ids = publications.map(({publishedId}) => publishedId)
  const after = await client.fetch<{live: number; drafts: number}>(
    `{"live": count(*[_id in $ids]), "drafts": count(*[_id in $draftIds])}`,
    {ids, draftIds: publications.map(({draftId}) => draftId)},
  )

  console.log(`\nPublished ${after.live} of ${publications.length} posts. Drafts left: ${after.drafts}.`)
  if (after.live !== publications.length || after.drafts !== 0) process.exit(1)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
