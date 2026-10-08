/**
 * What the site will be told about translated posts — including the ones still in draft.
 *
 * A translation is tied to its original by a `translation.metadata` document, and the post
 * page, the blog index, the sitemap and hreflang all read that tie through the queries in
 * src/sanity/lib/queries.ts. This asks those same queries the way they will answer once every
 * draft is published, so a translation can be checked before it goes live instead of after.
 *
 *   npx sanity exec scripts/translations.test.ts --with-user-token
 */
import assert from 'node:assert/strict'

import {getCliClient} from 'sanity/cli'

import {getIntentLandingPage} from '@/content/intent-landing-pages'
import {isLocale, type Locale} from '@/i18n/config'
import {postLanguagePaths} from '@/lib/blog'
import {createPageMetadata, pageUrl} from '@/lib/metadata'
import {apiVersion} from '@/sanity/env'
import {blogLanguagesQuery, guideVersionsQuery, postQuery, postSlugsQuery, postsQuery} from '@/sanity/lib/queries'

import {runChecks} from './run-checks'

// Drafts laid over what is published: the dataset as it will be after the next Publish.
const client = getCliClient({apiVersion}).withConfig({perspective: 'drafts'})

interface Version {
  /** The language the link files this post under. */
  key: string
  _id: string | null
  language: string | null
  slug: string | null
}

interface Group {
  _id: string
  schemaTypes: string[] | null
  versions: Version[]
}

const groupsQuery = `*[_type == "translation.metadata"]{
  _id,
  schemaTypes,
  "versions": translations[]{
    "key": _key,
    "_id": value->_id,
    "language": value->language,
    "slug": value->slug.current
  }
}`

/** Where every language of a group lives, the way `postLanguagePaths` should report it. */
const pathsOf = (group: Group) =>
  Object.fromEntries(group.versions.map((version) => [version.key, `/blog/${version.slug}`]))

