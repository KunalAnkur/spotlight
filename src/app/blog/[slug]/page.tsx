import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, User, BookOpen } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BlogContent from "@/components/blog/BlogContent";
import AuthorBio from "@/components/blog/AuthorBio";
import BlogCard from "@/components/blog/BlogCard";
import { client } from "@/sanity/lib/client";
import { postQuery, postSlugsQuery, relatedPostsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

// Revalidate every 60 seconds
export const revalidate = 60;

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

async function getPost(slug: string) {
  try {
    const post = await client.fetch(postQuery, { slug });
    return post || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
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

  return (
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
            <header className="flex items-center justify-between mb-10">
              {/* Title - Full Width */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-[1.1] break-words">
                {post.title}
              </h1>
              
              {/* Author and Date - Right Aligned, Modern Layout */}
              <div className="flex items-center justify-end gap-6">
                {post.author && (
                  <div className="flex items-center gap-3 group">
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
                    <div className="flex flex-col">
                      <span className="text-xs text-white/50 font-medium uppercase tracking-wide">Author</span>
                      <span className="text-base text-white font-semibold">
                        {post.author.name}
                      </span>
                    </div>
                  </div>
                )}
                
                {publishedDate && (
                  <div className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center ring-2 ring-white/10 group-hover:ring-rose-500/30 transition-all">
                      <Calendar className="w-5 h-5 text-rose-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-white/50 font-medium uppercase tracking-wide">Published</span>
                      <span className="text-base text-white font-semibold">
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
  );
}
