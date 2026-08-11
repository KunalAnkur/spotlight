import {defineField, defineType, type StringRule, type TextRule} from 'sanity'
import {LOCALES} from '../locales'

/**
 * Translated text, as one box per language.
 *
 * Field-level translation rather than one document per language: a slide is the same
 * slide in every locale — same picture, same link, same priority — and only its words
 * change. Duplicating the document would mean four things to keep in step, and four
 * chances for the Turkish carousel to point at a game that was pulled.
 *
 * English is required and every other language falls back to it, so a slide is
 * publishable the moment it is written and translations can follow whenever.
 *
 * Adding a language is one line in `../locales.ts`.
 */

type Locale = (typeof LOCALES)[number]

const isRequired = (locale: Locale) => 'required' in locale && locale.required === true

const stringFields = LOCALES.map((locale) =>
  defineField({
    name: locale.id,
    title: locale.title,
    type: 'string',
    ...(isRequired(locale)
      ? {validation: (rule: StringRule) => rule.required()}
      : {}),
  }),
)

const textFields = LOCALES.map((locale) =>
  defineField({
    name: locale.id,
    title: locale.title,
    type: 'text',
    rows: 2,
    ...(isRequired(locale) ? {validation: (rule: TextRule) => rule.required()} : {}),
  }),
)

export const localeStringType = defineType({
  name: 'localeString',
  title: 'Text',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: stringFields,
  preview: {select: {title: 'en'}},
})

export const localeTextType = defineType({
  name: 'localeText',
  title: 'Text',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: textFields,
  preview: {select: {title: 'en'}},
})
