/**
 * What an author gets in the Studio, checked without opening it.
 *
 * Resolves the real Studio config the way the Studio does — plugins, schema, templates,
 * sidebar — so the per-language post lists, the "+" menu and the slug rule can be verified
 * without a Sanity login. Reads the public dataset; writes nothing.
 *
 *   npx sanity exec scripts/studio-config.test.ts --mock-browser-env
 */
import assert from 'node:assert/strict'
import {createSourceFromConfig} from 'sanity'
import {getCliClient} from 'sanity/cli'
import {createStructureBuilder} from 'sanity/structure'

import config from '../sanity.config'
import {structure} from '../src/sanity/structure'

const languages = ['en', 'tr', 'es', 'ar']
const postTemplates = languages.map((id) => `post-${id}`)

/* The Studio's own types for these are internal; the checks only read plain properties. */
type Loose = any

const names = (items: Loose[]) => items.map((item) => item.name)
const serialize = (node: Loose, path: string[]) => (node.serialize ? node.serialize({path}) : node)

async function main() {
  const source: Loose = await createSourceFromConfig({
    ...(config as Loose),
    name: 'default',
    currentUser: {
      id: 'check',
      name: 'check',
      email: 'check@example.com',
      role: 'administrator',
      roles: [{name: 'administrator', title: 'Administrator'}],
    },
    getClient: (options: Loose) => getCliClient(options),
  })

  const post = source.schema.get('post')
  const body = source.schema.get('blockContent')
  const slugRule = post.fields.find((field: Loose) => field.name === 'slug').type.options.isUnique

  const S = createStructureBuilder({source, perspectiveStack: []} as Loose)
  const root = serialize(structure(S, source), [])
  const sidebar = root.items.filter((item: Loose) => item.type === 'listItem')
  const posts = sidebar.find((item: Loose) => item.title === 'Posts')
  const postLists = serialize(posts.child, ['post']).items.filter(
    (item: Loose) => item.type === 'listItem',
  )

  // Any real post will do: the rule is checked relative to it, not to a slug that might be
  // renamed one day.
  const existing = await getCliClient({apiVersion: '2025-02-19'}).fetch(
    `*[_type == "post" && defined(slug.current)][0]{_id, "slug": slug.current, "language": coalesce(language, "en")}`,
  )
  const isUnique = (document: Loose, slug: string) =>
    slugRule(slug, {document, getClient: (options: Loose) => getCliClient(options)})

  const checks: [string, () => void | Promise<void>][] = [
    [
      'a post carries a language the author cannot edit by hand',
      () => {
        const language = post.fields.find((field: Loose) => field.name === 'language')
        assert.equal(language.type.hidden, true)
        assert.equal(language.type.readOnly, true)
      },
    ],
    [
      'the plugin registered its translation bookkeeping type',
      () => assert.ok(source.schema.get('translation.metadata')),
    ],
    [
      'the body editor has no H1, so the post title stays the only one',
      () => {
        const block = body.of.find((member: Loose) => member.name === 'block')
        const styles = block.fields
          .find((field: Loose) => field.name === 'style')
          .type.options.list.map((style: Loose) => style.value)
        assert.deepEqual(styles, ['normal', 'h2', 'h3', 'h4', 'blockquote'])
      },
    ],
    [
      'a body image takes alt text and a caption',
      () => {
        const image = body.of.find((member: Loose) => member.name === 'image')
        const fields = names(image.fields)
        assert.ok(fields.includes('alt'), 'alt is missing')
        assert.ok(fields.includes('caption'), 'caption is missing')
      },
    ],
    [
      'a category name can be translated into every language but English',
      () => {
        const translations = source.schema
          .get('category')
          .fields.find((field: Loose) => field.name === 'titleTranslations')
        assert.deepEqual(names(translations.type.fields), ['tr', 'es', 'ar'])
      },
    ],
    [
      'the "+" menu creates a post in a chosen language, never one without',
      () => {
        const menu = source.document
          .resolveNewDocumentOptions({type: 'global'})
          .map((item: Loose) => item.templateId)
        assert.deepEqual(menu, ['category', 'author', 'discoverSlide', ...postTemplates])
      },
    ],
    [
      'each language template sets that language',
      () => {
        for (const id of languages) {
          const template = source.templates.find((item: Loose) => item.id === `post-${id}`)
          assert.deepEqual(template.value, {language: id})
        }
      },
    ],
    [
      'the sidebar keeps its four entries, and Posts keeps its address',
      () => {
        assert.deepEqual(
          sidebar.map((item: Loose) => item.title),
          ['Home carousel', 'Posts', 'Categories', 'Authors'],
        )
        assert.equal(posts.id, 'post')
      },
    ],
    [
      'Posts opens into one list per language, plus the posts that have none yet',
      () => {
        assert.deepEqual(
          postLists.map((item: Loose) => item.id),
          [...languages, 'no-language'],
        )
      },
    ],
    [
      'a language list shows only that language, and its "+" creates a post in it',
      () => {
        for (const item of postLists.filter((list: Loose) => list.id !== 'no-language')) {
          const pane = serialize(item.child, ['post', item.id])
          assert.equal(pane.options.filter, '_type == "post" && language == $language')
          assert.deepEqual(pane.options.params, {language: item.id})
          assert.deepEqual(
            pane.initialValueTemplates.map((template: Loose) => template.templateId),
            [`post-${item.id}`],
          )
        }
      },
    ],
    [
      'the no-language list is for sorting old posts out, not for creating new ones',
      () => {
        const item = postLists.find((list: Loose) => list.id === 'no-language')
        const pane = serialize(item.child, ['post', item.id])
        assert.equal(pane.options.filter, '_type == "post" && !defined(language)')
        assert.deepEqual(pane.initialValueTemplates, [])
      },
    ],
    [
      'a slug cannot be reused by another post in the same language',
      async () => {
        const other = {_id: 'check-new-post', _type: 'post', language: existing.language}
        assert.equal(await isUnique(other, existing.slug), false)
      },
    ],
    [
      'a post with no language counts as English when slugs are compared',
      async () => {
        if (existing.language !== 'en') return
        assert.equal(await isUnique({_id: 'check-new-post', _type: 'post'}, existing.slug), false)
      },
    ],
    [
      'the same slug is free in another language',
      async () => {
        const translation = {_id: 'check-new-post', _type: 'post', language: 'xx'}
        assert.equal(await isUnique(translation, existing.slug), true)
      },
    ],
    [
      'a post does not clash with itself or with its own draft',
      async () => {
        const self = {_id: existing._id, _type: 'post', language: existing.language}
        assert.equal(await isUnique(self, existing.slug), true)
        assert.equal(await isUnique({...self, _id: `drafts.${existing._id}`}, existing.slug), true)
      },
    ],
  ]

  let failed = 0
  for (const [name, run] of checks) {
    try {
      await run()
      console.log(`ok      ${name}`)
    } catch (error) {
      failed++
      console.log(`NOT OK  ${name}\n        ${String((error as Error).message).split('\n').join('\n        ')}`)
    }
  }

  console.log(failed ? `\n${failed} of ${checks.length} failed` : `\nall ${checks.length} passed`)
  process.exit(failed ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
