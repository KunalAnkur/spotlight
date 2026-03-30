import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'updatedAt',
      title: 'SEO Updated At',
      type: 'datetime',
      description: 'Optional override for search-facing updated date. Leave empty to use Sanity updated time.',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary used on cards, blog listings, and metadata fallbacks.',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Optional search title. Leave empty to use the main title.',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Optional meta description for search and social sharing.',
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: 'primaryKeyword',
      type: 'string',
      description: 'Main keyword or phrase this post is trying to rank for.',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'relatedLandingPage',
      type: 'string',
      options: {
        list: [
          {title: 'Homepage', value: '/'},
          {title: 'Watch Together', value: '/watch-together'},
          {title: 'Long Distance Date Night', value: '/long-distance-date-night'},
        ],
        layout: 'radio',
      },
      description: 'Optional related landing page used for internal linking.',
    }),
    defineField({
      name: 'featuredSnippetAnswer',
      type: 'text',
      rows: 4,
      description: 'Optional short answer or opener that can be used near the top of the article.',
      validation: (Rule) => Rule.max(320),
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
