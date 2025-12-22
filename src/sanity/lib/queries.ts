import { groq } from 'next-sanity'

// Query to get all blog posts
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  "author": author->{
    name,
    image
  },
  "categories": categories[]->{
    title
  }
}`

// Query to get a single post by slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  body,
  "author": author->{
    name,
    image,
    bio
  },
  "categories": categories[]->{
    _id,
    title,
    description
  },
  "categoryRefs": categories[]._ref
}`

// Query to get all post slugs for static generation
export const postSlugsQuery = groq`*[_type == "post"] {
  "slug": slug.current
}`

// Query to get related posts from the same category (excluding current post)
export const relatedPostsQuery = groq`*[_type == "post" && _id != $currentPostId && count(categories[@._ref in $categoryRefs]) > 0] | order(publishedAt desc) [0...4] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  "author": author->{
    name,
    image
  },
  "categories": categories[]->{
    title
  }
}`

