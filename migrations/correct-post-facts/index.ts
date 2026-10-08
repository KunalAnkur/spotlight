import {at, defineMigration, set} from 'sanity/migrate'

/**
 * Three statements in published posts that were not true, found while the posts were being
 * translated. The translations were written from the corrected text.
 *
 * - Netflix never had a watch party feature of its own to remove; "Netflix Party" was a
 *   third-party extension (now Teleparty). The post also told readers to paste a Netflix link
 *   into a room, which is the one thing the same post explains cannot be done.
 * - The free plan is not "unlimited movies": it has a daily watch-time limit.
 * - Connect 4, first player: the centre column wins, the columns beside it draw, the four
 *   outer columns lose — not "anything but the centre is a draw".
 *
 * A sentence is only replaced while it still reads exactly as listed here, so an edit made in
 * the Studio is never overwritten and running this again does nothing. The Netflix post was
 * corrected in several places, so its "SEO Updated At" moves to the day of the correction;
 * the other two are one clause each and keep theirs.
 *
 *   npx sanity migration run correct-post-facts              (dry run, changes nothing)
 *   npx sanity migration run correct-post-facts --no-dry-run
 */
type Step = string | {_key: string}

interface Correction {
  path: Step[]
  from: string
  to: string
}

const span = (block: string, child: string): Step[] => ['body', {_key: block}, 'children', {_key: child}, 'text']

const CORRECTIONS: Record<string, {updatedAt?: string; corrections: Correction[]}> = {
  // how-to-watch-netflix-together-long-distance
  '63cde841-9965-4ef3-9b6c-b6b83a05de67': {
    updatedAt: '2026-10-06T09:00:00.000Z',
    corrections: [
      {
        path: ['seoDescription'],
        from: 'Netflix removed watch party — but LDR couples can still sync Netflix in 2026. Here are the best methods: screen share, Teleparty, Discord, and more.',
        to: 'Netflix has no built-in watch party — but LDR couples can still sync Netflix in 2026. Here are the best methods: screen share, Teleparty, Discord, and more.',
      },
      {
        path: ['excerpt'],
        from: 'Netflix removed its built-in watch party feature — but you can still watch together long distance in 2026. Here are the best methods, from browser extensions to screen sharing, with no awkward countdown required.',
        to: 'Netflix has no built-in watch party feature — but you can still watch together long distance in 2026. Here are the best methods, from browser extensions to screen sharing, with no awkward countdown required.',
      },
      {
        path: span('b3-i1', 's1'),
        from: 'Netflix removed its watch party feature in 2023. Nobody asked them to. 😤',
        to: 'Netflix has never had a watch party feature of its own. 😤',
      },
      {
        path: span('b3-i2', 's2'),
        from: 'But LDR couples are not stopping their movie nights over a product decision. There are several ways to watch Netflix together long distance in 2026 — some require both of you to have Netflix, some do not, and one is genuinely seamless. Here is the honest breakdown.',
        to: 'But LDR couples are not stopping their movie nights over a missing feature. There are several ways to watch Netflix together long distance in 2026 — some require both of you to have Netflix, some do not, and one is genuinely seamless. Here is the honest breakdown.',
      },
      {
        path: span('b3-c1', 's27'),
        from: 'Netflix may have pulled the plug on their native feature, but LDR couples have better tools now than they did when it existed. You just have to know which one to use.',
        to: 'Netflix may not have a feature of its own, but LDR couples have better tools now than they have ever had. You just have to know which one to use.',
      },
      {
        path: span('b3-c2', 's28'),
        from: 'Start tonight. Open a free Movmash room at movmash.com, share your screen, paste the Netflix link, and send the room link to your person. You will be watching the same scene at the same second in under two minutes. 🍿',
        to: 'Start tonight. Open a free Movmash room at movmash.com, share your screen, open Netflix in another tab, and send the room link to your person. You will be watching the same scene at the same second in under two minutes. 🍿',
      },
      {
        path: ['faq', {_key: 'faq-b3-2'}, 'answer'],
        from: 'Netflix removed its built-in Watch Party feature in 2023. You now need a third-party tool — Teleparty (extension), Movmash (screen share), or Discord screen share are the most popular options in 2026.',
        to: 'No. Netflix has never had a built-in watch party feature — “Netflix Party” was a third-party browser extension, now called Teleparty. To watch together you need a third-party tool: Teleparty (extension), Movmash (screen share), or Discord screen share are the most popular options in 2026.',
      },
    ],
  },
  // ldr-date-night-ideas
  'c6857f13-aafc-460c-8de6-804fd08211e0': {
    corrections: [
      {
        path: ['faq', {_key: '7d6dc4291c6c'}, 'answer'],
        from: 'Movmash is the best app for LDR date nights. It lets couples watch videos together in perfect sync — no downloads, no extensions. The free plan works for two people with unlimited movies.',
        to: 'Movmash is the best app for LDR date nights. It lets couples watch videos together in perfect sync — no downloads, no extensions. The free plan works for two people.',
      },
    ],
  },
  // play-connect-4-online-with-friends
  'post-play-connect-4-online-with-friends': {
    corrections: [
      {
        path: span('k4hu6mb', 'k4gkvfd'),
        from: 'Connect 4 was solved in 1988. With perfect play from both sides, the player who moves first wins — but only if they open in the centre column. Open anywhere else and the game is a draw.',
        to: 'Connect 4 was solved in 1988. With perfect play from both sides, the player who moves first wins — but only if they open in the centre column. Open in a column next to the centre and the game is a draw; open nearer the edge and the second player can win.',
      },
    ],
  },
}

/** The value at a path of field names and keyed array items. */
function valueAt(doc: unknown, path: Step[]): unknown {
  return path.reduce<any>(
    (value, step) =>
      typeof step === 'string' ? value?.[step] : (value as {_key: string}[] | undefined)?.find((item) => item._key === step._key),
    doc,
  )
}

export default defineMigration({
  title: 'Correct three untrue statements in published posts',
  documentTypes: ['post'],
  filter: `_id in ${JSON.stringify(Object.keys(CORRECTIONS))}`,
  migrate: {
    document(doc) {
      const entry = CORRECTIONS[doc._id]
      const due = entry?.corrections.filter(({path, from}) => valueAt(doc, path) === from) ?? []
      if (due.length === 0) return undefined

      return [
        ...due.map(({path, to}) => at(path, set(to))),
        ...(entry.updatedAt ? [at('updatedAt', set(entry.updatedAt))] : []),
      ]
    },
  },
})
