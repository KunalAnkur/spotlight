import type {StructureResolver} from 'sanity/structure'

import {apiVersion} from './env'
import {LOCALES} from './locales'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
//
// Two things live in this Studio now: the blog that movmash.com renders, and the
// discover slides that the app's home carousel renders. Keeping them apart at the top
// level matters — they are edited by different people on different days.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Movmash')
    .items([
      S.listItem()
        .title('Home carousel')
        .child(
          S.documentTypeList('discoverSlide')
            .title('Discover slides')
            .defaultOrdering([
              {field: 'priority', direction: 'asc'},
              {field: 'publishedAt', direction: 'desc'},
            ]),
        ),
      S.divider(),
      // One list per language: a post is a separate document in each language, and a single
      // mixed list of four languages is unreadable. "+" inside a list creates a post already
      // in that language.
      S.listItem()
        // Same id the plain post list had, so /studio/structure/post keeps working.
        .id('post')
        .title('Posts')
        .schemaType('post')
        .child(
          S.list()
            .title('Posts')
            .items([
              ...LOCALES.map((locale) =>
                S.listItem()
                  .id(locale.id)
                  .title(locale.title)
                  .schemaType('post')
                  .child(
                    S.documentList()
                      .id(locale.id)
                      .title(`${locale.title} posts`)
                      .schemaType('post')
                      .apiVersion(apiVersion)
                      .filter('_type == "post" && language == $language')
                      .params({language: locale.id})
                      .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                      // Must stay the last call: any builder method after it re-infers the
                      // templates from the schema type and offers all four languages again.
                      .initialValueTemplates([S.initialValueTemplateItem(`post-${locale.id}`)]),
                  ),
              ),
              S.divider(),
              // Posts written before languages existed. The site treats them as English; open
              // one and pick its language from the Translations menu to move it out of here.
              S.listItem()
                .id('no-language')
                .title('No language set')
                .schemaType('post')
                .child(
                  S.documentList()
                    .id('no-language')
                    .title('Posts with no language set')
                    .schemaType('post')
                    .apiVersion(apiVersion)
                    .filter('_type == "post" && !defined(language)')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                    // Last for the same reason as above. Empty: nothing new starts here.
                    .initialValueTemplates([]),
                ),
            ]),
        ),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      // translation.metadata is the plugin's bookkeeping; authors reach it through a post's
      // Translations menu, never as a list.
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['post', 'category', 'author', 'discoverSlide', 'translation.metadata'].includes(
            item.getId()!,
          ),
      ),
    ])
