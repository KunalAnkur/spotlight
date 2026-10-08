import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {DEFAULT_LOCALE, LOCALES} from '../locales'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      // A category is one thing in every language — same slug, same posts — so only its
      // name is translated, unlike a post, which is a separate document per language.
      name: 'titleTranslations',
      title: 'Title in other languages',
      type: 'object',
      description: 'Shown on posts in that language. An empty box falls back to the title above.',
      fields: LOCALES.filter((locale) => locale.id !== DEFAULT_LOCALE).map((locale) =>
        defineField({name: locale.id, title: locale.title, type: 'string'}),
      ),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
  ],
})
