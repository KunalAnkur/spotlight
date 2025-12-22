import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, User, BookOpen } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BlogContent from "@/components/blog/BlogContent";
import AuthorBio from "@/components/blog/AuthorBio";
import BlogCard from "@/components/blog/BlogCard";
import ArticleSchema from "@/components/blog/ArticleSchema";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import { client } from "@/sanity/lib/client";
import { postQuery, postSlugsQuery, relatedPostsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

// Revalidate every 60 seconds
export const revalidate = 60;

async function getPost(slug: string) {
  try {
    const post = await client.fetch(postQuery, { slug });
    return post || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Generate metadata for blog posts
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${baseUrl}/og-image.png`;

  const description = post.body
    ? // Extract first paragraph from body if available
      (typeof post.body === 'string' 
        ? post.body.substring(0, 160) 
        : 'Read this article on Movmash blog')
    : `Read ${post.title} on Movmash blog`;

  // Extract categories for keywords
  const categoryKeywords = post.categories?.map((cat: any) => cat.title) || [];
  const keywords = [
    "watch party",
    "video sync",
    "watch together",
    ...categoryKeywords,
  ];

  return {
    title: post.title,
    description: description,
    keywords: keywords.join(", "),
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
    openGraph: {
      title: post.title,
      description: description,
      url: `${baseUrl}/blog/${params.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: categoryKeywords,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: [imageUrl],
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(postSlugsQuery);
    return slugs.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

async function getRelatedPosts(currentPostId: string, categoryRefs: string[]) {
  try {
    if (categoryRefs.length === 0) return [];
    const posts = await client.fetch(relatedPostsQuery, {
      currentPostId,
      categoryRefs,
    });
    return posts || [];
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  // Get category references for related posts query
  const categoryRefs = (post as any).categoryRefs?.filter(Boolean) || [];
  
  // Fetch related posts
  const relatedPosts = await getRelatedPosts(post._id, categoryRefs);

  // Safely get image URL - check if image has asset
  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : null;

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Prepare data for Article Schema
  const articleImageUrl = imageUrl || `${baseUrl}/og-image.png`;
  
  // Extract description from body (Portable Text)
  let articleDescription = `Read ${post.title} on Movmash blog`;
  if (post.body && Array.isArray(post.body)) {
    // Try to extract text from Portable Text blocks
    const firstBlock = post.body.find((block: any) => block._type === 'block' && block.children);
    if (firstBlock && firstBlock.children) {
      const text = firstBlock.children
        .map((child: any) => child.text || '')
        .join(' ')
        .substring(0, 160);
      if (text) articleDescription = text;
    }
  }
  
  const authorImageUrl = post.author?.image?.asset?._ref
    ? urlFor(post.author.image).width(200).height(200).url()
    : undefined;

  // Ensure we have a valid published date
  const publishedDateISO = post.publishedAt || new Date().toISOString();

  return (
    <>
      {/* Article Schema for Rich Results */}
      <ArticleSchema
        title={post.title}
        description={articleDescription}
        url={`${baseUrl}/blog/${params.slug}`}
        image={articleImageUrl}
        datePublished={publishedDateISO}
        dateModified={publishedDateISO}
        authorName={post.author?.name || "Movmash"}
        authorImage={authorImageUrl}
        publisherName="Movmash"
        categories={post.categories?.map((cat: any) => cat.title) || []}
      />
      
      {/* Breadcrumb Schema for Navigation */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Blog", url: `${baseUrl}/blog` },
          { name: post.title, url: `${baseUrl}/blog/${params.slug}` },
        ]}
      />
      
      <div className="min-h-screen bg-[#18181b]">
      <Navbar />
      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background glow effects - same as other pages */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.08)_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.06)_0%,_transparent_70%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <article className="max-w-5xl mx-auto">
            {/* Top Bar: Back Button and Category */}
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </Link>
              
              {post.categories && post.categories.length > 0 && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white">
                  {post.categories[0].title}
                </span>
              )}
            </div>

            {/* Header - Modern Design */}
            <header className="mb-10">
              {/* Title - Full Width, Own Row */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white leading-[1.1] mb-6 break-words">
                {post.title}
              </h1>
              
              {/* Author and Date - Right Aligned, Separate Row - Fixed Height */}
              <div className="flex items-center justify-start gap-6 flex-shrink-0">
                {post.author && (
                  <div className="flex items-center gap-3 group flex-shrink-0">
                    {post.author.image?.asset?._ref ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-rose-500/30 transition-all flex-shrink-0">
                        <Image
                          src={urlFor(post.author.image).width(48).height(48).url()}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500/30 to-pink-500/30 flex items-center justify-center ring-2 ring-white/10 group-hover:ring-rose-500/30 transition-all flex-shrink-0">
                        <User className="w-6 h-6 text-rose-400" />
                      </div>
                    )}
                    <div className="flex flex-col flex-shrink-0">
                      <span className="text-xs text-white/50 font-medium uppercase tracking-wide">Author</span>
                      <span className="text-base text-white font-semibold whitespace-nowrap">
                        {post.author.name}
                      </span>
                    </div>
                  </div>
                )}
                
                {publishedDate && (
                  <div className="flex items-center gap-3 group flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center ring-2 ring-white/10 group-hover:ring-rose-500/30 transition-all flex-shrink-0">
                      <Calendar className="w-5 h-5 text-rose-400" />
                    </div>
                    <div className="flex flex-col flex-shrink-0">
                      <span className="text-xs text-white/50 font-medium uppercase tracking-wide">Published</span>
                      <span className="text-base text-white font-semibold whitespace-nowrap">
                        {publishedDate}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </header>

            {/* Featured Image - Only if exists */}
            {imageUrl && (
              <div className="relative w-full aspect-video mb-12 rounded-xl overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content - Clean and Readable */}
            <div className="prose prose-invert prose-lg max-w-none">
              <BlogContent body={post.body} />
            </div>

            {/* Author Bio - Subtle Section */}
            {post.author && post.author.bio && (
              <div className="mt-20 pt-12 border-t border-white/5">
                <div className="flex gap-4 items-start">
                  {post.author.image?.asset?._ref ? (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden ring-1 ring-white/10 flex-shrink-0">
                      <Image
                        src={urlFor(post.author.image).width(56).height(56).url()}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 ring-1 ring-white/10">
                      <User className="w-7 h-7 text-rose-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold font-display mb-2 text-white">
                      {post.author.name}
                    </h3>
                    <div className="text-sm text-white/60 leading-relaxed">
                      <AuthorBio bio={post.author.bio} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Suggested Articles Section */}
          {relatedPosts.length > 0 && (
            <section className="mt-24 pt-16 border-t border-white/5">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-display text-white">
                      Suggested <span className="text-gradient">Articles</span>
                    </h2>
                    <p className="text-sm text-white/60 mt-1">
                      More from {post.categories && post.categories.length > 0 ? post.categories[0].title : "this category"}
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {relatedPosts.map((relatedPost: any) => (
                    <BlogCard key={relatedPost._id} post={relatedPost} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
}
