import type {StructureResolver} from 'sanity/structure'

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
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['post', 'category', 'author', 'discoverSlide'].includes(item.getId()!),
      ),
    ])
