/**
 * Which drafts the publish script takes live, and with what date.
 *
 *   npx sanity exec scripts/publish-plan.test.ts
 */
import assert from 'node:assert/strict'

import {planPublication, type PlanInput} from './publish-plan'
import {runChecks} from './run-checks'

const now = new Date('2026-10-08T12:00:00.000Z')

/** Two English posts, the newer one first on the blog, each with a Turkish draft. */
const base = (): PlanInput => ({
  now,
  drafts: [
    {_id: 'drafts.tr-old', title: 'Eski', language: 'tr', slug: 'eski-yazi'},
    {_id: 'drafts.tr-new', title: 'Yeni', language: 'tr', slug: 'yeni-yazi'},
  ],
  groups: [
    {_id: 'g-old', versions: [{key: 'en', ref: 'en-old'}, {key: 'tr', ref: 'tr-old'}]},
    {_id: 'g-new', versions: [{key: 'en', ref: 'en-new'}, {key: 'tr', ref: 'tr-new'}]},
  ],
  published: [
    {_id: 'en-old', language: 'en', slug: 'old-post', publishedAt: '2026-05-01T09:00:00.000Z'},
    {_id: 'en-new', language: 'en', slug: 'new-post', publishedAt: '2026-08-01T09:00:00.000Z'},
  ],
})

runChecks([
  [
    'a linked translation goes live under its own id, dated the day it is published',
    () => {
      const {publications, problems} = planPublication(base())

      assert.deepEqual(problems, [])
      assert.deepEqual(
        publications.map(({draftId, publishedId, language, slug}) => ({draftId, publishedId, language, slug})),
        [
          {draftId: 'drafts.tr-new', publishedId: 'tr-new', language: 'tr', slug: 'yeni-yazi'},
          {draftId: 'drafts.tr-old', publishedId: 'tr-old', language: 'tr', slug: 'eski-yazi'},
        ],
      )
      assert.equal(publications[0].publishedAt, '2026-10-08T12:00:00.000Z')
    },
  ],
  [
    "a language's blog keeps the order of the English one: the newest original's translation is newest",
    () => {
      const {publications} = planPublication(base())

      assert.deepEqual(
        publications.map(({slug, publishedAt}) => [slug, publishedAt]),
        [
          ['yeni-yazi', '2026-10-08T12:00:00.000Z'],
          ['eski-yazi', '2026-10-08T11:59:00.000Z'],
        ],
      )
    },
  ],
  [
    'originals published at the same moment are told apart the same way in every language',
    () => {
      const input = base()
      input.published[0].publishedAt = input.published[1].publishedAt
      input.drafts.push(
        {_id: 'drafts.es-new', title: 'Nuevo', language: 'es', slug: 'entrada-nueva'},
        {_id: 'drafts.es-old', title: 'Viejo', language: 'es', slug: 'entrada-vieja'},
      )
      input.groups[0].versions.push({key: 'es', ref: 'es-old'})
      input.groups[1].versions.push({key: 'es', ref: 'es-new'})

      // The Turkish drafts arrive old-first, the Spanish ones new-first: the order must not follow that.
      assert.deepEqual(
        planPublication(input).publications.map(({language, original}) => `${language} ${original}`),
        ['tr new-post', 'tr old-post', 'es new-post', 'es old-post'],
      )
    },
  ],
  [
    'each language is ordered on its own',
    () => {
      const input = base()
      input.drafts.push({_id: 'drafts.es-old', title: 'Viejo', language: 'es', slug: 'entrada-vieja'})
      input.groups[0].versions.push({key: 'es', ref: 'es-old'})

      const spanish = planPublication(input).publications.filter(({language}) => language === 'es')

      assert.deepEqual(spanish.map(({publishedAt}) => publishedAt), ['2026-10-08T12:00:00.000Z'])
    },
  ],
  [
    'an English draft, or a draft in a language the site does not have, is left alone and said so',
    () => {
      const input = base()
      input.drafts.push({_id: 'drafts.en-new', title: 'Edited', language: 'en', slug: 'new-post'})
      input.drafts.push({_id: 'drafts.de-x', title: 'Deutsch', language: 'de', slug: 'ein-beitrag'})

      const {publications, untouched, problems} = planPublication(input)

      assert.deepEqual(problems, [])
      assert.equal(publications.length, 2)
      assert.deepEqual(untouched.sort(), ['drafts.de-x', 'drafts.en-new'])
    },
  ],
  [
    'a translation that no original points to stops everything: its page would name no other language',
    () => {
      const input = base()
      input.groups.pop()

      const {publications, problems} = planPublication(input)

      assert.equal(publications.length, 0)
      assert.match(problems.join('\n'), /drafts\.tr-new.*not linked/)
    },
  ],
  [
    'a translation filed under another language stops everything',
    () => {
      const input = base()
      input.groups[1].versions[1].key = 'es'

      assert.match(planPublication(input).problems.join('\n'), /drafts\.tr-new.*filed as es/)
    },
  ],
  [
    'a translation whose English original is not published stops everything',
    () => {
      const input = base()
      input.published.pop()

      assert.match(planPublication(input).problems.join('\n'), /drafts\.tr-new.*original is not published/)
    },
  ],
  [
    'a draft without an address stops everything',
    () => {
      const input = base()
      delete input.drafts[0].slug

      assert.match(planPublication(input).problems.join('\n'), /drafts\.tr-old.*no slug/)
    },
  ],
  [
    'an address already taken in that language stops everything, whether by a live post or another draft',
    () => {
      const live = base()
      live.published.push({_id: 'tr-other', language: 'tr', slug: 'yeni-yazi', publishedAt: '2026-09-01T09:00:00.000Z'})
      assert.match(planPublication(live).problems.join('\n'), /yeni-yazi.*already used/)

      const twice = base()
      twice.drafts[0].slug = 'yeni-yazi'
      assert.match(planPublication(twice).problems.join('\n'), /yeni-yazi.*already used/)
    },
  ],
  [
    'publishing a draft again over its own live version is not a clash',
    () => {
      const input = base()
      input.published.push({_id: 'tr-new', language: 'tr', slug: 'yeni-yazi', publishedAt: '2026-10-01T09:00:00.000Z'})

      assert.deepEqual(planPublication(input).problems, [])
    },
  ],
])
