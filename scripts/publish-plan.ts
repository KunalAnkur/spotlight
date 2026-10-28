/**
 * Which drafted translations go live, and with what date.
 *
 * Pure on purpose: the script that talks to Sanity (publish-translations.ts) hands this the
 * dataset as it is and does what comes back, so every rule here can be checked without one.
 */
import {defaultLocale, isLocale} from '@/i18n/config'

export interface DraftPost {
  _id: string
  title?: string
  language: string
  slug?: string
}

/** A post and its translations, as `translation.metadata` links them. */
export interface TranslationGroup {
  _id: string
  versions: {key: string; ref: string}[]
}

export interface PublishedPost {
  _id: string
  language: string
  slug: string
  publishedAt?: string
}

export interface PlanInput {
  drafts: DraftPost[]
  groups: TranslationGroup[]
  published: PublishedPost[]
  /** The moment of publishing. */
  now: Date
}

export interface Publication {
  draftId: string
  publishedId: string
  language: string
  slug: string
  title: string
  /** The slug of the English post this is a translation of. */
  original: string
  /** Also the post's "SEO Updated At": it has not been edited since. */
  publishedAt: string
}

export interface Plan {
  /** In the order each language's blog will list them. */
  publications: Publication[]
  /** Reasons nothing can be published. One is enough to stop: a half-published set is worse than none. */
  problems: string[]
  /** Drafts this is not about: English posts being edited, or anything in a language the site lacks. */
  untouched: string[]
}

const MINUTE = 60_000

export function planPublication({drafts, groups, published, now}: PlanInput): Plan {
  const problems: string[] = []
  const untouched: string[] = []
  const candidates: (Publication & {originalDate: string})[] = []

  for (const draft of drafts) {
    if (!isLocale(draft.language) || draft.language === defaultLocale) {
      untouched.push(draft._id)
      continue
    }

    const publishedId = draft._id.replace(/^drafts\./, '')
    const group = groups.find(({versions}) => versions.some(({ref}) => ref === publishedId))
    const filedAs = group?.versions.find(({ref}) => ref === publishedId)?.key
    const original = published.find(({_id}) => _id === group?.versions.find(({key}) => key === defaultLocale)?.ref)

    if (!draft.slug) {
      problems.push(`${draft._id} has no slug`)
    } else if (!group) {
      problems.push(`${draft._id} (${draft.slug}) is not linked to an original`)
    } else if (filedAs !== draft.language) {
      problems.push(`${draft._id} (${draft.slug}) is written in ${draft.language} but filed as ${filedAs}`)
    } else if (!original) {
      problems.push(`${draft._id} (${draft.slug}): its English original is not published`)
    } else {
      candidates.push({
        draftId: draft._id,
        publishedId,
        language: draft.language,
        slug: draft.slug,
        title: draft.title ?? '',
        original: original.slug,
        originalDate: original.publishedAt ?? '',
        publishedAt: '',
      })
    }
  }

  // One address per language. A draft replacing its own live version is not a second post.
  for (const candidate of candidates) {
    const taken =
      published.some(
        ({_id, language, slug}) =>
          _id !== candidate.publishedId && language === candidate.language && slug === candidate.slug,
      ) ||
      candidates.some(
        (other) => other !== candidate && other.language === candidate.language && other.slug === candidate.slug,
      )

    if (taken) problems.push(`${candidate.draftId}: /${candidate.language}/blog/${candidate.slug} is already used`)
  }

  if (problems.length > 0) return {publications: [], problems, untouched}

  // A blog lists newest first. Dated a minute apart in the order of their originals, the
  // translations line up on /tr/blog the way the English posts do on /blog.
  const languages = Array.from(new Set(candidates.map(({language}) => language)))
  const publications = languages.flatMap((language) =>
    candidates
      .filter((candidate) => candidate.language === language)
      .sort((a, b) => b.originalDate.localeCompare(a.originalDate) || a.original.localeCompare(b.original))
      .map(({originalDate: _originalDate, ...publication}, rank) => ({
        ...publication,
        publishedAt: new Date(now.getTime() - rank * MINUTE).toISOString(),
      })),
  )

  return {publications, problems, untouched}
}
