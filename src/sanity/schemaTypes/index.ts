import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {discoverSlideType} from './discoverSlideType'
import {localeStringType, localeTextType} from './localeTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    discoverSlideType,
    localeStringType,
    localeTextType,
  ],
}