async function main() {
  if (!client.config().token) {
    throw new Error('Run this with --with-user-token: drafts are only visible to a signed-in user.')
  }

  const groups = await client.fetch<Group[]>(groupsQuery)
  const versions = groups.flatMap((group) => group.versions.map((version) => ({group, version})))

  /** The post exactly as its page will fetch it. */
  const pageOf = ({slug, key}: Version) => client.fetch(postQuery, {slug, language: key})

  await runChecks([
    [
      'there is a translated post to check',
      () => {
        assert.ok(groups.length > 0, 'No post has a translation yet, so nothing below was exercised.')
      },
    ],
    [
      'every link leads to a post, filed under the language that post is written in',
      () => {
        for (const {group, version} of versions) {
          assert.ok(version._id, `${group._id}: the "${version.key}" link leads nowhere`)
          assert.equal(version.language, version.key, `${version._id} is filed under "${version.key}"`)
          assert.ok(isLocale(version.key), `"${version.key}" is not a language of the site`)
          assert.ok(version.slug, `${version._id} has no slug`)
        }
      },
    ],
    [
      'a group holds each language once, and a post belongs to one group',
      () => {
        for (const group of groups) {
          const keys = group.versions.map((version) => version.key)
          assert.equal(new Set(keys).size, keys.length, `${group._id} lists a language twice: ${keys}`)
          assert.deepEqual(group.schemaTypes, ['post'], `${group._id} is not marked as a post group`)
        }

        const ids = versions.map(({version}) => version._id)
        assert.equal(new Set(ids).size, ids.length, 'a post is linked from two groups')
      },
    ],
    [
      'a slug is used once per language, drafts included',
      async () => {
        const posts = await client.fetch<{slug: string; language: string}[]>(postSlugsQuery)
        const addresses = posts.map((post) => `${post.language}/${post.slug}`)

        const repeated = addresses.filter((address, index) => addresses.indexOf(address) !== index)
        assert.deepEqual(repeated, [])
      },
    ],
    [
      'each version is found at its own address and names every other version',
      async () => {
        for (const {group, version} of versions) {
          const post = await pageOf(version)

          assert.ok(post, `nothing answers at ${version.key}/${version.slug}`)
          assert.equal(post._id, version._id)
          assert.deepEqual(postLanguagePaths({...post, slug: version.slug!}), pathsOf(group))
        }
      },
    ],
    [
      'search engines are told about every version: own address, each language, English as the default',
      async () => {
        for (const {group, version} of versions) {
          const post = await pageOf(version)
          const locale = version.key as Locale
          const paths = pathsOf(group)

          const meta = createPageMetadata({
            title: post.seoTitle ?? post.title,
            description: post.seoDescription ?? post.excerpt,
            path: `/blog/${version.slug}`,
            locale,
            languagePaths: postLanguagePaths({...post, slug: version.slug!}),
          })

          assert.equal(meta.alternates?.canonical, pageUrl(paths[locale], locale))
          assert.deepEqual(meta.alternates?.languages, {
            ...Object.fromEntries(
              Object.entries(paths).map(([language, path]) => [language, pageUrl(path, language as Locale)]),
            ),
            ...(paths.en ? {'x-default': pageUrl(paths.en, 'en')} : {}),
          })
          assert.equal((meta.robots as {index: boolean}).index, true, `${version._id} would be hidden from search`)
        }
      },
    ],
    [
      'each version has what its page and its search result are built from',
      async () => {
        for (const {version} of versions) {
          const post = await pageOf(version)
          const where = `${version.key}/${version.slug}`

          for (const field of ['title', 'publishedAt', 'updatedAt', 'excerpt', 'seoTitle', 'seoDescription']) {
            assert.ok(post[field], `${where} has no ${field}`)
          }
          assert.ok(post.body?.length > 0, `${where} has no body`)
          assert.ok(post.mainImage?.asset?._ref, `${where} has no cover`)
          assert.ok(post.mainImage?.alt, `${where}: the cover has no description`)
          assert.ok(post.author?.name, `${where} has no author`)
          assert.ok(post.categories?.length > 0, `${where} has no category`)
        }
      },
    ],
    [
      'links inside a version stay in its language and lead to posts that exist',
      async () => {
        const posts = await client.fetch<{slug: string; language: string}[]>(postSlugsQuery)
        const addresses = new Set(posts.map((post) => pageUrl(`/blog/${post.slug}`, post.language as Locale)))

        for (const {version} of versions) {
          const locale = version.key as Locale
          const post = await pageOf(version)
          const links: string[] = (post.body ?? []).flatMap((block: {markDefs?: {href?: string}[]}) =>
            (block.markDefs ?? []).map((mark) => mark.href ?? ''),
          )

          for (const href of links.filter((link) => link.startsWith(pageUrl('/', 'en')))) {
            const where = `${version.key}/${version.slug} links to ${href}`

            // A site link belongs to the language of the post it is in…
            assert.ok(
              href === pageUrl('/', locale) || href.startsWith(`${pageUrl('/', locale)}/`),
              `${where}, which is outside its language`,
            )
            if (locale !== 'en') {
              assert.ok(!/^https:\/\/[^/]+\/blog\//.test(href), `${where}, an English post`)
            }
            // …and a link to a post has to find one.
            if (/\/blog\/./.test(href)) assert.ok(addresses.has(href), `${where}, which does not exist`)
          }
        }
      },
    ],
    [
      "each language's blog lists its version, and counts as a language with a blog",
      async () => {
        const languages = await client.fetch<string[]>(blogLanguagesQuery)

        for (const {version} of versions) {
          const listed = await client.fetch<{slug: {current: string}}[]>(postsQuery, {language: version.key})

          assert.ok(
            listed.some((post) => post.slug.current === version.slug),
            `the "${version.key}" blog does not list ${version.slug}`,
          )
          assert.ok(languages.includes(version.key), `"${version.key}" is not counted as a blog language`)
        }
      },
    ],
    [
      'every guide a landing page links to is found in each language, at the address its translation has',
      async () => {
        // The landing pages name their guides by English address and look the rest up (guidesIn).
        const slugs = Array.from(
          new Set(
            (['watch-together', 'long-distance-date-night'] as const)
              .flatMap((slug) => getIntentLandingPage(slug, 'en').guides ?? [])
              .map(({href}) => href.replace('/blog/', '')),
          ),
        )
        const posts = await client.fetch<{slug: string; versions: {language: string; slug: string | null}[]}[]>(
          guideVersionsQuery,
          {slugs},
        )

        assert.deepEqual(posts.map((post) => post.slug).sort(), [...slugs].sort(), 'a guide names a post that does not exist')

        for (const post of posts) {
          const group = groups.find(({versions}) => versions.some(({key, slug}) => key === 'en' && slug === post.slug))
          assert.ok(group, `${post.slug} has no translations`)
          assert.deepEqual(postLanguagePaths({...post, language: 'en'}), pathsOf(group), post.slug)
        }
      },
    ],
  ])
}

main().catch((error) => {
  console.error((error as Error).message)
  process.exit(1)
})
