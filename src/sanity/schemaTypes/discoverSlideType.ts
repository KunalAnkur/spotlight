import {RocketIcon} from '@sanity/icons'
import {defineField, defineType, type ValidationContext} from 'sanity'

/**
 * One slide in the app's home carousel — a thing two people could do together.
 *
 * `source` is the spine of this document. It decides what the slide points at, what
 * happens when the button is pressed, where the artwork comes from when none is
 * uploaded, and how high the slide sorts by default. Everything else is presentation.
 *
 * Slides carry a *reference*, not a copy: a game id, a link, a post, a product. The app
 * resolves the title, art and price at render time, so a slide never goes stale and a
 * reference that disappears takes its slide out of the carousel with it.
 */

/**
 * Adding a source is an entry here plus a handler in the app. Nothing else in this
 * schema is aware of the list.
 *
 *  `tier` is the default sort weight; a slide may override it with `priority`.
 *  `fit`  is whether the art fills the band or is framed inside it — product photos on
 *         a white background have to be framed, scenes do not.
 */
const SOURCES = [
  {
    value: 'newGame',
    title: 'New game drop',
    description: 'Opens a room with the game. Leads the carousel while boosted.',
    tier: 10,
    fit: 'cover',
  },
  {
    value: 'watch',
    title: 'Watch together',
    description: 'Opens a room playing a video or a whole playlist.',
    tier: 20,
    fit: 'cover',
  },
  {
    value: 'game',
    title: 'Game',
    description: 'Opens a room with a game already in the catalogue.',
    tier: 30,
    fit: 'cover',
  },
  {
    value: 'read',
    title: 'Blog or date idea',
    description: 'Opens an article.',
    tier: 40,
    fit: 'cover',
  },
  {
    value: 'gift',
    title: 'Gift',
    description: 'Opens a product page.',
    tier: 50,
    fit: 'contain',
  },
] as const

type SourceValue = (typeof SOURCES)[number]['value']

/** Shows a field only for the sources that use it. */
const onlyFor =
  (...sources: SourceValue[]) =>
  ({parent}: {parent?: {source?: string}}) =>
    !sources.includes(parent?.source as SourceValue)

/** Required, but only when the chosen source actually needs it. */
const requiredFor =
  (...sources: SourceValue[]) =>
  (value: unknown, context: ValidationContext) => {
    const source = (context.document as {source?: string} | undefined)?.source
    if (!sources.includes(source as SourceValue)) return true
    return value ? true : 'Required for this source.'
  }

