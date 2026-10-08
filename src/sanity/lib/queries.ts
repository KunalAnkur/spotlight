import { groq } from 'next-sanity'

/**
 * A post is one document per language, linked to its translations by the plugin configured
 * in sanity.config.ts. Posts written before that carry no `language` and are English — the
 * same rule the Studio's slug check uses.
 */
const postLanguage = `coalesce(language, "en")`

/**
 * Every language version of a post, itself included, as the translations plugin links them.
 * A post with no translation has no metadata document, so this is null for it. A translation
 * that is still a draft resolves to null here too: it is not on the site yet.
 */
const postVersions = `*[_type == "translation.metadata" && references(^._id)][0].translations[].value->{
  "language": ${postLanguage},
  "slug": slug.current
}`

/** A category is one document in every language; only its name is translated. */
const categoryTitle = `coalesce(titleTranslations[$language], title)`

// The posts of one language, newest first
export const postsQuery = groq`*[_type == "post" && ${postLanguage} == $language] | order(publishedAt desc) {
  _id,
  title,
  seoTitle,
  seoDescription,
  excerpt,
  primaryKeyword,
  relatedLandingPage,
  slug,
  mainImage,
  publishedAt,
  updatedAt,
  _updatedAt,
  "author": author->{
    name,
    image
  },
  "categories": categories[]->{
    "title": ${categoryTitle}
  }
}`

// A single post by slug, in one language. The same slug may exist in another language.
export const postQuery = groq`*[_type == "post" && slug.current == $slug && ${postLanguage} == $language][0] {
  _id,
  title,
  seoTitle,
  seoDescription,
  excerpt,
  primaryKeyword,
  relatedLandingPage,
  featuredSnippetAnswer,
  slug,
  mainImage,
  publishedAt,
  updatedAt,
  _updatedAt,
  faq,
  body,
  "language": ${postLanguage},
  "versions": ${postVersions},
  "author": author->{
    name,
    image,
    bio
  },
  "categories": categories[]->{
    _id,
    "title": ${categoryTitle},
    description
  },
  "categoryRefs": categories[]._ref
}`

// Every post with its language and translations, for static generation and the sitemap
export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)] {
  "slug": slug.current,
  "language": ${postLanguage},
  "versions": ${postVersions},
  "updatedAt": updatedAt,
  "_updatedAt": _updatedAt,
  "publishedAt": publishedAt
}`

// English posts named by their slugs, each with its translations, for a page that links to
// them from every language
export const guideVersionsQuery = groq`*[_type == "post" && ${postLanguage} == "en" && slug.current in $slugs] {
  "slug": slug.current,
  "versions": ${postVersions}
}`

// The languages that have at least one post
export const blogLanguagesQuery = groq`array::unique(*[_type == "post" && defined(slug.current)]{
  "language": ${postLanguage}
}.language)`

// Related posts: same language, same category, excluding the current post
export const relatedPostsQuery = groq`*[_type == "post" && _id != $currentPostId && ${postLanguage} == $language && count(categories[@._ref in $categoryRefs]) > 0] | order(publishedAt desc) [0...4] {
  _id,
  title,
  seoTitle,
  excerpt,
  slug,
  mainImage,
  publishedAt,
  "author": author->{
    name,
    image
  },
  "categories": categories[]->{
    "title": ${categoryTitle}
  }
}`
