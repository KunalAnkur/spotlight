/**
 * The languages the app ships in.
 *
 * One list, used to build every translated field. Adding a language is a line here and
 * a new box in the Studio — no schema edits, and nothing to keep in step by hand.
 *
 * Must match `i18n/messages/` in costume. English is the fallback for every other
 * locale, which is why it is the only one that is required.
 */
export const LOCALES = [
  {id: 'en', title: 'English', required: true},
  {id: 'tr', title: 'Türkçe'},
  {id: 'es', title: 'Español'},
  {id: 'ar', title: 'العربية'},
] as const

export const DEFAULT_LOCALE = 'en'