export const discoverSlideType = defineType({
  name: 'discoverSlide',
  title: 'Discover slide',
  type: 'document',
  icon: RocketIcon,

  groups: [
    {name: 'target', title: 'What it opens', default: true},
    {name: 'content', title: 'Words'},
    {name: 'art', title: 'Art'},
    {name: 'placing', title: 'Placing'},
  ],

  fields: [
    // ---------------------------------------------------------------- target
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      group: 'target',
      description: 'Decides what the button does and where the artwork comes from.',
      options: {
        list: SOURCES.map(({value, title}) => ({value, title})),
        layout: 'radio',
      },
      initialValue: 'watch',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'gameId',
      title: 'Game id',
      type: 'string',
      group: 'target',
      hidden: onlyFor('newGame', 'game'),
      // Free text rather than a dropdown on purpose. A list of games here would be a
      // second copy of the arcade registry, and the day it disagrees is the day a slide
      // opens a room for a game that no longer exists.
      description: 'Exactly as published in arcade — e.g. jigsaw, tictactoe, connect4.',
      validation: (rule) =>
        rule
          .custom(requiredFor('newGame', 'game'))
          .regex(/^[a-z0-9][a-z0-9-]*$/, {name: 'lowercase id'}),
    }),

    defineField({
      name: 'watchUrl',
      title: 'Video or playlist link',
      type: 'url',
      group: 'target',
      hidden: onlyFor('watch'),
      description:
        'A YouTube video or a playlist. A playlist opens the room with every video in it, ' +
        'in order. The thumbnail and title are read from the link unless you set your own.',
      validation: (rule) => rule.custom(requiredFor('watch')),
    }),

    defineField({
      name: 'post',
      title: 'Article',
      type: 'reference',
      to: [{type: 'post'}],
      group: 'target',
      hidden: onlyFor('read'),
      description: 'The title and main image are taken from the post unless overridden.',
      validation: (rule) => rule.custom(requiredFor('read')),
    }),

    defineField({
      name: 'productId',
      title: 'Product id',
      type: 'string',
      group: 'target',
      hidden: onlyFor('gift'),
      description: 'The id from the products list. The name, image and price are read from it.',
      validation: (rule) => rule.custom(requiredFor('gift')),
    }),

    // --------------------------------------------------------------- content
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      group: 'content',
      description: 'A few words. It is the only line most people read.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      group: 'content',
      description: 'One short line under the title. Two at most — the picture needs the room.',
    }),

    defineField({
      name: 'ctaLabel',
      title: 'Button',
      type: 'localeString',
      group: 'content',
      description:
        'Say what they will be doing, not what the thing is — "Study together" beats "Watch video".',
    }),

    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'localeString',
      group: 'content',
      description: 'The small line above the title. Falls back to the source name.',
    }),

    defineField({
      name: 'meta',
      title: 'Small fact',
      type: 'localeString',
      group: 'content',
      description: 'Sits beside the button — "24 tracks", "2 players", "5 min". Optional.',
    }),

    // ------------------------------------------------------------------- art
    defineField({
      name: 'image',
      title: 'Artwork',
      type: 'image',
      group: 'art',
      options: {hotspot: true},
      description:
        'Optional. Without one, the art comes from the source: the game cover, the video ' +
        'thumbnail, the article image, the product photo. Upload only to override that. ' +
        'Landscape, 1600px wide or better.',
    }),

    defineField({
      name: 'fit',
      title: 'How the art sits',
      type: 'string',
      group: 'art',
      options: {
        list: [
          {value: 'cover', title: 'Fill the band'},
          {value: 'contain', title: 'Framed inside it'},
        ],
        layout: 'radio',
      },
      description:
        'Leave empty to follow the source — gifts are framed, everything else fills. ' +
        'Frame anything photographed on a white background; filling crops it to nothing.',
    }),

    defineField({
      name: 'accent',
      title: 'Accent colour',
      type: 'string',
      group: 'art',
      description:
        'Hex, e.g. #8b5cf6. Tints the glow and the eyebrow dot. Games use their own colour ' +
        'when this is empty.',
      validation: (rule) => rule.regex(/^#[0-9a-fA-F]{6}$/, {name: 'hex colour'}),
    }),

    // --------------------------------------------------------------- placing
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      group: 'placing',
      description:
        'Lower comes first. Leave empty and the slide takes its source’s rank — ' +
        SOURCES.map((s) => `${s.title} ${s.tier}`).join(', ') +
        '. Set it only to jump the queue.',
      validation: (rule) => rule.min(0).max(999),
    }),

    defineField({
      name: 'boostUntil',
      title: 'Boost until',
      type: 'datetime',
      group: 'placing',
      description:
        'While this is in the future the slide leads the carousel whatever its source. ' +
        'It stops on its own — nothing to switch off. Use it for a game drop.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime',
      group: 'placing',
      description: 'Breaks ties between slides of the same rank — newer first.',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  orderings: [
    {
      title: 'Carousel order',
      name: 'carousel',
      by: [
        {field: 'boostUntil', direction: 'desc'},
        {field: 'priority', direction: 'asc'},
        {field: 'publishedAt', direction: 'desc'},
      ],
    },
  ],

  preview: {
    select: {
      title: 'title.en',
      source: 'source',
      boostUntil: 'boostUntil',
      media: 'image',
    },
    prepare({title, source, boostUntil, media}) {
      const label = SOURCES.find((s) => s.value === source)?.title ?? source
      const boosted = boostUntil && Date.parse(boostUntil) > Date.now()
      return {
        title: title || '(untitled)',
        subtitle: boosted ? `${label} · boosted` : label,
        media,
      }
    },
  },
})

/** Exported so the app and the Studio cannot disagree about the defaults. */
export {SOURCES}
