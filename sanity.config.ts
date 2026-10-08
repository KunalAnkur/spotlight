'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {documentInternationalization} from '@sanity/document-internationalization'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {LOCALES} from './src/sanity/locales'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // One post document per language, tied together by a `translation.metadata` document.
    // A post is a page of its own in each language — its own slug, SEO title and publish
    // date — so the whole document is translated rather than its fields. This adds the
    // "Translations" menu to a post and the "English Post", "Türkçe Post"… templates.
    //
    // Pinned to 4.x in package.json: 5.x and later need Sanity 5 and React 19.
    documentInternationalization({
      supportedLanguages: LOCALES.map(({id, title}) => ({id, title})),
      schemaTypes: ['post'],
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    // A post is always born in a language: from a per-language list in the sidebar, or from
    // the plugin's templates in the global "+" menu. The bare "Post" option would create one
    // with no language, and translation metadata is the plugin's to create, not an author's.
    newDocumentOptions: (prev) =>
      prev.filter((item) => !['post', 'translation.metadata'].includes(item.templateId)),
  },
})
